/**
 * Objet javascript simplifiant l'utilisation du select2.
 * @param {type} params
 * @returns {Select2Civadis}
 * @author Adrien Dessilly <adrien.dessilly@civadis.be>
 * Voir exemple en bas de page.
 */
function Select2Civadis(params) {
    
    this.id;            // Variable : Id ou class permettant de retrouver le select dans le DOM (exemple : #maSelect)
    this.data;          // Variable : Un tableau d'objet à mettre dans la select
    this.current;       // Variable : L'élément à selectionner par défaut dans la select (doit exister dans le tableau params.data)
    this.mapper;        // Fonction : (optionnel) Le mappeur qui transforme l'objet en un élément compatible select2, si non fourni, la liste doit déjà être compatible avec le select2
    this.template;      // Fonction : (optionnel) Un template permettant de customizer l'affichage, c'est comme un renderer JAVA
    this.callback;      // Fonction : (optionnel) En cas de changement de selection, on appel cette fonction en fournissant le nouvel élément selected

    this.refresh(params);
    this.display();
    
};

/**
 * Setter le select2 en mettant les valeurs, l'élément courant, le renderer etc.
 * Ici les valeurs sont stockées mais pas encore utilisées pour afficher le select2 (ça se fera dans le display)
 */
Select2Civadis.prototype.refresh = function(params) {
    
    this.id = params.id;
    this.data = params.data;
    this.current = params.current;
    this.mapper = params.mapper;
    this.template = params.template;
    this.callback = params.callback;
    
    if(!this.exists(params, 'id')) {
        throw new Error("Champs id obligatoire pour la création d'un select2");
        return;
    }   
    if(!this.exists(params, 'data')) {
        this.data = [];
    }   
    if(!this.exists(params, 'current')) {
        this.current = null;
    }   
    if(!this.exists(params, 'mapper')) {
        this.mapper = function(v){return v;};
    }
    if(!this.exists(params, 'template')) {
        this.template = null;
    }
    if(!this.exists(params, 'callback')) {
        this.callback = null;
    }    
    
};

/**
 * Afficher le select2 sur base des valeurs initialisées par le refresh
 */
Select2Civadis.prototype.display = function() {
    this.empty();

    var dataMapped = [];
    if(typeof this.mapper === 'function') {
        dataMapped = this.toListSelect2(this.data, this.mapper);
    } else {
        dataMapped = this.data;
    }

    if(this.template == null || typeof this.template !== 'function') {
        $(this.id).select2({
            data: dataMapped,
            language: getSelect2FRLanguage()
        }); 
    } else {
        $(this.id).select2({
            data: dataMapped,
            language: getSelect2FRLanguage(),
            templateResult: this.template,
            templateSelection: this.template
        }); 
    }
    
    var id = this.id;
    var callback = this.callback;
    
    $(id).on("change", function() {
        var val = $(id).select2("val");
        typeof callback === 'function' && callback(val);
    });   
    
    // selection courante
    if(this.current !== null){

        if(typeof this.mapper !== 'function') {
            throw new Error("select2 doit recevoir une fonction de mapping entre l'objet source vers l'objet select2 : beanToSelect2Function");
        }

        if( Array.isArray(this.current) ) {
           var currentMapped = this.toListSelect2(this.current, this.mapper);
           var currentIds = [];
           $.each(currentMapped, function(i, val) {
                currentIds.push(val.id);
            });
        } else {
           currentIds = this.mapper(this.current).id;
        }
        $(this.id).select2('val', currentIds);

    }    
};

/**
 * Vider le select2 au cas où il existait déjà
 */
Select2Civadis.prototype.empty = function() {
    $(this.id).select2({data:null, language: this.traductions()});
    $(this.id).html("");  
    $(this.id).off("change");    
};

/**
 * Initialiser les traductions
 */
Select2Civadis.prototype.traductions = function() {
    return getSelect2FRLanguage();
};

Select2Civadis.prototype.toListSelect2 = function (beans, mapperBeanToSelect2) {
    var data = [];
    if(beans===null || (typeof beans === 'undefined')){
        return data;
    }        
    $.each(beans, function(i, bean) {
        data.push(mapperBeanToSelect2(bean));
    });
    return data;
};

/**
 * Vérifier l'existence d'un attribut dans un objet
 */
Select2Civadis.prototype.exists = function (object, attribute) {
    return typeof object[attribute] != 'undefined';
};

/**
 * 
 * 
 * EXEMPLE : 
   -----------------------------------------------------
    var templateSelect2Nomenclature = function(state) {
        if (!state.id) { return state.text; }
        if(typeof state.node != 'undefined' && state.node == false) {
            var lvl = state.level*5;
            var $state = $(
                '<span style="padding-left:'+lvl+'px"><i class="fa fa-arrow-circle-right" style="color:#777;"></i>&nbsp;&nbsp;' + state.text + '</span>'
            ); 
        } else if(typeof state.node == 'undefined') {
            var $state = $(
                '<span><i class="fa fa-arrow-circle-right" style="color:#777;"></i>&nbsp;&nbsp;' + state.text + '</span>'
            ); 
        }
        return $state;        
    };     

    var selectCallBack = function(id){
        $scope.currentNomenclatureId = id;
        $scope.getNomenclatureAndClients(id, null);
    };        

    new Select2Civadis({
        id : '.nomenclatures-select',
        data : liste,
        current : current,
        template : templateSelect2Nomenclature,
        callback : selectCallBack
    });* 
 * 
 * 
 */


