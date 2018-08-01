angular.module('elevageApp').config(['$routeProvider', function($routeProvider) {

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

    // page : chiens
    .when('/page-chiens', {
        templateUrl: 'pages/chien.html',
        controller: 'chienController',
        activeTab: 'page-chiens'
    })

    // page : clients
    .when('/page-clients', {
        templateUrl: 'pages/client.html',
        controller: 'clientController',
        activeTab: 'page-clients'
    })

    // page : agenda
    .when('/page-agenda', {
        templateUrl: 'pages/agenda.html',
        controller: 'agendaController',
        activeTab: 'page-agenda'
    })

    // page : outils : calculs sur les dates
    .when('/page-outils-calcul-dates', {
        templateUrl: 'pages/outils/calcul-dates.html',
        controller: 'calculDatesController',
        activeTab: 'page-outils-calcul-dates'
    })

    // page : paramètres : élevage
    .when('/page-parametres-elevage', {
        templateUrl: 'pages/parametres/elevage.html',
        controller: 'elevageController',
        activeTab: 'page-parametres-elevage'
    })

    // page : paramètres : races
    .when('/page-parametres-races', {
        templateUrl: 'pages/parametres/races.html',
        controller: 'raceController',
        activeTab: 'page-parametres-races'
    })

    // page : paramètres : robes
    .when('/page-parametres-robes', {
        templateUrl: 'pages/parametres/robes.html',
        controller: 'robeController',
        activeTab: 'page-parametres-robes'
    })

    // page : paramètres : types de documents
    .when('/page-parametres-typesdoc', {
        templateUrl: 'pages/parametres/typesdoc.html',
        controller: 'typeDocumentController',
        activeTab: 'page-parametres-typesdoc'
    })

    ;

}]);