angular.module('elevageApp').controller('elevageController', ['$scope', '$route', '$http', 'elevageFactory', '$sce', function($scope, $route, $http, elevageFactory, $sce) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);


    //--------------------------------------------------------------------------
    // Variables
    //--------------------------------------------------------------------------
    $scope.currentElevage = null;
    // Message d'erreur si problème dans la validation
    $scope.elevageFormErrorMessage = '';
    // Bool qui indique si il y a une erreur dans la validation du formulaire
    $scope.elevageFormError = false;
    // Bool qui indique si le formulaire a été enregistré avec succes
    $scope.elevageFormSuccess = false;
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    // Evénements de la couche UI
    //--------------------------------------------------------------------------
    // [buttonCancel:onClick] : clic sur le bouton annuler
    $scope.onClickCancel = function() {
        $scope.elevageFormError = false;
        $scope.elevageFormSuccess = false;
        $scope.firstElevage();
    };
    // [buttonSave:onClick] : clic ou validation du bouton sauvegarder
    $scope.onClickSave = function() {
        $scope.saveElevage();
    };
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    // Accès vers la couche REST (lien avec les factories Angular)
    //--------------------------------------------------------------------------
    // ->Elevages : Appel REST vers Factory : rechercher le premier élevage
    $scope.firstElevage = function() {
        $scope.setFormLoading(true);
        elevageFactory.first().success(function(elevage) {
            $scope.currentElevage = elevage;
            $scope.setFormLoading(false);
        }).error(function() {
            $scope.setFormLoading(false);
        });
    };
    // ->Elevages : Appel REST vers Factory : mettre à jour un elevage
    $scope.saveElevage = function() {
        $scope.elevageFormError = false;
        $scope.elevageFormSuccess = false;
        if ($scope.isFillingValid()) {
            elevageFactory.update($scope.currentElevage)
                .success(function() {
                    $scope.elevageFormSuccess = true;
                    $('.callout-success').fadeIn();
                    setTimeout(function() {
                        $('.callout-success').fadeOut();
                        $scope.elevageFormSuccess = false;
                    }, 3000);
                })
                .error(function(err) {
                    showMessageInfo("Erreur", "La mise à jour n'a pas fonctionné correctement.");
                });
        }
    };
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    // Méthodes de manipulation et d'initialisation de formulaire
    //--------------------------------------------------------------------------
    $scope.isFillingValid = function() {
        if ($scope.currentElevage.nom === null || $scope.currentElevage.nom === '') {
            $scope.elevageFormError = true;
            $scope.elevageFormErrorMessage = 'Le champ nom est obligatoire.';
            return false;
        }
        return true;
    };
    $scope.setFormLoading = function(loading) {
        setLoading('.form-elevage', loading);
    };

    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    // MAIN
    //--------------------------------------------------------------------------
    $scope.firstElevage();
    $scope.elevageFormError = false;
    $scope.elevageFormSuccess = false;
    //--------------------------------------------------------------------------


}]);