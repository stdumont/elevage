/**
 * Encapsulation du datepicker pour le rendre utilisable via un controller Angular.
 * Exemple d'utilisation (bind-with correspond à un ng-model angular) : 
 * <component-datepicker bind-with="xxx.yyy" /> 
 *  Va générer : 
    <div class="input-group">
        <div class="input-group-addon">
            <a href="#" target="_self" style="color:#777" onClick="$('#inputDate').datepicker('show');"><i class="fa fa-calendar"></i></a>
            <script>
            $('#inputDate').datepicker({showOnFocus: false, format: 'dd/mm/yyyy', autoclose: true}); 
            $("#inputDate").inputmask("dd/mm/yyyy", {"clearMaskOnLostFocus": false, "placeholder": "JJ/MM/AAAA"});
            </script>                                       
        </div>
        <input class="form-control pull-right active" ng-model="varAngular">
    </div> 
 * @author Adrien Dessilly <adrien.dessilly@civadis.be>
 */

$.fn.datepicker.dates['fr'] = {
    days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
    daysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    daysMin: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
    months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    monthsShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: "Ajd"
};
angular.module('elevageApp').directive('componentDatepicker', function() {

    return {

        restrict: 'AE', //attribute or element

        scope: {
            bean: '=ngModel'
        },

        template: '<div class="input-group">' +
            '<div class="input-group-addon">' +
            '<a target="_self" style="color:#777"><i class="fa fa-calendar"></i></a>' +
            '</div>' +
            '<input class="form-control pull-right active" name="date">' +
            '</div>',

        link: function(scope, element, attrs) {

            element.find('input').datepicker({ weekStart: 1, language: 'fr', showOnFocus: false, format: 'dd/mm/yyyy', autoclose: true });
            element.find('input').inputmask("dd/mm/yyyy", { "clearMaskOnLostFocus": false, "placeholder": "JJ/MM/AAAA" });
            element.find('a').on("click", function() {
                element.find('input').datepicker('update');
                element.find('input').datepicker('show');
            });

            var $datePicker = element.find('input').datepicker();

            disabledChangeDate = false;
            disabledChangeScope = false;

            // DATEPICKER vers SCOPE
            var dateChanged = function(ev) {
                if (disabledChangeDate) {
                    return;
                }

                disabledChangeScope = true;
                scope.$parent.$apply(function() {
                    scope.bean = $datePicker.val();
                });
                disabledChangeScope = false;
            };

            //$datePicker.change(dateChanged)
            $datePicker.on('changeDate', dateChanged);
            $datePicker.on('clearDate', dateChanged);

            // SCOPE vers DATEPICKER
            scope.$watch('bean', function(newVal, oldVal) {
                if (disabledChangeScope) return;
                disabledChangeDate = true;
                $datePicker.val(newVal);
                $datePicker.datepicker('update');
                disabledChangeDate = false;
            });

        }

    };

});