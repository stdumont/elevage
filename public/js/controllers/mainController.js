angular.module('elevageApp').controller('mainController', ['$scope', '$http', '$timeout', '$interval', 'applicationFactory', function($scope, $http, $timeout, $interval, applicationFactory) {

    $scope.applicationName = null;
    $scope.applicationVersion = null;
    $scope.applicationCopyright = null;
    $scope.applicationCreatorName = null;
    $scope.applicationCreatorMail = null;
    $scope.currentUser = null;

    $scope.getApplicationName = function() {
        applicationFactory.getApplicationName()
            .then(function success(response) {
                    $scope.applicationName = response.data.valeur;
                },
                function error(error) {
                    console.log("Erreur lors du chargement du nom de l'application");
                });
    };

    $scope.getApplicationVersion = function() {
        applicationFactory.getApplicationVersion()
            .then(function success(response) {
                    $scope.applicationVersion = response.data.valeur;
                },
                function error(error) {
                    console.log("Erreur lors du chargement de la version de l'application");
                });
    };

    $scope.getApplicationCreatorName = function() {
        applicationFactory.getApplicationCreatorName()
            .then(function success(response) {
                    $scope.applicationCreatorName = response.data.valeur;
                },
                function error(error) {
                    console.log("Erreur lors du chargement du nom du créateur de l'application");
                });
    };

    $scope.getApplicationCreatorMail = function() {
        applicationFactory.getApplicationCreatorMail()
            .then(function success(response) {
                    $scope.applicationCreatorMail = response.data.valeur;
                },
                function error(error) {
                    console.log("Erreur lors du chargement du mail du créateur de l'application");
                });
    };

    $scope.getApplicationCopyright = function() {
        applicationFactory.getApplicationCreationYear()
            .then(function success(response) {
                    let application_creation_year = response.data.valeur;
                    let today = new Date();
                    var annee = today.getFullYear();
                    if (application_creation_year == annee) {
                        $scope.applicationCopyright = 'Copyright \u00A9 ' + application_creation_year;
                    } else {
                        $scope.applicationCopyright = 'Copyright \u00A9 ' + application_creation_year + ' - ' + annee;
                    };
                },
                function error(error) {
                    console.log("Erreur lors du chargement de la version de l'application");
                });
    };

    $scope.getCurrentUser = function() {
        applicationFactory.getCurrentUser()
            .then(function success(response) {
                    $scope.currentUser = response.data;
                },
                function error(error) {
                    console.log("Erreur lors du chargement de l'utilisateur courant");
                });
    };

    // MAIN
    $scope.getApplicationCreatorMail();
    $scope.getApplicationCreatorName();
    $scope.getCurrentUser();
    $scope.getApplicationName();
    $scope.getApplicationVersion();
    $scope.getApplicationCopyright();
}]);