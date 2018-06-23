angular.module('elevageApp').directive('componentColorpicker', function($parse) {

    return {
        restrict: 'E',
        scope: {
            bindWith: '='
        },
        template: '<div class="input-group">' +
            '<div class="input-group-addon">' +
            '<i></i>' +
            '</div>' +
            '<input type="text" class="form-control" ng-model="bindWith">' +
            '</div>',
        link: function($scope, elem, attr, ctrl) {
            elem.colorpicker();

            var model = $parse(attr.bindWith);
            $scope.$parent.$watch(model, function(newValue) {
                // TODO Try to force picker to update color
            });

            elem.colorpicker().on('changeColor', function(event) {
                $scope.bindWith = event.color.toHex();
                $scope.$parent[model] = event.color.toHex();
            });
        }
    };

});