angular.module('elevageApp').controller('tableauBordController', ['$scope', '$route', '$http', '$timeout', '$interval', 'tableauBordFactory', function($scope, $route, $http, $timeout, $interval, tableauBordFactory) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    $scope.nombreDocuments = 0;
    $scope.nombreEvenements = 0;
    $scope.nombreClients = 0;
    $scope.nombreChiens = 0;
    $scope.nombreFournisseurs = 0;

    $scope.countFournisseur = function() {
        tableauBordFactory.getFournisseurCount()
            .then(function success(response) {
                    $scope.nombreFournisseurs = response.data;
                },
                function error(error) {
                    console.log("Erreur lors du chargement du nombre de fournisseurs");
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

    $scope.countDocument = function() {
        tableauBordFactory.getDocumentCount()
            .then(function success(response) {
                    $scope.nombreDocuments = response.data;
                },
                function error(error) {
                    console.log("Erreur lors du chargement du nombre de documents");
                });
    };

    // MAIN

    $scope.countFournisseur();
    $scope.countClient();
    $scope.countDocument();

}]);