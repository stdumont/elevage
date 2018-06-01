
function getSelect2FRLanguage(){
    return {
        errorLoading: function () { return 'Le résultat ne peut être affiché.'; },
        inputTooLong: function (args) { return 'Veuillez supprimer des caractères.'; },
        inputTooShort: function (args) { return 'Veuillez saisir des caractères.'; },
        loadingMore: function () { return 'Chargement des résultats...'; },
        maximumSelected: function (args) { 'Vous ne pouvez sélectionner que ' + args.maximum + ' valeurs'; },
        noResults: function () { return "Aucun résultat";  },
        searching: function () { return 'Recherche en cours...';}
    };
};

// vider une select2
function emptySelect2(idOrClass) {
    $(idOrClass).select2({data:null, language: getSelect2FRLanguage()});
    $(idOrClass).html("");  
    $(idOrClass).off("change");
}
function formatData(data) {
    markup = "<h1>" + data.name + "</h1>" + "<p>" + data.otherData + "</p>";
    return markup;
};

// instancier une select2
function setSelect2(idOrClass, data, current, beanToSelect2Function, selectTemplate, selectCallBackFunction) {

    emptySelect2(idOrClass);

    if(typeof beanToSelect2Function === 'function') {
        dataMapped = listBeanToSelect2(data, beanToSelect2Function);
    } else {
        dataMapped = data;
    }

    if(selectTemplate == null || typeof selectTemplate !== 'function') {
        $(idOrClass).select2({
            data: dataMapped,
            language: getSelect2FRLanguage()
        }); 
    } else {
        $(idOrClass).select2({
            data: dataMapped,
            language: getSelect2FRLanguage(),
            templateResult: selectTemplate,
            templateSelection: selectTemplate
        }); 
    }
    
    $(idOrClass).on("change", function() {
        var val = $(idOrClass).select2("val");
        typeof selectCallBackFunction === 'function' && selectCallBackFunction(val);
    });   
    
    // selection courante
    if(current!==null){

        if(typeof beanToSelect2Function !== 'function') {
            console.log("ERREUR : select2 doit recevoir une fonction de mapping entre l'objet source vers l'objet select2 : beanToSelect2Function");
            return;
        }

        if( Array.isArray(current) ) {
           currentMapped = listBeanToSelect2(current, beanToSelect2Function);
           currentIds = [];
           $.each(currentMapped, function(i, val) {
                currentIds.push(val.id);
            });
        } else {
           currentIds = beanToSelect2Function(current).id;
        }
        $(idOrClass).select2('val', currentIds);

    }

}   

function setCurrentId(idOrClass, idCurrent){
    currentIds = [];
    currentIds.push(idCurrent);
    $(idOrClass).select2('val', currentIds);
}

function listBeanToSelect2(beans, beanToSelect2) {
    var data = [];

    if(beans===null || (typeof beans === 'undefined')){
        return data;
    }        

    $.each(beans, function(i, client) {
        data.push(beanToSelect2(client));
    });
    
    return data;
}      

function select2TreeToArray(data, lvl) {

    var options = [];

    $.each(data, function(i, node) {

        if(typeof node.children != 'undefined' && node.children.length > 0){
            // creation group
            var children = [];
            optionsDown = select2TreeToArray(node.children, lvl+1);
            var header = {
                text : node.text,
                children : [],
                node : true,
                level : lvl,
                bean : node.bean
            };
            options.push(header);
            options = options.concat(optionsDown);
        }
        else{
            // creation item
            var item = {
                id : node.id,
                text : node.text,
                node : false,
                level: lvl,
                bean : node.bean
            };
            options.push(item);
        }
    });

    return options;
}    

function contextesToString(contextes) {
    var builder = "Contextes : &#013;";
    
    $(contextes).each(function(i, val) {
        builder += val.libelle + "&#013;";
    });
    
    return builder;
}

function createRendererNomenclature(state) {
    if (!state.id) { return state.text; }
    var tooltip = '';
    if(state.bean != null) {
        tooltip = contextesToString(state.bean.contextes);
    }
    if(state.id == -1){
        var $state = '';
    }
    else if(typeof state.node != 'undefined' && state.node == false) {
        var lvl = state.level*5;
        var $state = $(
            '<span style="padding-left:'+lvl+'px" title="'+tooltip+'"><i class="fa fa-arrow-circle-right" style="color:#777;"></i>&nbsp;&nbsp;' + state.text + '</span>'
        ); 
    } else if(typeof state.node == 'undefined') {
        var $state = $(
            '<span><i class="fa fa-arrow-circle-right" style="color:#777;" title="'+tooltip+'"></i>&nbsp;&nbsp;' + state.text + '</span>'
        ); 
    }
    return $state;        
};

