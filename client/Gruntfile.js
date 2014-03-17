module.exports = function(grunt) {

  grunt.initConfig({
    distdir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      vendor: {
        src: [
          'vendor/jquery-2.0.3.min.js', 
          'vendor/underscore-min.js', 
          'vendor/angular.min.js', 
          'vendor/moment-min.js', 
          'vendor/bootstrap.min.js',
          'vendor/leaflet.min.js'
        ],
        dest: '<%= distdir %>/assets/js/vendor.min.js'
      },
      code: {
        src: [
          'src/app/config.js', 
          'src/app/app.js', 
          'src/app/routes.js',
          'src/app/controllers.js',
          'src/app/services.js',
          'src/app/directives.js',
          'src/app/slideout.js'
        ],
        dest: '<%= distdir %>/assets/js/code.js'
      }
    },
    clean: ['<%= distdir %>/*'],
    copy: {
      assets: {
        files: [
          { dest: '<%= distdir %>/', src : '**/*.html', expand: true, cwd: 'www/' },
          { dest: '<%= distdir %>/assets/img/', src : '**/*', expand: true, cwd: 'www/assets/img/' },
          { dest: '<%= distdir %>/assets/css/', src : ['base.css', 'bootstrap.min.css', 'leaflet.min.css'], expand: true, cwd: 'www/assets/css/' }
        ]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= distdir %>/assets/js/code.min.js': ['<%= concat.code.src %>']
        }
      }
    },
    jshint: {
      files: [
        'Gruntfile.js', 
        'src/**/*.js', 
        'test/**/*.js'
      ],
      jshintrc: '.jshintrc'
    },
    express: {
      options: {
        background: true
      },
      dev: {
        options: {
          script: 'dev-server.js'
        }
      }
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js', 'src/**/*.js'],
        tasks: ['copy', 'concat', 'uglify']
      },
      assets: {
        files: ['www/**/*.html', 'www/**/*.css'],
        tasks: ['copy']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-express-server');

  // NOTE: npm install phantomjs -g to work w/ PhantomJS

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('work', ['express', 'watch']);
  grunt.registerTask('build', ['clean', 'copy', 'concat', 'uglify']);

  grunt.registerTask('default', ['jshint', 'copy', 'uglify']);

};
