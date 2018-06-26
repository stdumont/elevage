angular.module('elevageApp').controller('clientController', ['$scope', '$route', '$http', 'clientFactory', 'chienFactory', 'NgTableParams', '$sce', function($scope, $route, $http, clientFactory, chienFactory, NgTableParams, $sce) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    //--------------------------------------------------------------------------
    // Variables
    //--------------------------------------------------------------------------
    $scope.clients = null;
    $scope.currentClient = null;
    $scope.clientFormErrorMessage = '';
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
            title: 'Nom, prénom',
            field: '',
            visible: true,
            class: ''
        },
        {
            title: 'Chiens',
            field: '',
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

    // Click sur le bouton annuler des critères de recherche standards
    $scope.onClickClearSearchStandard = function() {
        // effacer les critères
        $scope.criteriaNom = null;
        $scope.criteriaPrenom = null;
        $scope.criteriaTel = null;
        $scope.criteriaMail = null;
        $scope.criteriaCodePostal = null;
        $scope.criteriaLocalite = null;
        $scope.criteriaPays = null;
    };

    // Click sur le bouton annuler des critères de recherche par chien
    $scope.onClickClearSearchByDog = function() {
        // effacer le critère
        $scope.criteriaProprietaire = null;
    };

    // Click sur le bouton rechercher des critères de recherche standards
    $scope.onClickStartSearchStandard = function() {
        // on cache la box des critères
        // $(".box-search-criterias [data-widget='collapse']").click();
        $scope.listClients();
        $scope.scroll2Top('searchResultsDiv');
    };

    // Se positionner dans l'écran
    $scope.scroll2Top = function(id) {
        // Scroll to TitreClient
        var div = $('#' + id);
        $('html,body').animate({ scrollTop: div.offset().top - 10 }, 'slow');
    };

    // Click sur le bouton rechercher des critères de recherche par chien
    $scope.onClickStartSearchByDog = function() {
        // on cache la box des critères
        // $(".box-search-criterias [data-widget='collapse']").click();
        $scope.listClients();
        $scope.scroll2Top('searchResultsDiv');

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
    $scope.isDeletable = function(client) {
        return client.count == 0 ? true : false;
    };
    //--------------------------------------------------------------------------


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
                    chienFactory.countByClient(client.id)
                        .success(function(nombre) {
                            client.count = nombre;
                        }).error(function(err) {
                            showMessageInfo("Erreur", "La création n'a pas fonctionné correctement.");
                        });
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