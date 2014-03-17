
;(function(global) {

  angular.module('trip-planner', ['slideout']);

  angular.module('trip-planner').run(['$rootScope', function($rootScope) {

    $rootScope.empty = function(value) {
      return _.isEmpty(value);
    };

    // $rootScope.$on('$routeChangeStart', function(scope, newRoute) { });
    // $rootScope.$on('$viewContentLoaded', function(){ });

    $rootScope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if (phase == '$apply' || phase == '$digest') {
        if (fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    $rootScope.empty = function(value) {
      return _.isEmpty(value);
    };

  }]);

  // global.SherpaApp = SherpaApp;

}(window));

