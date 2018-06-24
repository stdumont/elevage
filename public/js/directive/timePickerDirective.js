/**
 * Encapsulation du timepicker pour le rendre utilisable via un controller Angular.
 * Exemple d'utilisation : 
 * <component-timepicker bind-with="currentModel.time"/>  
 */
angular.module('elevageApp').directive('componentTimepicker', function() {

    return {

        restrict: 'AE', //attribute or element

        scope: {
            bindWith: '='
        },

        compile: function(element, attrs) {

            var bind = attrs.hasOwnProperty('bindWith') ? " ng-model=\"" + attrs["bindWith"] + "\"" : "";
            var readonly = attrs.hasOwnProperty('readonly') ? attrs['readonly'] : false;
            var ro = readonly == false ? '' : 'readonly';
            var mask = attrs.hasOwnProperty('mask') ? attrs["mask"] : "H:MM";
            var maskNumeric = mask.replace(new RegExp('M', 'g'), '9');
            maskNumeric = maskNumeric.replace(new RegExp('H', 'g'), '9');

            var htmlText = '' +
                '<div class="input-group">' +
                '<div class="input-group-addon">' +
                '<i class="fa fa-clock-o"></i>' +
                '</div>' +
                '<input type="text" ' + ro + ' class="form-control pull-right active" id="inputDuree" ' + bind + ' >' +
                '</div>';

            // console.log("mask:" + mask);

            element.html(htmlText);
            element.find('input').inputmask(maskNumeric, { "clearMaskOnLostFocus": false, "placeholder": mask });

        }

    };

});