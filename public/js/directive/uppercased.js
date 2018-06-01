angular.module('intranetApp').directive('uppercased', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$parsers.push(function(input) {
                return input ? input.toUpperCase() : null;
            });
            elem.css("text-transform", "uppercase");
        }
    };
});