angular.module('elevageApp').controller('tableauBordController', ['$scope', '$route', '$http', '$timeout', '$interval', 'tableauBordFactory', function($scope, $route, $http, $timeout, $interval, tableauBordFactory) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    $scope.nombreClients = 0;
    $scope.nombreChiens = 0;

    $scope.countClient = function() {
        tableauBordFactory.getClientCount()
            .then(function success(response) {
                    $scope.nombreClients = response.data;
                },
                function error(error) {
                    console.log("Erreur lors du chargement du nombre de clients");
                });
    };

    $scope.countChien = function() {
        tableauBordFactory.getChienCount()
            .then(function success(response) {
                    $scope.nombreChiens = response.data;
                },
                function error(error) {
                    console.log("Erreur lors du chargement du nombre de chiens");
                });
    };

    // MAIN

    $scope.countClient();
    $scope.countChien();

}]);