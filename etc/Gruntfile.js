/**
 * Example Grunt Hub
 *
 * Edit the hub.all.src to point to your Gruntfile locations.
 * Then run `grunt` or `grunt watch`.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    hub: {
      work: {
        options: {
          concurrent: 2
        },
        src: [
          '../client/Gruntfile.js',
          '../server/Gruntfile.js'
        ],
        tasks: ['work']
      },
       build: {
        options: {
          concurrent: 2
        },
        src: [
          '../client/Gruntfile.js',
          '../server/Gruntfile.js'
        ],
        tasks: ['build']
      }
    },
    replace: {
      servers: {
        src: ['../client/*/dist/assets/js/code*'],
        overwrite: true,
        replacements: [
          { 
            from: /(HOST.?\*\/.?['"])([^']+)/g,
            to: '$1<%= pkg.replacements[pkg.replacements.use].host %>' 
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-hub');
  grunt.loadNpmTasks('grunt-text-replace');

  grunt.registerTask('default', ['hub:work']);
  grunt.registerTask('build', ['hub:build', 'replace']);
};
