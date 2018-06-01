angular.module('elevageApp').directive('emptyToNull', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$parsers.push(function(viewValue) {
                if (!viewValue) {
                    viewValue = "";
                }
                if (viewValue.trim() === "") {
                    viewValue = null;
                }
                return viewValue;
            });
        }
    };
});