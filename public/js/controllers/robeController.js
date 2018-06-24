angular.module('elevageApp').controller('robeController', ['$scope', '$route', '$http', 'robeFactory', 'raceFactory', 'chienFactory', 'NgTableParams', '$sce', function($scope, $route, $http, robeFactory, raceFactory, chienFactory, NgTableParams, $sce) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    //--------------------------------------------------------------------------
    // Variables
    //--------------------------------------------------------------------------
    // Titre du formulaire, utilisé via le ng-hide editionMode dans le <h3>
    $scope.titreAjout = "Ajouter une robe";
    // Titre du formulaire, utilisé via le ng-show editionMode dans le <h3>
    $scope.titreEdit = "Modifier une robe";
    // Permet d'affiche/masquer le mode ajout ou edition
    $scope.editionMode = false;
    // Liste des robes
    $scope.robes = null;
    // Liste des races
    $scope.races = null;
    // Typedoc en cours d'ajout ou d'édition
    $scope.currentRobe = null;
    // Filtre de recherche
    $scope.inputFilterRobe = '';
    // Message d'erreur si problème dans la validation
    $scope.robeFormErrorMessage = '';
    // Bool qui indique si il y a une erreur dans la validation du formulaire
    $scope.robeFormError = false;
    //--------------------------------------------------------------------------



    //--------------------------------------------------------------------------
    // Evènements de la couche UI
    //--------------------------------------------------------------------------
    // [buttonSave:onClick] : clic ou validation du bouton sauvegarder
    $scope.onClickSave = function() {
        $scope.saveRobe();
    };
    // [buttonCancel:onClick] : clic ou validation du bouton annuler
    $scope.onClickCancel = function() {
        // Qd on annule, on revient en mode ajout.
        $scope.initCurrentRobe();
    };
    // [table:buttonEdit:onClick] : clic sur le bouton d'édition d'un élément du tableau
    $scope.onClickEdit = function(robe) {
        $scope.findRobe(robe.id);
    };
    // [table:buttonDelete:onClick] : clic sur le bouton delete d'un élément du tableau
    $scope.onClickDelete = function(robe) {
        $scope.deleteRobe(robe.id);
    };
    $scope.$watch("inputFilterRobe", function(newValue, oldValue) {
        $scope.filterRobes();
    });

    $scope.isDeletable = function(robe) {
        return robe.count == 0 ? true : false;
    };
    //--------------------------------------------------------------------------


    $scope.filterRobes = function() {
        var filteredRobes = [];
        $.each($scope.robes, function(index, robe) {
            let filtre = $scope.inputFilterRobe.toLowerCase();
            let element = robe.nom.toLowerCase();
            if (element.indexOf(filtre) > -1) {
                filteredRobes.push(robe);
            }
        });
        if (typeof $scope.tableParams !== 'undefined') {
            $scope.tableParams.reload();
        }
        $scope.initTableRobes(filteredRobes);
    };



    //--------------------------------------------------------------------------
    // Accès vers la couche REST (lien avec les factories Angular)
    //--------------------------------------------------------------------------

    // ->Robes : Appel REST vers Factory : lister les robes
    $scope.listRobes = function() {
        $scope.setListLoading(true);
        robeFactory.list().success(function(robes) {
            $scope.robes = robes;

            if ($scope.robes !== null) {
                $.each($scope.robes, function(index, robe) {
                    robe.count = 0;
                    chienFactory.countByRobe(robe.id).success(function(nombre) {
                        robe.count += nombre;
                    }).error(function() {
                        $scope.setListLoading(false);
                    });
                });
            };

            $scope.initTableRobes($scope.robes);
            $scope.setListLoading(false);
        }).error(function() {
            $scope.setListLoading(false);
        });
    };

    // ->Races : Appel REST vers Factory : lister les races
    $scope.listRaces = function() {
        raceFactory.list().success(function(races) {
            $scope.races = races;
            var selectCallBack = function(id) {
                $scope.currentRobe.race_id = id;
            };

            // creer les objets UI et initialiser le select2
            var raceToSelect2 = function(race) {
                return { id: race.id, text: race.nom };
            };

            setSelect2(".races-select", races, null, raceToSelect2, $scope.select2Template, selectCallBack);

        }).error(function() {});
    };

    // ->Robes : Appel REST vers Factory : retrouver une robe
    $scope.findRobe = function(id) {
        $scope.setFormLoading(true);
        robeFactory.find(id).success(function(robe) {
            $scope.setCurrentRobe(robe);
            $scope.setFormLoading(false);
        }).error(function() {
            $scope.setFormLoading(false);
        });
    };

    // ->Robes : Appel REST vers Factory : créer ou mettre à jour une robe
    $scope.saveRobe = function() {
        if ($scope.isFillingValid()) {
            if ($scope.currentRobe.id === null) {
                robeFactory.insert($scope.currentRobe).success(function() {
                    $scope.initCurrentRobe();
                    $scope.listRobes();
                }).error(function(err) {
                    showMessageInfo("Erreur", "La création n'a pas fonctionné correctement.");
                });
            } else {
                robeFactory.update($scope.currentRobe).success(function() {
                    $scope.initCurrentRobe();
                    $scope.listRobes();
                }).error(function(err) {
                    showMessageInfo("Erreur", "La mise à jour n'a pas fonctionné correctement.");
                });
            };
        }
    };

    // ->Robes : Appel REST vers Factory : supprimer une robe
    $scope.deleteRobe = function(id) {
        robeFactory.delete(id).success(function() {
            if ($scope.currentRobe.id === id) {
                $scope.initCurrentRobe();
            }
            $scope.listRobes();
        }).error(function(err) {
            showMessageInfo("Erreur", "La suppression n'a pas fonctionné correctement.");
        });;
    };
    //--------------------------------------------------------------------------



    //--------------------------------------------------------------------------
    // Méthodes de manipulation et d'initialisation de formulaire
    //--------------------------------------------------------------------------    
    $scope.initCurrentRobe = function() {
        // Remettre le bean à 0 pour qu'il puisse se mettre en mode ajout
        $scope.currentRobe = {
            id: null,
            race_id: null,
            nom: ''
        };
        // Indiquer au scope qu'on revient en mode ajout, et donc le titre du formulaire va changer
        $scope.editionMode = false;
        // Mise à zéro du formulaire donc tout message d'erreur actuellement affiché est retiré
        $scope.robeFormError = false;
    };
    $scope.setCurrentRobe = function(robe) {
        $scope.currentRobe = robe;
        $('.races-select').select2('val', robe.race.id);
        // Indiquer au scope qu'on revient en mode ajout, et donc le titre du formulaire va changer
        $scope.editionMode = true;
    };
    $scope.isFillingValid = function() {
        if ($scope.currentRobe.nom === null || $scope.currentRobe.nom === '') {
            $scope.robeFormError = true;
            $scope.robeFormErrorMessage = 'Le champ nom est obligatoire.';
            return false;
        }
        return true;
    };

    // initialisation de la table des robes
    $scope.initTableRobes = function(robes) {
        $scope.tableParams = new NgTableParams({
            // PARAMETRES   
            sorting: {
                nom: "asc"
            }, // initialiser le tri sur le numero ascendant
            count: 15 // nbre d elements affiches par defaut
        }, {
            // DONNEES
            counts: [5, 10, 15, 20, 50], // choix d'affichage du nombre d elements par page. tableau vide = absence de choix d elements par page
            dataset: robes // fournir la liste de donnees
        });
    };
    $scope.setFormLoading = function(loading) {
        setLoading('.form-robe', loading);
    };

    $scope.setListLoading = function(loading) {
        setLoading('.box-list-robes', loading);
    };

    //--------------------------------------------------------------------------    


    //--------------------------------------------------------------------------
    // MAIN
    //--------------------------------------------------------------------------
    // Mettre à vide un bean robe en cas d'ajout
    $scope.initCurrentRobe();
    // Récupérer les robes pour initialiser la ng-table
    $scope.listRobes();
    // Récupérer les races pour le select du formulaire
    emptySelect2(".races-select");
    $scope.listRaces();

    //--------------------------------------------------------------------------



}]);