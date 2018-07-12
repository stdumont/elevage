/**
 * Encapsulation de iCheck.js dans une directive afin de le rendre réutilisable dans
 * un contexte Angular et utilisable via le ng-model.
 * Pour cela, ajouter icheck ou icheck-long comme attribut exemple = 
 * <input type="checkbox" class="flat-red" ng-model="displayWeekends" label="test" icheck-long/>
 * (nécessite les .js et .css de iCheck)
 * @author Adrien Dessilly <adrien.dessilly@civadis.be>
 */
angular.module('elevageApp').directive('icheck', ['$timeout', '$parse', function($timeout, $parse) {

    return {
        compile: function(element, $attrs) {

            var icheckOptions = {
                checkboxClass: 'icheckbox_flat-blue',
                radioClass: 'iradio_flat-blue'
            };

            var modelAccessor = $parse($attrs['ngModel']);

            return function($scope, element, $attrs, controller) {

                var modelChanged = function(event) {
                    $scope.$apply(function() {
                        modelAccessor.assign($scope, event.target.checked);
                    });
                };

                $scope.$watch(modelAccessor, function(val) {
                    var action = val ? 'check' : 'uncheck';
                    element.iCheck(icheckOptions, action).on('ifChanged', modelChanged);
                });
            };

        }

    };

}]);

angular.module('elevageApp').directive('icheckLong', ['$timeout', '$parse', function($timeout, $parse) {

    return {
        compile: function(element, $attrs) {

            var label = element.next();
            var label_text = label.html();
            label.remove();

            var icheckOptions = {
                checkboxClass: 'icheckbox_line-blue',
                radioClass: 'iradio_line-blue',
                insert: '<div class="icheck_line-icon"></div>' + label_text
            };

            var modelAccessor = $parse($attrs['ngModel']);

            return function($scope, element, $attrs, controller) {

                var modelChanged = function(event) {
                    $scope.$apply(function() {
                        modelAccessor.assign($scope, event.target.checked);
                    });
                };

                $scope.$watch(modelAccessor, function(val) {
                    var action = val ? 'check' : 'uncheck';
                    element.iCheck(icheckOptions, action).on('ifChanged', modelChanged);
                });
            };

        }

    };

}]);


angular.module('elevageApp').directive('icheckColor', ['$timeout', '$parse', function($timeout, $parse) {

    return {
        compile: function(element, $attrs) {

            var label = element.next();
            var label_text = label.html();
            label.remove();

            var nocolor = $attrs.hasOwnProperty('nocolor') && !(typeof $attrs['nocolor'] === 'undefined') ? $attrs['nocolor'] : 'icheckbox_line-blue';

            var icheckOptions = {
                checkboxClass: nocolor,
                radioClass: 'iradio_line-blue',
                insert: '<div class="icheck_line-icon"></div>' + label_text
            };

            var modelAccessor = $parse($attrs['ngModel']);

            return function($scope, element, $attrs, controller) {

                var modelChanged = function(event) {
                    $scope.$apply(function() {
                        modelAccessor.assign($scope, event.target.checked);
                    });
                };

                $scope.$watch(modelAccessor, function(val) {
                    var action = val ? 'check' : 'uncheck';
                    icheckOptions.checkboxClass = val ? 'icheckbox_line-green' : nocolor;
                    element.iCheck(icheckOptions, action).on('ifChanged', modelChanged);
                });
            };

        }

    };

}]);