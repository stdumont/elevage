/**
 * Factory servant de service de communication entre les controlleurs et directives afin de notifier l'élément check aux autres boutons.
 */
angular.module('elevageApp').factory('tabService', function() {

    var observerCallbacks = [];
    var tabService = {};

    tabService.register = function(callback) {
        observerCallbacks.push(callback);
        return observerCallbacks.length - 1;
    };

    tabService.clear = function() {
        observerCallbacks = [];
    };

    tabService.getRegistrations = function() {
        return observerCallbacks;
    };

    tabService.notifyTabChanged = function() {
        $.each(observerCallbacks, function(i, callback) {
            callback();
        });
    };

    return tabService;

});

/**
 * Directive pour gérer des onglets de boutons
 * @author Adrien Dessilly
 */
angular.module('elevageApp').directive('componentTab', ['$compile', 'tabService', function($compile, tabService) {

    return {

        restrict: 'AE', //attribute or element

        scope: {
            ngTabGroup: '@',
            active: '@',
            ngModel: '='
        },

        link: function(scope, element, attrs) {

            var tabs = $('*[ng-tab-group=' + scope.ngTabGroup + ']');
            var bootstrap = Math.floor(12 / tabs.length);

            // si une registration a deja eu lieu pour ce groupe, faire un clear
            if (tabs.length === tabService.getRegistrations().length) {
                tabService.clear();
            }

            scope.enabled = typeof(scope.active) != 'undefined' && scope.active != 'false';

            scope.identifier = tabService.register(function() {
                scope.enabled = false;
            });

            if (scope.enabled) {
                scope.ngModel = scope.identifier;
            }

            scope.askEnable = function() {
                tabService.notifyTabChanged();
                scope.enabled = true;
                scope.ngModel = scope.identifier;
            };

            scope.shouldDisable = function() {
                return scope.enabled;
            };

            var html =
                '<div class="col-md-' + bootstrap + ' component-tab">' +
                '<button type="button" class="btn btn-flat btn-lg faa-parent animated-hover" style="width:100%;" ng-click="askEnable()" ng-class="{ \'btn-info\' : shouldDisable() }">' +
                element.html() +
                '</button><div class="puce"><i class="fa fa-caret-down" aria-hidden="true"></i></div></div>';

            element.html($compile(html)(scope));
            element.removeAttr('enabled');
        }

    };

}]);