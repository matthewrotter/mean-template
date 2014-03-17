;(function() {

  angular.module('trip-planner')
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.
        when('/:id', {
          templateUrl: 'partials/scheduler.html',
          controller: 'SkedCtrl'
        }).
        otherwise({redirectTo: '/'});
    }]);

})();
