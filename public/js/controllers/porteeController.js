angular.module('elevageApp').controller('porteeController', ['$scope', '$route', '$http', 'porteeFactory', 'chienFactory', 'NgTableParams', '$sce', function($scope, $route, $http, porteeFactory, chienFactory, NgTableParams, $sce) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    //--------------------------------------------------------------------------
    // Variables
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    $scope.criteriaPere = null;
    $scope.criteriaMere = null;
    $scope.criteriaNaissanceDu = null;
    $scope.criteriaNaissanceDuAMJ = null;
    $scope.criteriaNaissanceAu = null;
    $scope.criteriaNaissanceAuAMJ = null;
    $scope.searchResultsTitle = "Résultats de la recherche";
    $scope.action = null;
    $scope.actionView = 'View';
    $scope.actionAdd = 'Add';
    $scope.actionUpdate = 'Update';
    $scope.actionDelete = 'Delete';
    $scope.title = null;
    $scope.titleView = 'Fiche portée n° ';
    $scope.titleAdd = 'Ajouter une portée';
    $scope.titleUpdate = 'Modifier une portée';
    $scope.titleDelete = 'Supprimer une portée';


    // colonnes des résultats de la recherche
    $scope.columns = [{
            title: 'No',
            field: '',
            visible: true,
            class: ''
        },
        {
            title: 'Race',
            field: '',
            visible: true,
            class: ''
        },
        {
            title: 'Naissance',
            field: '',
            visible: true,
            class: ''
        },
        {
            title: 'Père',
            field: '',
            visible: true,
            class: ''
        },
        {
            title: 'Mère',
            field: '',
            visible: true,
            class: ''
        },
        {
            title: 'Chiots',
            field: '',
            visible: true,
            class: ''
        },
        {
            title: 'Mâles',
            field: '',
            visible: true,
            class: ''
        },
        {
            title: 'Femelles',
            field: '',
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
            title: 'Supprimer',
            field: '',
            visible: true,
            class: ''
        }
    ];


    //--------------------------------------------------------------------------
    // Evènements de la couche UI
    //--------------------------------------------------------------------------

    // initialisation de la table des portées
    $scope.initTablePortees = function(portees) {
        $scope.tableParams = new NgTableParams({
            // PARAMETRES
            sorting: {
                date_naissance: "desc"
            }, // initialiser le tri sur le numero ascendant
            count: 15 // nbre d elements affiches par defaut
        }, {
            // DONNEES
            counts: [5, 10, 15, 20, 50], // choix d'affichage du nombre d elements par page. tableau vide = absence de choix d elements par page
            dataset: portees // fournir la liste de donnees
        });
    };

    // Lister les mères (critères)
    $scope.listMeres = function() {
        chienFactory.getMeres(null).success(function(meres) {
            $scope.meres = meres;
            var toutesMeres = {
                id: -1,
                text: "Toutes les mères"
            };
            $scope.meres.splice(0, 0, toutesMeres);
            $(".meres-select").select2({
                language: "fr",
                data: $scope.meres
            });

            $('.meres-select').on('change', function(e) {
                var datas = $('.meres-select').select2('data');
                var data = datas[0];
                if (data.id === -1) {
                    $scope.criteriaMere = null;
                } else {
                    $scope.criteriaMere = data.id;
                };
            });

            $(".meres-select").val(-1).trigger('change');


        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des mères.");
        });
    };

    // Lister les pères (critères)
    $scope.listPeres = function() {
        chienFactory.getPeres(null).success(function(peres) {
            $scope.peres = peres;
            var tousPeres = {
                id: -1,
                text: "Tous les pères"
            };
            $scope.peres.splice(0, 0, tousPeres);
            $(".peres-select").select2({
                language: "fr",
                data: $scope.peres
            });

            $('.peres-select').on('change', function(e) {
                var datas = $('.peres-select').select2('data');
                var data = datas[0];
                if (data.id === -1) {
                    $scope.criteriaPere = null;
                } else {
                    $scope.criteriaPere = data.id;
                };
            });

            $(".peres-select").val(-1).trigger('change');


        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des pères.");
        });
    };

    // Lister les portées
    $scope.listPortees = function(portees) {
        $scope.searchResultsTitle = "Résultats de la recherche (" + portees.length + ")";
        $scope.portees = portees;
        $scope.initTablePortees($scope.portees);
    };

    // Click sur le bouton 'Ajouter une portée'
    $scope.onClickAdd = function() {

    };

    // Click sur le bouton effacer les critères de recherche
    $scope.onClickClearSearch = function() {
        // effacer les critères
        $('.peres-select').val('-1').trigger('change');
        $('.meres-select').val('-1').trigger('change');
        $scope.criteriaNaissanceDu = null;
        $scope.criteriaNaissanceAu = null;
    };

    // Click sur le bouton 'Supprimer la portée'
    $scope.onClickDelete = function(portee) {

    };

    // Click sur le bouton 'Modifier la portée'
    $scope.onClickEdit = function(portee) {

    };

    // Click sur le bouton rechercher des critères de recherche
    $scope.onClickStartSearch = function() {

        // formattage des critères
        if (!$scope.criteriaNaissanceDu || $scope.criteriaNaissanceDu.length < 1) {
            $scope.criteriaNaissanceDuAMJ = null;
        } else {
            $scope.criteriaNaissanceDuAMJ = $scope.toAMJ($scope.criteriaNaissanceDu);
        };

        if (!$scope.criteriaNaissanceAu || $scope.criteriaNaissanceAu.length < 1) {
            $scope.criteriaNaissanceAuAMJ = null;
        } else {
            $scope.criteriaNaissanceAuAMJ = $scope.toAMJ($scope.criteriaNaissanceAu);
        };

        // recherche en base de données
        porteeFactory.getByCriteria(
            $scope.criteriaPere,
            $scope.criteriaMere,
            $scope.criteriaNaissanceDuAMJ,
            $scope.criteriaNaissanceAuAMJ
        )

        .success(function(portees) {
                $scope.listPortees(portees);
                $scope.scroll2Top('searchResultsDiv');
            })
            .error(function(error) {
                console.log("Erreur de la recherche des portées");
            });


    };

    // Click sur le bouton 'Visualiser la fiche de la portée'
    $scope.onClickView = function(portee) {
        $scope.action = $scope.actionView;
        $scope.title = $scope.titleView +
            portee.numero +
            ' : ' +
            portee.pere.nom + ' et ' +
            portee.mere.nom + ' (' +
            $scope.toJMA(portee.date_naissance) + ')';
        $('#modalVAUD').modal();
    };


    // Se positionner dans l'écran
    $scope.scroll2Top = function(id) {
        var div = $('#' + id);
        $('html,body').animate({
            scrollTop: div.offset().top - 10
        }, 'fast');
    };

    // Transformer une date DD/MM/YYYY en YYYY-MM-DD
    $scope.toAMJ = function(dateJMA) {
        if (dateJMA) {
            return moment(dateJMA, 'DD/MM/YYYY').format('YYYY-MM-DD');
        }
        return null;
    };

    // Transformer une date YYYY-MM-DD en DD/MM/YYYY
    $scope.toJMA = function(dateAMJ) {
        if (dateAMJ) {
            return moment(dateAMJ, 'YYYY-MM-DD').format('DD/MM/YYYY');
        }
        return null;
    };


    //--------------------------------------------------------------------------
    // MAIN
    //--------------------------------------------------------------------------
    $(".tabs").tabs();
    $scope.listPeres();
    $scope.listMeres();

    //--------------------------------------------------------------------------



}]);