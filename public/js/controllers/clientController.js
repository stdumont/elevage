angular.module('elevageApp').controller('clientController', ['$scope', '$route', '$http', 'clientFactory', 'chienFactory', 'NgTableParams', '$sce', function($scope, $route, $http, clientFactory, chienFactory, NgTableParams, $sce) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    //--------------------------------------------------------------------------
    // Variables
    //--------------------------------------------------------------------------
    $scope.clients = null;
    $scope.currentClient = null;
    $scope.searchResultsTitle = "Résultats de la recherche";
    $scope.criteriaNom = null;
    $scope.criteriaPrenom = null;
    $scope.criteriaTel = null;
    $scope.criteriaMail = null;
    $scope.criteriaCodePostal = null;
    $scope.criteriaLocalite = null;
    $scope.criteriaPays = null;
    $scope.criteriaProprietaire = null;
    $scope.typeRecherche = null;
    $scope.titleAddUpdate = null;

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
            title: 'Téléphone',
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
            title: 'Voir',
            field: '',
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

    // Click sur le bouton effacer les critères de recherche standards
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

    // Click sur le bouton effacer les critères de recherche par chien
    $scope.onClickClearSearchByDog = function() {
        // effacer le critère
        $scope.criteriaProprietaire = null;
    };

    // Click sur le bouton rechercher des critères de recherche standards
    $scope.onClickStartSearchStandard = function() {
        $scope.typeRecherche = "Standard";
        // on cache la box des critères
        // $(".box-search-criterias [data-widget='collapse']").click();

        clientFactory.getBySearchStandard(
            $scope.criteriaNom,
            $scope.criteriaPrenom,
            $scope.criteriaTel,
            $scope.criteriaMail,
            $scope.criteriaCodePostal,
            $scope.criteriaLocalite,
            $scope.criteriaPays
        )

        .success(function(clients) {
                $scope.listClients(clients);
            })
            .error(function(error) {
                console.log("Erreur de la recherche standard de clients");
            });

        $scope.scroll2Top('searchResultsDiv');
    };

    // Click sur le bouton rechercher des critères de recherche par chien
    $scope.onClickStartSearchByDog = function() {
        $scope.typeRecherche = "ByDog";
        // on cache la box des critères
        // $(".box-search-criterias [data-widget='collapse']").click();

        clientFactory.getBySearchByDog(
            $scope.criteriaProprietaire
        )

        .success(function(clients) {
                $scope.listClients(clients);
            })
            .error(function(error) {
                console.log("Erreur de la recherche par chien de clients");
            });

        $scope.scroll2Top('searchResultsDiv');
    };

    // Se positionner dans l'écran
    $scope.scroll2Top = function(id) {
        // Scroll to TitreClient
        var div = $('#' + id);
        $('html,body').animate({
            scrollTop: div.offset().top - 10
        }, 'slow');
    };

    // Transformer une date YYYY-MM-DD en DD/MM/YYYY
    $scope.toJMA = function(dateAMJ) {
        if (dateAMJ) {
            return moment(dateAMJ, 'YYYY-MM-DD').format('DD/MM/YYYY');
        }
        return '';
    };

    // [buttonSave:onClick] : clic ou validation du bouton sauvegarder
    $scope.onClickSave = function() {
        $scope.saveClient();

    };

    // Click sur le bouton permettant de voir toutes les données du client
    $scope.onClickView = function(client) {
        $scope.currentClient = client;
        $('#modalView').modal();
    };

    // Click sur le bouton permettant de voir les chiens du client
    $scope.onClickViewDogs = function(client) {
        $scope.currentClient = client;
        $('#modalViewDogs').modal();
    };

    // Click sur le bouton d'ajout d'un client
    $scope.onClickAdd = function() {
        $scope.titleAddUpdate = 'Ajout d\'un nouveau client';
        $('#nomFormGroup').removeClass('has-error');
        $('#nomHelpBlock').addClass('hide');
        $scope.currentClient = {
            id: null,
            nom: null,
            prenom: null,
            rue: null,
            numero: null,
            code_postal: null,
            localite: null,
            pays: 'Belgique',
            tel1: null,
            tel2: null,
            email: null,
            remarques: null,
        };
        $('#modalAddUpdate').modal();
    };

    // Click sur le bouton d'édition d'un élément du tableau
    $scope.onClickEdit = function(client) {
        $scope.titleAddUpdate = 'Mise à jour d\'un client';
        $scope.currentClient = client;
        $('#nomFormGroup').removeClass('has-error');
        $('#nomHelpBlock').addClass('hide');
        $('#modalAddUpdate').modal();
    };

    // Click sur le bouton suppression d'un élément du tableau
    $scope.onClickDelete = function(client) {
        $scope.deleteClient(client.id);
    };

    // Fonction permettant de déterminer si un client peut être supprimé (vrai s'il n'a pas de chiens)
    $scope.isDeletable = function(client) {
        return client.chiens.length === 0 ? true : false;
    };
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    // Accès vers la couche REST (lien avec les factories Angular)
    //--------------------------------------------------------------------------
    // Lister les clients
    $scope.listClients = function(clients) {
        $scope.setListLoading(true);
        $scope.searchResultsTitle = "Résultats de la recherche (" + clients.length + ")";
        $scope.clients = clients;
        $scope.initTableClients($scope.clients);
        $scope.setListLoading(false);

    };
    // ->Clients : Appel REST vers Factory : créer ou mettre à jour un client
    $scope.saveClient = function() {
        if ($scope.isFillingValid()) {
            if ($scope.currentClient.id === null) {
                clientFactory.insert($scope.currentClient).success(function() {
                    $scope.afterCUD();
                }).error(function(err) {
                    showMessageInfo("Erreur", "La création n'a pas fonctionné correctement.");
                });
            } else {
                clientFactory.update($scope.currentClient).success(function() {
                    $scope.afterCUD();
                }).error(function(err) {
                    showMessageInfo("Erreur", "La mise à jour n'a pas fonctionné correctement.");
                });
            };
            $('#modalAddUpdate').modal('hide');

        } else {
            $('#nomFormGroup').addClass('has-error');
            $('#nomHelpBlock').removeClass('hide');
        }
    };
    // ->Clients : Appel REST vers Factory : supprimer un client
    $scope.deleteClient = function(id) {
        clientFactory.delete(id).success(function() {
            $scope.afterCUD;
        }).error(function(err) {
            showMessageInfo("Erreur", "La suppression n'a pas fonctionné correctement.");
        });
    };
    //
    $scope.afterCUD = function() {
        console.log($scope.typeRecherche);
        if ($scope.typeRecherche === 'Standard') {
            $scope.onClickStartSearchStandard();
        } else {
            $scope.onClickStartSearchByDog();
        };
    };
    //--------------------------------------------------------------------------



    //--------------------------------------------------------------------------
    // Méthodes de manipulation et d'initialisation de formulaire
    //--------------------------------------------------------------------------
    $scope.isFillingValid = function() {
        if (!$scope.currentClient.nom) {
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
        setLoading('.box-search-results', loading);
    };

    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    // MAIN
    //--------------------------------------------------------------------------
    // Mettre à vide un bean client en cas d'ajout
    $("#tabs").tabs();
    //--------------------------------------------------------------------------



}]);