angular.module('intranetApp').controller('fournisseurController', ['$scope', '$route', '$http', 'fournisseurFactory', 'documentFactory', 'NgTableParams', '$sce', function($scope, $route, $http, fournisseurFactory, documentFactory, NgTableParams, $sce) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    //--------------------------------------------------------------------------
    // Variables
    //--------------------------------------------------------------------------
    // Titre du formulaire, utilisé via le ng-hide editionMode dans le <h3>
    $scope.titreAjout = "Ajouter un fournisseur";
    // Titre du formulaire, utilisé via le ng-show editionMode dans le <h3>
    $scope.titreEdit = "Modifier un fournisseur";
    // Permet d'affiche/masquer le mode ajout ou edition
    $scope.editionMode = false;
    // Liste des fournisseurs
    $scope.fournisseurs = null;
    // Typedoc en cours d'ajout ou d'édition
    $scope.currentFournisseur = null;
    // Filtre de recherche
    $scope.inputFilterFournisseur = '';
    // Message d'erreur si problème dans la validation
    $scope.fournisseurFormErrorMessage = '';
    // Bool qui indique si il y a une erreur dans la validation du formulaire
    $scope.fournisseurFormError = false;
    //--------------------------------------------------------------------------



    //--------------------------------------------------------------------------
    // Evènements de la couche UI
    //--------------------------------------------------------------------------
    // [buttonSave:onClick] : clic ou validation du bouton sauvegarder
    $scope.onClickSave = function() {
        $scope.saveFournisseur();
    };
    // [buttonCancel:onClick] : clic ou validation du bouton annuler
    $scope.onClickCancel = function() {
        // Qd on annule, on revient en mode ajout.
        $scope.initCurrentFournisseur();
    };
    // [table:buttonEdit:onClick] : clic sur le bouton d'édition d'un élément du tableau
    $scope.onClickEdit = function(fournisseur) {
        $scope.findFournisseur(fournisseur.id);
    };
    // [table:buttonDelete:onClick] : clic sur le bouton delete d'un élément du tableau
    $scope.onClickDelete = function(fournisseur) {
        $scope.deleteFournisseur(fournisseur.id);
    };
    $scope.$watch("inputFilterFournisseur", function(newValue, oldValue) {
        $scope.filterFournisseurs();
    });

    $scope.isDeletable = function(fournisseur) {
        return fournisseur.count == 0 ? true : false;
    };
    //--------------------------------------------------------------------------


    $scope.filterFournisseurs = function() {
        var filteredFournisseurs = [];
        $.each($scope.fournisseurs, function(index, fournisseur) {
            let filtre = $scope.inputFilterFournisseur.toLowerCase();
            let element = fournisseur.nom.toLowerCase();
            if (element.indexOf(filtre) > -1) {
                filteredFournisseurs.push(fournisseur);
            }
        });
        if (typeof $scope.tableParams !== 'undefined') {
            $scope.tableParams.reload();
        }
        $scope.initTableFournisseurs(filteredFournisseurs);
    };



    //--------------------------------------------------------------------------
    // Accès vers la couche REST (lien avec les factories Angular)
    //--------------------------------------------------------------------------
    // ->Fournisseurs : Appel REST vers Factory : lister les fournisseurs
    $scope.listFournisseurs = function() {
        $scope.setListLoading(true);
        fournisseurFactory.list().success(function(fournisseurs) {
            $scope.fournisseurs = fournisseurs;

            if ($scope.fournisseurs !== null) {
                $.each($scope.fournisseurs, function(index, fournisseur) {
                    documentFactory.countByFournisseur(fournisseur.id).success(function(nombre) {
                        fournisseur.count = nombre;
                    }).error(function() {
                        $scope.setListLoading(false);
                    });
                });
            };

            $scope.initTableFournisseurs($scope.fournisseurs);
            $scope.setListLoading(false);
        }).error(function() {
            $scope.setListLoading(false);
        });
    };
    // ->Fournisseurs : Appel REST vers Factory : retrouver un fournisseur
    $scope.findFournisseur = function(id) {
        $scope.setFormLoading(true);
        fournisseurFactory.find(id).success(function(fournisseur) {
            $scope.setCurrentFournisseur(fournisseur);
            $scope.setFormLoading(false);
        }).error(function() {
            $scope.setFormLoading(false);
        });
    };
    // ->Fournisseurs : Appel REST vers Factory : créer ou mettre à jour un fournisseur
    $scope.saveFournisseur = function() {
        if ($scope.isFillingValid()) {
            if ($scope.currentFournisseur.id === null) {
                fournisseurFactory.insert($scope.currentFournisseur).success(function() {
                    $scope.initCurrentFournisseur();
                    $scope.listFournisseurs();
                }).error(function(err) {
                    showMessageInfo("Erreur", "La création n'a pas fonctionné correctement.");
                });
            } else {
                fournisseurFactory.update($scope.currentFournisseur).success(function() {
                    $scope.initCurrentFournisseur();
                    $scope.listFournisseurs();
                }).error(function(err) {
                    showMessageInfo("Erreur", "La mise à jour n'a pas fonctionné correctement.");
                });
            };
        }
    };
    // ->Fournisseurs : Appel REST vers Factory : supprimer un fournisseur
    $scope.deleteFournisseur = function(id) {
        fournisseurFactory.delete(id).success(function() {
            if ($scope.currentFournisseur.id === id) {
                $scope.initCurrentFournisseur();
            }
            $scope.listFournisseurs();
        }).error(function(err) {
            showMessageInfo("Erreur", "La suppression n'a pas fonctionné correctement.");
        });
    };
    //--------------------------------------------------------------------------



    //--------------------------------------------------------------------------
    // Méthodes de manipulation et d'initialisation de formulaire
    //--------------------------------------------------------------------------    
    $scope.initCurrentFournisseur = function() {
        // Remettre le bean à 0 pour qu'il puisse se mettre en mode ajout
        $scope.currentFournisseur = {
            id: null,
            nom: '',
            rue: null,
            numero: null,
            cp: null,
            localite: null,
            tel: null,
            email: null,
            tva: null,
            banque: null
        };
        // Indiquer au scope qu'on revient en mode ajout, et donc le titre du formulaire va changer
        $scope.editionMode = false;
        // Mise à zéro du formulaire donc tout message d'erreur actuellement affiché est retiré
        $scope.fournisseurFormError = false;
    };
    $scope.setCurrentFournisseur = function(fournisseur) {
        $scope.currentFournisseur = fournisseur;
        // Indiquer au scope qu'on revient en mode ajout, et donc le titre du formulaire va changer
        $scope.editionMode = true;
    };
    $scope.isFillingValid = function() {
        if ($scope.currentFournisseur.nom === null || $scope.currentFournisseur.nom === '') {
            $scope.fournisseurFormError = true;
            $scope.fournisseurFormErrorMessage = 'Le champ nom est obligatoire.';
            return false;
        }
        return true;
    };
    // initialisation de la table des fournisseurs
    $scope.initTableFournisseurs = function(fournisseurs) {
        $scope.tableParams = new NgTableParams({
            // PARAMETRES   
            sorting: { nom: "asc" }, // initialiser le tri sur le numero ascendant
            count: 15 // nbre d elements affiches par defaut
        }, {
            // DONNEES
            counts: [5, 10, 15, 20, 50], // choix d'affichage du nombre d elements par page. tableau vide = absence de choix d elements par page
            dataset: fournisseurs // fournir la liste de donnees
        });
    };
    $scope.setFormLoading = function(loading) {
        setLoading('.form-fournisseur', loading);
    };

    $scope.setListLoading = function(loading) {
        setLoading('.box-list-fournisseurs', loading);
    };

    //--------------------------------------------------------------------------    


    //--------------------------------------------------------------------------
    // MAIN
    //--------------------------------------------------------------------------
    // Mettre à vide un bean fournisseur en cas d'ajout
    $scope.initCurrentFournisseur();
    // Récupérer via REST les équipes en DB pour initialiser la ng-table
    $scope.listFournisseurs();

    //--------------------------------------------------------------------------



}]);