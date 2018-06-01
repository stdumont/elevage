angular.module('intranetApp').config(['$routeProvider', function($routeProvider) {

    $routeProvider
    // page : home
        .when('/', {
        templateUrl: 'pages/tableauBord.html',
        controller: 'tableauBordController',
        activeTab: 'page-tableau-bord'
    })

    // page : tableau de bord
    .when('/page-tableau-bord', {
        templateUrl: 'pages/tableauBord.html',
        controller: 'tableauBordController',
        activeTab: 'page-tableau-bord'
    })

    // page : agenda
    .when('/page-agenda', {
        templateUrl: 'pages/agenda.html',
        controller: 'agendaController',
        activeTab: 'page-agenda'
    })

    // page : types de documents
    .when('/page-type-documents', {
        templateUrl: 'pages/typeDocument.html',
        controller: 'typeDocumentController',
        activeTab: 'page-type-documents'
    })

    // page : fournisseurs
    .when('/page-fournisseurs', {
        templateUrl: 'pages/fournisseur.html',
        controller: 'fournisseurController',
        activeTab: 'page-fournisseurs'
    })

    // page : documents
    .when('/page-documents', {
        templateUrl: 'pages/document.html',
        controller: 'documentController',
        activeTab: 'page-documents'
    })

    // page : clients
    .when('/page-clients', {
        templateUrl: 'pages/client.html',
        controller: 'clientController',
        activeTab: 'page-clients'
    })

    ;

}]);