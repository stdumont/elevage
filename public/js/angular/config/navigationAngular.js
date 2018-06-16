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

    // page : agenda
    .when('/page-agenda', {
        templateUrl: 'pages/agenda.html',
        controller: 'agendaController',
        activeTab: 'page-agenda'
    })

    // page : clients
    .when('/page-clients', {
        templateUrl: 'pages/client.html',
        controller: 'clientController',
        activeTab: 'page-clients'
    })

    // page : paramètres : élevage
    .when('/page-parametres-elevage', {
        templateUrl: 'pages/parametres/elevage.html',
        controller: 'elevageController',
        activeTab: 'page-parametres-elevage'
    })

    // page : outils : calculs sur les dates
    .when('/page-outils-calcul-dates', {
        templateUrl: 'pages/outils/calcul-dates.html',
        controller: 'calculDatesController',
        activeTab: 'page-outils-calcul-dates'
    })

    ;

}]);