angular.module('trip-planner')
  .directive('datepicker', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        element.datepicker(scope.datepickerOpts);

        element.bind('change', function() {
          scope.$apply(function() {
            scope[attrs.ngModel] = element.val();
          });

        });
      }
    };
  });