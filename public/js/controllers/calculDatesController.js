angular.module('elevageApp').controller('calculDatesController', ['$scope', '$route', '$http', '$timeout', '$interval', function($scope, $route, $http, $timeout, $interval) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    $scope.calcul_1_date_depart = null;
    $scope.calcul_1_nombre = null;
    $scope.calcul_1_date_resultat = null;

    $scope.calcul_2_date_debut = null;
    $scope.calcul_2_date_fin = null;
    $scope.calcul_2_nombre_resultat = null;

    $scope.calcul1 = function() {
        $scope.calcul_1_date_resultat = moment($scope.calcul_1_date_depart, 'DD/MM/YYYY').add($scope.calcul_1_nombre, 'days').format('DD/MM/YYYY');
    };

    $scope.calcul2 = function() {
        $scope.calcul_2_nombre_resultat = Math.abs(moment($scope.calcul_2_date_debut, 'DD/MM/YYYY').diff(moment($scope.calcul_2_date_fin, 'DD/MM/YYYY'), 'days'));
    };

    // MAIN
    $('.operation1Select').select2({
        language: 'fr',
        width: '100%'
    });

}]);