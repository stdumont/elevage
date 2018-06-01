// Fichie contenant des fonctions utilitaires relatives à la navigation dans les pages

function refreshCurrentLink(activeLink) {
    $('.sidebar-menu > li a[href]').each(function() {
        $(this).parent().removeClass('active');
    });
    
    $('.sidebar-menu .treeview-menu').each(function(){
        $(this).attr("style", '');
    });
    
    $('.sidebar-menu > li a[href]').each(function() {
       var link = $(this).attr('href')
       if(link == '#' + activeLink) {
            $('.sidebar-menu li').has(this).addClass('active');
       }
    });    
}

function showMessageInfo(title, message, callback) {
    showMessage('#modalInfoWindow', title, message, callback);
}

function showMessage(idModal, title, message, callback) {
    $(idModal + ' .modal-title').html(title);
    $(idModal + ' .modal-body').html(message);
    $(idModal).on('hidden.bs.modal', function (e) {
        typeof callback === 'function' && callback(e);
        $(this).unbind('hidden.bs.modal');
    });    
    $(idModal).modal();
}


function showDeleteConfirmation(message, callback) {
    showConfirmationModal('Confirmation de suppression', message, 'Supprimer', 'trash', callback, 'danger');
}

function showConfirmation(title, message, buttonLabel, icon, callback) {
    showConfirmationModal(title, message, buttonLabel, icon, callback, 'primary');
}

function showConfirmationModal(title, message, buttonLabel, icon, callback, style) {
    var idModal = '#modalConfirmWindow';
    $(idModal + ' .modal-title').html(title);
    $(idModal + ' .modal-body').html(message);
    $('#btnOk').html('<span class="fa fa-'+icon+'"></span>&nbsp;'+buttonLabel);
    $('#btnOk').removeClass();
    $('#btnOk').addClass('btn btn-'+style);
    $('#btnOk').bind("click", callback);
    
    
    $(idModal).on('hidden.bs.modal', function (e) {
        $(this).unbind('hidden.bs.modal');
        $('#btnOk').unbind('click');
    });    
    
    $(idModal).modal();    
}



function checkErrorUnauthorizedAndRedirect(response) {
    var callback = function(e) {
        window.location.replace("login.html");
    };
    
    if (response.status === 401) {
        showMessageInfo("Erreur : " + response.status + " " + response.statusText, response.data, callback);  
    }
}

function setLoading(idOrClass, loading) {
    if(loading) {
        $(idOrClass + '>.overlay').removeClass('loadingHidden');
    } else {
        $(idOrClass + '>.overlay').addClass('loadingHidden');
    }    
}

