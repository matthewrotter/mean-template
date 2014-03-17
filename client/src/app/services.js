(function() {

  angular.module('trip-planner')

    .constant('SherpaConfig', GlobeSherpa.inject('SherpaConfig'))

    .factory('Utils', function() {
      return GlobeSherpa.inject('Utility');
    })

    .factory('GeoService', function() {
      return GlobeSherpa.inject('GeolocationService');
    })

    .factory('MappingService', function() {
      return GlobeSherpa.inject('MappingService');
    })

    .factory('exceptionHandlerFactory', ['SherpaConfig', 'Utils', function(SherpaConfig, Utils) {

      return function(exception, cause) {
        // BEER: functional program this combinatorial/partial w/ below
        if (SherpaConfig.global.env === 'test' || SherpaConfig.global.env === 'dev' || SherpaConfig.global.env === 'local') {
          alert('Error: see console');
          window.console.log('Error', Utils.formatError(exception), cause);
        }

        if (SherpaConfig.global.env !== 'prod') {
          Utils.logError('WARN', exception + '; ' + cause);
        }

        return;
      };

    }])
    .config(['$provide', function($provide) {
      $provide.decorator('$exceptionHandler', ['exceptionHandlerFactory', function(exceptionHandlerFactory) {
        return exceptionHandlerFactory;
      }]);
    }]);

}());
