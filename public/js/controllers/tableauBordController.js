angular.module('elevageApp').controller('tableauBordController', ['$scope', '$route', '$http', '$timeout', '$interval', 'tableauBordFactory', function($scope, $route, $http, $timeout, $interval, tableauBordFactory) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    $scope.nombreChiens = 0;
    $scope.nombrePortees = 0;
    $scope.nombreClients = 0;
    $scope.nombreAgenda = 0;

    $scope.countChien = function() {
        tableauBordFactory.getChienCount()
            .then(function success(response) {
                    $scope.nombreChiens = response.data;
                },
                function error(error) {
                    console.log("Erreur lors du chargement du nombre de chiens");
                });
    };

    $scope.countPortee = function() {
        tableauBordFactory.getPorteeCount()
            .then(function success(response) {
                    $scope.nombrePortees = response.data;
                },
                function error(error) {
                    console.log("Erreur lors du chargement du nombre de portées");
                });
    };

    $scope.countClient = function() {
        tableauBordFactory.getClientCount()
            .then(function success(response) {
                    $scope.nombreClients = response.data;
                },
                function error(error) {
                    console.log("Erreur lors du chargement du nombre de clients");
                });
    };

    $scope.countAgenda = function() {
        tableauBordFactory.getAgendaCount()
            .then(function success(response) {
                    $scope.nombreAgenda = response.data;
                },
                function error(error) {
                    console.log("Erreur lors du chargement du nombre d'événements de l'agenda");
                });
    };

    // MAIN

    $scope.countChien();
    $scope.countPortee();
    $scope.countClient();
    $scope.countAgenda();

}]);