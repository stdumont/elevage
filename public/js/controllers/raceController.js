angular.module('elevageApp').controller('raceController', ['$scope', '$route', '$http', 'raceFactory', 'robeFactory', 'chienFactory', 'NgTableParams', '$sce', function($scope, $route, $http, raceFactory, robeFactory, chienFactory, NgTableParams, $sce) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    //--------------------------------------------------------------------------
    // Variables
    //--------------------------------------------------------------------------
    // Titre du formulaire, utilisé via le ng-hide editionMode dans le <h3>
    $scope.titreAjout = "Ajouter une race";
    // Titre du formulaire, utilisé via le ng-show editionMode dans le <h3>
    $scope.titreEdit = "Modifier une race";
    // Permet d'affiche/masquer le mode ajout ou edition
    $scope.editionMode = false;
    // Liste des races
    $scope.races = null;
    // Typedoc en cours d'ajout ou d'édition
    $scope.currentRace = null;
    // Filtre de recherche
    $scope.inputFilterRace = '';
    // Message d'erreur si problème dans la validation
    $scope.raceFormErrorMessage = '';
    // Bool qui indique si il y a une erreur dans la validation du formulaire
    $scope.raceFormError = false;
    //--------------------------------------------------------------------------



    //--------------------------------------------------------------------------
    // Evènements de la couche UI
    //--------------------------------------------------------------------------
    // [buttonSave:onClick] : clic ou validation du bouton sauvegarder
    $scope.onClickSave = function() {
        $scope.saveRace();
    };
    // [buttonCancel:onClick] : clic ou validation du bouton annuler
    $scope.onClickCancel = function() {
        // Qd on annule, on revient en mode ajout.
        $scope.initCurrentRace();
    };
    // [table:buttonEdit:onClick] : clic sur le bouton d'édition d'un élément du tableau
    $scope.onClickEdit = function(race) {
        $scope.findRace(race.id);
    };
    // [table:buttonDelete:onClick] : clic sur le bouton delete d'un élément du tableau
    $scope.onClickDelete = function(race) {
        $scope.deleteRace(race.id);
    };
    $scope.$watch("inputFilterRace", function(newValue, oldValue) {
        $scope.filterRaces();
    });

    $scope.isDeletable = function(race) {
        return race.count == 0 ? true : false;
    };
    //--------------------------------------------------------------------------


    $scope.filterRaces = function() {
        var filteredRaces = [];
        $.each($scope.races, function(index, race) {
            let filtre = $scope.inputFilterRace.toLowerCase();
            let element = race.nom.toLowerCase();
            if (element.indexOf(filtre) > -1) {
                filteredRaces.push(race);
            }
        });
        if (typeof $scope.tableParams !== 'undefined') {
            $scope.tableParams.reload();
        }
        $scope.initTableRaces(filteredRaces);
    };



    //--------------------------------------------------------------------------
    // Accès vers la couche REST (lien avec les factories Angular)
    //--------------------------------------------------------------------------
    // ->Types de document : Appel REST vers Factory : lister les types de documents
    $scope.listRaces = function() {
        $scope.setListLoading(true);
        raceFactory.list().success(function(races) {
            $scope.races = races;

            if ($scope.races !== null) {
                $.each($scope.races, function(index, race) {
                    race.count = 0;
                    robeFactory.countByRace(race.id).success(function(nombre) {
                        race.count += nombre;
                    }).error(function() {
                        $scope.setListLoading(false);
                    });
                    chienFactory.countByRace(race.id).success(function(nombre) {
                        race.count += nombre;
                    }).error(function() {
                        $scope.setListLoading(false);
                    });
                });
            };

            $scope.initTableRaces($scope.races);
            $scope.setListLoading(false);
        }).error(function() {
            $scope.setListLoading(false);
        });
    };
    // ->Races : Appel REST vers Factory : retrouver une race
    $scope.findRace = function(id) {
        $scope.setFormLoading(true);
        raceFactory.find(id).success(function(race) {
            $scope.setCurrentRace(race);
            $scope.setFormLoading(false);
        }).error(function() {
            $scope.setFormLoading(false);
        });
    };
    // ->Races : Appel REST vers Factory : créer ou mettre à jour une race
    $scope.saveRace = function() {
        if ($scope.isFillingValid()) {
            if ($scope.currentRace.id === null) {
                raceFactory.insert($scope.currentRace).success(function() {
                    $scope.initCurrentRace();
                    $scope.listRaces();
                }).error(function(err) {
                    showMessageInfo("Erreur", "La création n'a pas fonctionné correctement.");
                });
            } else {
                raceFactory.update($scope.currentRace).success(function() {
                    $scope.initCurrentRace();
                    $scope.listRaces();
                }).error(function(err) {
                    showMessageInfo("Erreur", "La mise à jour n'a pas fonctionné correctement.");
                });
            };
        }
    };
    // ->Races : Appel REST vers Factory : supprimer une race
    $scope.deleteRace = function(id) {
        raceFactory.delete(id).success(function() {
            if ($scope.currentRace.id === id) {
                $scope.initCurrentRace();
            }
            $scope.listRaces();
        }).error(function(err) {
            showMessageInfo("Erreur", "La suppression n'a pas fonctionné correctement.");
        });;
    };
    //--------------------------------------------------------------------------



    //--------------------------------------------------------------------------
    // Méthodes de manipulation et d'initialisation de formulaire
    //--------------------------------------------------------------------------    
    $scope.initCurrentRace = function() {
        // Remettre le bean à 0 pour qu'il puisse se mettre en mode ajout
        $scope.currentRace = {
            id: null,
            nom: ''
        };
        // Indiquer au scope qu'on revient en mode ajout, et donc le titre du formulaire va changer
        $scope.editionMode = false;
        // Mise à zéro du formulaire donc tout message d'erreur actuellement affiché est retiré
        $scope.raceFormError = false;
    };
    $scope.setCurrentRace = function(race) {
        $scope.currentRace = race;
        // Indiquer au scope qu'on revient en mode ajout, et donc le titre du formulaire va changer
        $scope.editionMode = true;
    };
    $scope.isFillingValid = function() {
        if ($scope.currentRace.nom === null || $scope.currentRace.nom === '') {
            $scope.raceFormError = true;
            $scope.raceFormErrorMessage = 'Le champ nom est obligatoire.';
            return false;
        }
        return true;
    };
    // initialisation de la table des races
    $scope.initTableRaces = function(races) {
        $scope.tableParams = new NgTableParams({
            // PARAMETRES   
            sorting: { nom: "asc" }, // initialiser le tri sur le numero ascendant
            count: 15 // nbre d elements affiches par defaut
        }, {
            // DONNEES
            counts: [5, 10, 15, 20, 50], // choix d'affichage du nombre d elements par page. tableau vide = absence de choix d elements par page
            dataset: races // fournir la liste de donnees
        });
    };
    $scope.setFormLoading = function(loading) {
        setLoading('.form-race', loading);
    };

    $scope.setListLoading = function(loading) {
        setLoading('.box-list-races', loading);
    };

    //--------------------------------------------------------------------------    


    //--------------------------------------------------------------------------
    // MAIN
    //--------------------------------------------------------------------------
    // Mettre à vide un bean race en cas d'ajout
    $scope.initCurrentRace();
    // Récupérer via REST les équipes en DB pour initialiser la ng-table
    $scope.listRaces();

    //--------------------------------------------------------------------------



}]);