angular.module('intranetApp').controller('typeDocumentController', ['$scope', '$route', '$http', 'typeDocumentFactory', 'documentFactory', 'NgTableParams', '$sce', function($scope, $route, $http, typeDocumentFactory, documentFactory, NgTableParams, $sce) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    //--------------------------------------------------------------------------
    // Variables
    //--------------------------------------------------------------------------
    // Titre du formulaire, utilisé via le ng-hide editionMode dans le <h3>
    $scope.titreAjout = "Ajouter un type de document";
    // Titre du formulaire, utilisé via le ng-show editionMode dans le <h3>
    $scope.titreEdit = "Modifier un type de document";
    // Permet d'affiche/masquer le mode ajout ou edition
    $scope.editionMode = false;
    // Liste des types de documents
    $scope.typedocs = null;
    // Typedoc en cours d'ajout ou d'édition
    $scope.currentTypedoc = null;
    // Filtre de recherche
    $scope.inputFilterTypedoc = '';
    // Message d'erreur si problème dans la validation
    $scope.typedocFormErrorMessage = '';
    // Bool qui indique si il y a une erreur dans la validation du formulaire
    $scope.typedocFormError = false;
    //--------------------------------------------------------------------------



    //--------------------------------------------------------------------------
    // Evènements de la couche UI
    //--------------------------------------------------------------------------
    // [buttonSave:onClick] : clic ou validation du bouton sauvegarder
    $scope.onClickSave = function() {
        $scope.currentTypedoc.rd = $('.rdSelect').val();
        if ($scope.currentTypedoc.rd === '') {
            $scope.currentTypedoc.rd = null;
        }
        $scope.saveTypedoc();
    };
    // [buttonCancel:onClick] : clic ou validation du bouton annuler
    $scope.onClickCancel = function() {
        // Qd on annule, on revient en mode ajout.
        $scope.initCurrentTypedoc();
    };
    // [table:buttonEdit:onClick] : clic sur le bouton d'édition d'un élément du tableau
    $scope.onClickEdit = function(typedoc) {
        $scope.findTypedoc(typedoc.id);
    };
    // [table:buttonDelete:onClick] : clic sur le bouton delete d'un élément du tableau
    $scope.onClickDelete = function(typedoc) {
        $scope.deleteTypedoc(typedoc.id);
    };
    $scope.$watch("inputFilterTypedoc", function(newValue, oldValue) {
        $scope.filterTypeDocs();
    });

    $scope.isDeletable = function(typedoc) {
        return typedoc.count == 0 ? true : false;
    };
    //--------------------------------------------------------------------------


    $scope.filterTypeDocs = function() {
        var filteredTypes = [];
        $.each($scope.typedocs, function(index, typeDocument) {
            let filtre = $scope.inputFilterTypedoc.toLowerCase();
            let element = typeDocument.nom.toLowerCase();
            if (element.indexOf(filtre) > -1) {
                filteredTypes.push(typeDocument);
            }
        });
        if (typeof $scope.tableParams !== 'undefined') {
            $scope.tableParams.reload();
        }
        $scope.initTableTypedocs(filteredTypes);
    };



    //--------------------------------------------------------------------------
    // Accès vers la couche REST (lien avec les factories Angular)
    //--------------------------------------------------------------------------
    // ->Types de document : Appel REST vers Factory : lister les types de documents
    $scope.listTypedocs = function() {
        $scope.setListLoading(true);
        typeDocumentFactory.list().success(function(typedocs) {
            $scope.typedocs = typedocs;

            if ($scope.typedocs !== null) {
                $.each($scope.typedocs, function(index, typedoc) {
                    documentFactory.countByTypedoc(typedoc.id).success(function(nombre) {
                        typedoc.count = nombre;
                    }).error(function() {
                        $scope.setListLoading(false);
                    });
                });
            };

            $scope.initTableTypedocs($scope.typedocs);
            $scope.setListLoading(false);
        }).error(function() {
            $scope.setListLoading(false);
        });
    };
    // ->Types de document : Appel REST vers Factory : retrouver un type de document
    $scope.findTypedoc = function(id) {
        $scope.setFormLoading(true);
        typeDocumentFactory.find(id).success(function(typedoc) {
            $scope.setCurrentTypedoc(typedoc);
            $('.rdSelect').val(typedoc.rd);
            $('.rdSelect').trigger('change');
            $scope.setFormLoading(false);
        }).error(function() {
            $scope.setFormLoading(false);
        });
    };
    // ->Types de document : Appel REST vers Factory : créer ou mettre à jour un type de document
    $scope.saveTypedoc = function() {
        if ($scope.isFillingValid()) {
            if ($scope.currentTypedoc.id === null) {
                typeDocumentFactory.insert($scope.currentTypedoc).success(function() {
                    $scope.initCurrentTypedoc();
                    $scope.listTypedocs();
                }).error(function(err) {
                    showMessageInfo("Erreur", "La création n'a pas fonctionné correctement.");
                });
            } else {
                typeDocumentFactory.update($scope.currentTypedoc).success(function() {
                    $scope.initCurrentTypedoc();
                    $scope.listTypedocs();
                }).error(function(err) {
                    showMessageInfo("Erreur", "La mise à jour n'a pas fonctionné correctement.");
                });
            };
        }
    };
    // ->Types de document : Appel REST vers Factory : supprimer un type de document
    $scope.deleteTypedoc = function(id) {
        typeDocumentFactory.delete(id).success(function() {
            if ($scope.currentTypedoc.id === id) {
                $scope.initCurrentTypedoc();
            }
            $scope.listTypedocs();
        }).error(function(err) {
            showMessageInfo("Erreur", "La suppression n'a pas fonctionné correctement.");
        });;
    };
    //--------------------------------------------------------------------------



    //--------------------------------------------------------------------------
    // Méthodes de manipulation et d'initialisation de formulaire
    //--------------------------------------------------------------------------    
    $scope.initCurrentTypedoc = function() {
        // Remettre le bean à 0 pour qu'il puisse se mettre en mode ajout
        $scope.currentTypedoc = {
            id: null,
            nom: '',
            rd: ''
        };
        $('.rdSelect').val('');
        $('.rdSelect').trigger('change');
        // Indiquer au scope qu'on revient en mode ajout, et donc le titre du formulaire va changer
        $scope.editionMode = false;
        // Mise à zéro du formulaire donc tout message d'erreur actuellement affiché est retiré
        $scope.typedocFormError = false;
    };
    $scope.setCurrentTypedoc = function(typedoc) {
        $scope.currentTypedoc = typedoc;
        // Indiquer au scope qu'on revient en mode ajout, et donc le titre du formulaire va changer
        $scope.editionMode = true;
    };
    $scope.isFillingValid = function() {
        if ($scope.currentTypedoc.nom === null || $scope.currentTypedoc.nom === '') {
            $scope.typedocFormError = true;
            $scope.typedocFormErrorMessage = 'Le champ nom est obligatoire.';
            return false;
        }
        return true;
    };
    // initialisation de la table des types de documents
    $scope.initTableTypedocs = function(types) {
        $scope.tableParams = new NgTableParams({
            // PARAMETRES   
            sorting: { nom: "asc" }, // initialiser le tri sur le numero ascendant
            count: 15 // nbre d elements affiches par defaut
        }, {
            // DONNEES
            counts: [5, 10, 15, 20, 50], // choix d'affichage du nombre d elements par page. tableau vide = absence de choix d elements par page
            dataset: types // fournir la liste de donnees
        });
    };
    $scope.setFormLoading = function(loading) {
        setLoading('.form-typedoc', loading);
    };

    $scope.setListLoading = function(loading) {
        setLoading('.box-list-typedocs', loading);
    };

    //--------------------------------------------------------------------------    


    //--------------------------------------------------------------------------
    // MAIN
    //--------------------------------------------------------------------------
    // Mettre à vide un bean typedoc en cas d'ajout
    $scope.initCurrentTypedoc();
    // Récupérer via REST les équipes en DB pour initialiser la ng-table
    $scope.listTypedocs();

    $('.rdSelect').select2({
        language: 'fr',
        width: '50%'
    });
    //--------------------------------------------------------------------------



}]);