
angular.module('elevageApp').directive('componentSelect2', ['$compile', function($compile) {

    return {

        restrict: 'AE', //attribute or element

        scope: {
            ngModel: '=',
            id: '@',
            config: '=',
            label: '@',
            width: '@',
            mandatory: '&',
            icon: '@'
        },

        link: function (scope, element, attrs) {
            
            var inputWidth = attrs.hasOwnProperty('width') && !(typeof attrs['width'] === 'undefined') ? attrs['width'] : 9;
            var labelWidth = 12-inputWidth;
            var id = attrs.hasOwnProperty('id') ? attrs['id'] : '';
            var icon = attrs.hasOwnProperty('icon') && !(typeof attrs['icon'] === 'undefined') ? attrs['icon'] : null;
            var multiple = attrs.hasOwnProperty('multiple') && !(typeof attrs['multiple'] === 'undefined') ? attrs['multiple'] : null;
            
            // ICONE
            var sIcon = '';
            if(icon !== null){
                sIcon = '&nbsp;<i class="fa fa-'+icon+'"></i>&nbsp;';
            }

            // MULTIPLE
            var sMultiple = '';
            if(multiple !== null){
                sMultiple = multiple? ' multiple="multiple" ' : '';
            }

            // MANDATORY
            var isMandatory = false;
            if(attrs.hasOwnProperty('mandatory')){
                var attrMandatory = attrs['mandatory'];
                if(typeof attrMandatory === 'undefined'){
                    isMandatory = false;
                }
                else if(attrMandatory === ''){
                    isMandatory = true;
                }
                else{
                    isMandatory = scope.mandatory();
                }
            }
            var sMandatory = isMandatory ? '&nbsp;<span class="mandatory-field-star">*</span>' : '';        
            
            // MULTIPLE
            
            
            // Construction du select sur base des attributs
            var html = '';
            if(labelWidth !== 0){
                html =   '<div class="form-group">' +
                            '<label for="{{id}}" class="col-sm-'+labelWidth+' control-label"><span>{{label}}</span>'+sIcon+sMandatory+'</label>' +
                            '<div class="col-sm-'+inputWidth+'">' +
                            '<select class="'+id+'" '+sMultiple+' style="width:100%;"></select>' + 
                            '</div>' +
                        '</div>';
                
            }
            else{
                html = '<select class="'+id+'" '+sMultiple+' style="width:100%;"></select>';
            }
            
            element.append( $compile(html)(scope) );               
        
            var mySelect2 = $(element).find('select'); // Ne pas utiliser la méthode d'accès par id ou class car risque de bug, profiter qu'on a directement l'élément ici
            
            element.removeAttr('id');            
            element.removeAttr('ng-model');
            element.removeAttr('label');
            element.removeAttr('width');    
            element.removeAttr('mandatory');  
            
            // initialisation du select2
            var initSelect2 = function(){
                // Ne pas utiliser la méthode d'accès par id ou class car risque de bug, profiter qu'on a directement l'élément ici
                emptySelect2(mySelect2);

                if(typeof scope.config === "undefined" || scope.config === null){
                    return;
                }

                // recuperation de la configuration sur base du scope.config
                var values = scope.config.values;
                var selectCallBackFunction = scope.config.selectCallBack;
                var template = scope.config.template;
                
                var dataMapped = [];
                if(values!==null && !(typeof values === 'undefined')){
                    $.each(values, function(i, value) {
                        dataMapped.push(template(value));
                    });
                }    
                
                // creation du select2
                mySelect2.select2({
                    data: dataMapped,
                    language: getSelect2FRLanguage()
//                    minimumResultsForSearch: -1
                });
                
                if ( typeof scope.config.current != 'undefined' && scope.config.current != null && scope.config.current != '') {
                    if($.isArray(scope.config.current)){
//                        console.log("VAL");
//                        console.log(scope.config.current);
                        mySelect2.select2('val', scope.config.current);
                    }
                    else{
                        mySelect2.select2('val', [scope.config.current]);
//                        console.log("VAL []");
//                        console.log(scope.config.current);                        
                    }
                    
                }
                else{
                    // Edit ALA 20160822 : Forcer la déselection mother fucker !
                    mySelect2.val('').change();
                }
                
                // activer / desactiver
                var disabled = scope.config.disabled === null || typeof scope.config.disabled === "undefined" ? false : scope.config.disabled;
                mySelect2.prop("disabled", disabled);
                
                mySelect2.on("change", function() {
                    var val = mySelect2.select2("val");
                    typeof selectCallBackFunction === 'function' && selectCallBackFunction(val);
                    scope.$apply();
                });     
            };

            // initialiser une fois d entree de jeu
            initSelect2();
            
            // reinitialiser si l'objet de configuration est mis a jour
            scope.$watch('config', function(oldVal, newVal) {
                initSelect2();
            }, true);
            
        }        

    };

}]);
