angular.module('elevageApp').controller('chienController', ['$scope', '$route', '$http', 'chienFactory', 'raceFactory', 'NgTableParams', '$sce', function($scope, $route, $http, chienFactory, raceFactory, NgTableParams, $sce) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    //--------------------------------------------------------------------------
    // Variables
    //--------------------------------------------------------------------------
    $scope.chiens = null;
    $scope.currentChien = null;
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

        chienFactory.getBySearchStandard(
            $scope.criteriaNom,
            $scope.criteriaPrenom,
            $scope.criteriaTel,
            $scope.criteriaMail,
            $scope.criteriaCodePostal,
            $scope.criteriaLocalite,
            $scope.criteriaPays
        )

        .success(function(chiens) {
                $scope.listChiens(chiens);
            })
            .error(function(error) {
                console.log("Erreur de la recherche standard de chiens");
            });

        $scope.scroll2Top('searchResultsDiv');
    };

    // Click sur le bouton rechercher des critères de recherche par chien
    $scope.onClickStartSearchByDog = function() {
        $('#proprietaireFormGroup').removeClass('has-error');
        $('#proprietaireHelpBlock').addClass('hide');
        if (!$scope.criteriaProprietaire) {
            $('#proprietaireFormGroup').addClass('has-error');
            $('#proprietaireHelpBlock').removeClass('hide');
            return;
        };
        $scope.typeRecherche = "ByDog";
        // on cache la box des critères
        // $(".box-search-criterias [data-widget='collapse']").click();

        chienFactory.getBySearchByDog(
            $scope.criteriaProprietaire
        )

        .success(function(chiens) {
                $scope.listChiens(chiens);
            })
            .error(function(error) {
                console.log("Erreur de la recherche par chien de chiens");
            });

        $scope.scroll2Top('searchResultsDiv');
    };

    // Se positionner dans l'écran
    $scope.scroll2Top = function(id) {
        // Scroll to TitreChien
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
        $scope.saveChien();

    };

    // Click sur le bouton permettant de voir toutes les données du chien
    $scope.onClickView = function(chien) {
        $scope.currentChien = chien;
        $('#modalView').modal();
    };

    // Click sur le bouton permettant de voir les chiens du chien
    $scope.onClickViewDogs = function(chien) {
        $scope.currentChien = chien;
        $('#modalViewDogs').modal();
    };

    // Click sur le bouton d'ajout d'un chien
    $scope.onClickAdd = function() {
        $scope.titleAddUpdate = 'Ajout d\'un nouveau chien';
        $('#nomFormGroup').removeClass('has-error');
        $('#nomHelpBlock').addClass('hide');
        $scope.currentChien = {
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
    $scope.onClickEdit = function(chien) {
        $scope.titleAddUpdate = 'Mise à jour d\'un chien';
        $scope.currentChien = chien;
        $('#nomFormGroup').removeClass('has-error');
        $('#nomHelpBlock').addClass('hide');
        $('#modalAddUpdate').modal();
    };

    // Click sur le bouton suppression d'un élément du tableau
    $scope.onClickDelete = function(chien) {
        $scope.deleteChien(chien.id);
    };

    // Fonction permettant de déterminer si un chien peut être supprimé (vrai s'il n'a pas de chiens)
    $scope.isDeletable = function(chien) {
        return chien.chiens.length === 0 ? true : false;
    };
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    // Accès vers la couche REST (lien avec les factories Angular)
    //--------------------------------------------------------------------------

    // Lister les races
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

    // Lister les chiens
    $scope.listChiens = function(chiens) {
        $scope.setListLoading(true);
        $scope.searchResultsTitle = "Résultats de la recherche (" + chiens.length + ")";
        $scope.chiens = chiens;
        $scope.initTableChiens($scope.chiens);
        $scope.setListLoading(false);

    };
    // ->Chiens : Appel REST vers Factory : créer ou mettre à jour un chien
    $scope.saveChien = function() {
        if ($scope.isFillingValid()) {
            if ($scope.currentChien.id === null) {
                chienFactory.insert($scope.currentChien).success(function() {
                    $scope.afterCUD();
                }).error(function(err) {
                    showMessageInfo("Erreur", "La création n'a pas fonctionné correctement.");
                });
            } else {
                chienFactory.update($scope.currentChien).success(function() {
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
    // ->Chiens : Appel REST vers Factory : supprimer un chien
    $scope.deleteChien = function(id) {
        chienFactory.delete(id).success(function() {
            $scope.afterCUD();
        }).error(function(err) {
            showMessageInfo("Erreur", "La suppression n'a pas fonctionné correctement.");
        });
    };
    //
    $scope.afterCUD = function() {
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
        if (!$scope.currentChien.nom) {
            return false;
        }
        return true;
    };
    // initialisation de la table des chiens
    $scope.initTableChiens = function(chiens) {
        $scope.tableParams = new NgTableParams({
            // PARAMETRES
            sorting: {
                nom: "asc"
            }, // initialiser le tri sur le numero ascendant
            count: 15 // nbre d elements affiches par defaut
        }, {
            // DONNEES
            counts: [5, 10, 15, 20, 50], // choix d'affichage du nombre d elements par page. tableau vide = absence de choix d elements par page
            dataset: chiens // fournir la liste de donnees
        });
    };
    $scope.setFormLoading = function(loading) {
        setLoading('.form-chien', loading);
    };

    $scope.setListLoading = function(loading) {
        setLoading('.box-search-results', loading);
    };

    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    // MAIN
    //--------------------------------------------------------------------------
    $("#tabs").tabs();
    $('input').iCheck({
        checkboxClass: 'icheckbox_flat-blue',
        radioClass: 'iradio_flat-blue'
    });
    $('#criteriaNom').keyup(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $scope.onClickStartSearchStandard();
        }
    });
    emptySelect2(".races-select");
    $scope.listRaces();

    //--------------------------------------------------------------------------



}]);