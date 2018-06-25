angular.module('elevageApp').controller('clientController', ['$scope', '$route', '$http', 'clientFactory', 'NgTableParams', '$sce', function($scope, $route, $http, clientFactory, NgTableParams, $sce) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    //--------------------------------------------------------------------------
    // Variables
    //--------------------------------------------------------------------------
    // Titre du formulaire, utilisé via le ng-hide editionMode dans le <h3>
    $scope.titreAjout = "Ajouter un client";
    // Titre du formulaire, utilisé via le ng-show editionMode dans le <h3>
    $scope.titreEdit = "Modifier un client";
    // Permet d'affiche/masquer le mode ajout ou edition
    $scope.editionMode = false;
    // Liste des clients
    $scope.clients = null;
    // Typedoc en cours d'ajout ou d'édition
    $scope.currentClient = null;
    // Message d'erreur si problème dans la validation
    $scope.clientFormErrorMessage = '';
    // Bool qui indique si il y a une erreur dans la validation du formulaire
    $scope.clientFormError = false;
    $scope.searchResultsTitle = "Résultats de la recherche";
    $scope.criteriaNom = null;
    $scope.criteriaPrenom = null;
    $scope.criteriaTel = null;
    $scope.criteriaMail = null;
    $scope.criteriaCodePostal = null;
    $scope.criteriaLocalite = null;
    $scope.criteriaPays = null;
    $scope.criteriaProprietaire = null;

    // colonnes des résultats de la recherche
    $scope.columns = [{
            title: 'No',
            field: 'id',
            visible: true,
            class: ''
        },
        {
            title: 'Nom',
            field: 'nom',
            visible: true,
            class: ''
        },
        {
            title: 'Prénom',
            field: 'prenom',
            visible: true,
            class: ''
        },
        {
            title: 'Téléphone(s)',
            field: '',
            visible: true,
            class: ''
        },
        {
            title: 'E-mail',
            field: '',
            visible: true,
            class: ''
        },
        {
            title: 'Code postal',
            field: 'code_postal',
            visible: true,
            class: ''
        },
        {
            title: 'Localité',
            field: 'localite',
            visible: true,
            class: ''
        },
        {
            title: 'Pays',
            field: 'pays',
            visible: true,
            class: ''
        },
        {
            title: 'Editer',
            field: '',
            visible: true,
            class: ''
        },
        {
            title: 'Suppr.',
            field: '',
            visible: true,
            class: ''
        }
    ];

    //--------------------------------------------------------------------------



    //--------------------------------------------------------------------------
    // Evènements de la couche UI
    //--------------------------------------------------------------------------

    // Click sur le bouton annuler des critères de recherche
    $scope.onClickClearSearch = function() {
        // effacer les critères
        $scope.criteriaNom = null;
        $scope.criteriaPrenom = null;
        $scope.criteriaTel = null;
        $scope.criteriaMail = null;
        $scope.criteriaCodePostal = null;
        $scope.criteriaLocalite = null;
        $scope.criteriaPays = null;
        $scope.criteriaProprietaire = null;
    };

    // Click sur le bouton rechercher des critères de recherche
    $scope.onClickStartSearch = function() {
        // on cache la box des critères
        $(".box-search-criterias [data-widget='collapse']").click();
        $scope.listClients();

    };

    // [buttonSave:onClick] : clic ou validation du bouton sauvegarder
    $scope.onClickSave = function() {
        $scope.saveClient();
    };
    // [buttonCancel:onClick] : clic ou validation du bouton annuler
    $scope.onClickCancel = function() {
        // Qd on annule, on revient en mode ajout.
        $scope.initCurrentClient();
    };
    // [table:buttonEdit:onClick] : clic sur le bouton d'édition d'un élément du tableau
    $scope.onClickEdit = function(client) {
        $scope.findClient(client.id);
    };
    // [table:buttonDelete:onClick] : clic sur le bouton delete d'un élément du tableau
    $scope.onClickDelete = function(client) {
        $scope.deleteClient(client.id);
    };
    $scope.$watch("inputFilterClient", function(newValue, oldValue) {
        $scope.filterClients();
    });

    $scope.isDeletable = function(client) {
        return client.count == 0 ? true : false;
    };
    //--------------------------------------------------------------------------


    $scope.filterClients = function() {
        var filteredClients = [];
        $.each($scope.clients, function(index, client) {
            let filtre = $scope.inputFilterClient.toLowerCase();
            let element = client.nom.toLowerCase();
            if (element.indexOf(filtre) > -1) {
                filteredClients.push(client);
            }
        });
        if (typeof $scope.tableParams !== 'undefined') {
            $scope.tableParams.reload();
        }
        $scope.initTableClients(filteredClients);
    };



    //--------------------------------------------------------------------------
    // Accès vers la couche REST (lien avec les factories Angular)
    //--------------------------------------------------------------------------
    // ->Clients : Appel REST vers Factory : lister les clients
    $scope.listClients = function() {
        $scope.setListLoading(true);
        $scope.searchResultsTitle = "Résultats de la recherche";
        clientFactory.list().success(function(clients) {
            $scope.clients = clients;

            if ($scope.clients !== null) {
                $.each($scope.clients, function(index, client) {
                    // TODO: compter les références dans les chiens
                    client.count = 0;


                });
                $scope.searchResultsTitle = "Résultats de la recherche (" + $scope.clients.length + ")";
            };

            $scope.initTableClients($scope.clients);
            $scope.setListLoading(false);
        }).error(function() {
            $scope.setListLoading(false);
        });
    };
    // ->Clients : Appel REST vers Factory : retrouver un client
    $scope.findClient = function(id) {
        $scope.setFormLoading(true);
        clientFactory.find(id).success(function(client) {
            $scope.setCurrentClient(client);
            $scope.setFormLoading(false);
        }).error(function() {
            $scope.setFormLoading(false);
        });
    };
    // ->Clients : Appel REST vers Factory : créer ou mettre à jour un client
    $scope.saveClient = function() {
        if ($scope.isFillingValid()) {
            if ($scope.currentClient.id === null) {
                clientFactory.insert($scope.currentClient).success(function() {
                    $scope.initCurrentClient();
                    $scope.listClients();
                }).error(function(err) {
                    showMessageInfo("Erreur", "La création n'a pas fonctionné correctement.");
                });
            } else {
                clientFactory.update($scope.currentClient).success(function() {
                    $scope.initCurrentClient();
                    $scope.listClients();
                }).error(function(err) {
                    showMessageInfo("Erreur", "La mise à jour n'a pas fonctionné correctement.");
                });
            };
        }
    };
    // ->Clients : Appel REST vers Factory : supprimer un client
    $scope.deleteClient = function(id) {
        clientFactory.delete(id).success(function() {
            if ($scope.currentClient.id === id) {
                $scope.initCurrentClient();
            }
            $scope.listClients();
        }).error(function(err) {
            showMessageInfo("Erreur", "La suppression n'a pas fonctionné correctement.");
        });
    };
    //--------------------------------------------------------------------------



    //--------------------------------------------------------------------------
    // Méthodes de manipulation et d'initialisation de formulaire
    //--------------------------------------------------------------------------
    $scope.initCurrentClient = function() {
        // Remettre le bean à 0 pour qu'il puisse se mettre en mode ajout
        $scope.currentClient = {
            id: null,
            nom: '',
            rue: null,
            numero: null,
            cp: null,
            localite: null,
            tel: null,
            email: null
        };
        // Indiquer au scope qu'on revient en mode ajout, et donc le titre du formulaire va changer
        $scope.editionMode = false;
        // Mise à zéro du formulaire donc tout message d'erreur actuellement affiché est retiré
        $scope.clientFormError = false;
    };
    $scope.setCurrentClient = function(client) {
        $scope.currentClient = client;
        // Indiquer au scope qu'on revient en mode ajout, et donc le titre du formulaire va changer
        $scope.editionMode = true;
    };
    $scope.isFillingValid = function() {
        if ($scope.currentClient.nom === null || $scope.currentClient.nom === '') {
            $scope.clientFormError = true;
            $scope.clientFormErrorMessage = 'Le champ nom est obligatoire.';
            return false;
        }
        return true;
    };
    // initialisation de la table des clients
    $scope.initTableClients = function(clients) {
        $scope.tableParams = new NgTableParams({
            // PARAMETRES
            sorting: {
                nom: "asc"
            }, // initialiser le tri sur le numero ascendant
            count: 15 // nbre d elements affiches par defaut
        }, {
            // DONNEES
            counts: [5, 10, 15, 20, 50], // choix d'affichage du nombre d elements par page. tableau vide = absence de choix d elements par page
            dataset: clients // fournir la liste de donnees
        });
    };
    $scope.setFormLoading = function(loading) {
        setLoading('.form-client', loading);
    };

    $scope.setListLoading = function(loading) {
        setLoading('.box-list-clients', loading);
    };

    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    // MAIN
    //--------------------------------------------------------------------------
    // Mettre à vide un bean client en cas d'ajout
    $scope.initCurrentClient();


    //--------------------------------------------------------------------------



}]);