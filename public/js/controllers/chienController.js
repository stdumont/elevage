angular.module('elevageApp').controller('chienController', ['$scope', '$route', '$http', 'chienFactory', 'raceFactory', 'robeFactory', 'clientFactory', 'NgTableParams', '$sce', function($scope, $route, $http, chienFactory, raceFactory, robeFactory, clientFactory, NgTableParams, $sce) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    //--------------------------------------------------------------------------
    // Variables
    //--------------------------------------------------------------------------
    $scope.chiens = null;
    $scope.currentChien = null;
    $scope.searchResultsTitle = "Résultats de la recherche";
    $scope.criteriaNom = null;
    $scope.criteriaAffixe = null;
    $scope.criteriaRace = null;
    $scope.criteriaRobe = null;
    $scope.criteriaSexe = null;
    $scope.criteriaPresent = null;
    $scope.criteriaProduit = null;
    $scope.criteriaVivant = null;
    $scope.criteriaNaissanceDu = null;
    $scope.criteriaNaissanceAu = null;
    $scope.criteriaDecesDu = null;
    $scope.criteriaDecesAu = null;
    $scope.criteriaPasseport = null;
    $scope.criteriaPuce = null;
    $scope.criteriaTatouage = null;
    $scope.criteriaNomClient = null;
    $scope.action = null;
    $scope.actionView = 'View';
    $scope.actionAdd = 'Add';
    $scope.actionUpdate = 'Update';
    $scope.title = null;
    $scope.titleView = 'Visualiser un chien';
    $scope.titleAdd = 'Ajouter un chien';
    $scope.titleUpdate = 'Modifier un chien';

    // colonnes des résultats de la recherche
    $scope.columns = [{
            title: 'No',
            field: 'id',
            visible: true,
            class: ''
        },
        {
            title: 'Présent-Produit',
            field: '',
            visible: true,
            class: ''
        },
        {
            title: 'Nom',
            field: '',
            visible: true,
            class: ''
        },
        {
            title: 'Sexe',
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
            title: 'Robe',
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
            title: 'Décès',
            field: '',
            visible: true,
            class: ''
        },
        {
            title: 'Client',
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
        }
    ];

    //--------------------------------------------------------------------------



    //--------------------------------------------------------------------------
    // Evènements de la couche UI
    //--------------------------------------------------------------------------

    // Click sur le bouton effacer les critères de recherche
    $scope.onClickClearSearch = function() {
        // effacer les critères
        $scope.criteriaNom = null;
        $scope.criteriaAffixe = null;
        $('.races-select').val('-1').trigger('change');
        $('.robes-select').val('-1').trigger('change');
        $('.box-search-criterias input[type=checkbox]').iCheck('check');
        $scope.criteriaNaissanceDu = null;
        $scope.criteriaNaissanceAu = null;
        $scope.criteriaDecesDu = null;
        $scope.criteriaDecesAu = null;
        $scope.criteriaPasseport = null;
        $scope.criteriaPuce = null;
        $scope.criteriaTatouage = null;
        $scope.criteriaNomClient = null;
    };

    // Click sur le bouton rechercher des critères de recherche
    $scope.onClickStartSearch = function() {
        // on cache la box des critères
        // $(".box-search-criterias [data-widget='collapse']").click();

        // Formattage des critères
        var sexeM = $('#sexeM').iCheck('update')[0].checked;
        var sexeF = $('#sexeF').iCheck('update')[0].checked;
        if ((sexeM && sexeF) || (!sexeM && !sexeF)) {
            $scope.criteriaSexe = null;
        } else {
            if (sexeM) {
                $scope.criteriaSexe = 'M';
            };
            if (sexeF) {
                $scope.criteriaSexe = 'F';
            };
        };

        var presentY = $('#presentY').iCheck('update')[0].checked;
        var presentN = $('#presentN').iCheck('update')[0].checked;
        if ((presentY && presentN) || (!presentY && !presentN)) {
            $scope.criteriaPresent = null;
        } else {
            if (presentY) {
                $scope.criteriaPresent = '1';
            };
            if (presentN) {
                $scope.criteriaPresent = '0';
            };
        };

        var produitY = $('#produitY').iCheck('update')[0].checked;
        var produitN = $('#produitN').iCheck('update')[0].checked;
        if ((produitY && produitN) || (!produitY && !produitN)) {
            $scope.criteriaProduit = null;
        } else {
            if (produitY) {
                $scope.criteriaProduit = '1';
            };
            if (produitN) {
                $scope.criteriaProduit = '0';
            };
        };

        var vivantY = $('#vivantY').iCheck('update')[0].checked;
        var vivantN = $('#vivantN').iCheck('update')[0].checked;
        if ((vivantY && vivantN) || (!vivantY && !vivantN)) {
            $scope.criteriaVivant = null;
        } else {
            if (vivantY) {
                $scope.criteriaVivant = '1';
            };
            if (vivantN) {
                $scope.criteriaVivant = '0';
            };
        };

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

        if (!$scope.criteriaDecesDu || $scope.criteriaDecesDu.length < 1) {
            $scope.criteriaDecesDuAMJ = null;
        } else {
            $scope.criteriaDecesDuAMJ = $scope.toAMJ($scope.criteriaDecesDu);
        };

        if (!$scope.criteriaDecesAu || $scope.criteriaDecesAu.length < 1) {
            $scope.criteriaDecesAuAMJ = null;
        } else {
            $scope.criteriaDecesAuAMJ = $scope.toAMJ($scope.criteriaDecesAu);
        };

        $scope.setListLoading(true);

        chienFactory.getByCriteria(
            $scope.criteriaNom,
            $scope.criteriaAffixe,
            $scope.criteriaRace,
            $scope.criteriaRobe,
            $scope.criteriaSexe,
            $scope.criteriaPresent,
            $scope.criteriaProduit,
            $scope.criteriaVivant,
            $scope.criteriaNaissanceDuAMJ,
            $scope.criteriaNaissanceAuAMJ,
            $scope.criteriaDecesDuAMJ,
            $scope.criteriaDecesAuAMJ,
            $scope.criteriaPasseport,
            $scope.criteriaPuce,
            $scope.criteriaTatouage,
            $scope.criteriaNomClient
        )

        .success(function(chiens) {
                $scope.listChiens(chiens);
                $scope.setListLoading(false);
            })
            .error(function(error) {
                console.log("Erreur de la recherche de chiens");
                $scope.setListLoading(false);
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
        return null;
    };

    // Transformer une date DD/MM/YYYY en YYYY-MM-DD
    $scope.toAMJ = function(dateJMA) {
        if (dateJMA) {
            return moment(dateJMA, 'DD/MM/YYYY').format('YYYY-MM-DD');
        }
        return null;
    };

    // Calculer l'âge aujourd'hui
    $scope.ageToday = function() {
        if ($scope.currentChien && $scope.currentChien.date_naissance) {
            var a = moment();
            var b = moment($scope.currentChien.date_naissance, 'DD/MM/YYYY');
            var years = a.diff(b, 'year');
            b.add(years, 'years');
            var months = a.diff(b, 'months');
            b.add(months, 'months');
            var days = a.diff(b, 'days');
            var result = (years > 0 ? years + ' an(s) ' : '') + (months > 0 ? months + ' mois ' : '') + (days > 0 ? days + ' jour(s) ' : '');
            return result;
        } else {
            return '';
        };
    };

    // Calculer l'âge au décès
    $scope.ageDeath = function() {
        if ($scope.currentChien && $scope.currentChien.date_naissance && $scope.currentChien.date_deces) {
            var a = moment($scope.currentChien.date_deces, 'DD/MM/YYYY');
            var b = moment($scope.currentChien.date_naissance, 'DD/MM/YYYY');
            var years = a.diff(b, 'year');
            b.add(years, 'years');
            var months = a.diff(b, 'months');
            b.add(months, 'months');
            var days = a.diff(b, 'days');
            var result = (years > 0 ? years + ' an(s) ' : '') + (months > 0 ? months + ' mois ' : '') + (days > 0 ? days + ' jour(s) ' : '');
            return result;
        } else {
            return '';
        };
    };
    // [buttonSave:onClick] : clic ou validation du bouton sauvegarder
    $scope.onClickSave = function() {
        $scope.saveChien();

    };

    // Click sur le bouton permettant de voir les données du chien
    $scope.onClickView = function(chien) {
        $scope.currentChien = jQuery.extend(true, [], chien);
        $scope.action = $scope.actionView;
        $scope.title = $scope.titleView;
        $scope.syncUI();
        $('#modalVAU').modal();
    };

    // Click sur le bouton d'ajout d'un chien
    $scope.onClickAdd = function() {
        $scope.action = $scope.actionAdd;
        $scope.title = $scope.titleAdd;
        $('#nomFormGroup').removeClass('has-error');
        $('#nomHelpBlock').addClass('hide');
        $('#inputSexeM').iCheck('uncheck');
        $('#inputSexeF').iCheck('uncheck');
        $('#inputPresentY').iCheck('uncheck');
        $('#inputPresentN').iCheck('uncheck');
        $('#inputProduitY').iCheck('uncheck');
        $('#inputProduitN').iCheck('uncheck');
        $('#inputVivantY').iCheck('uncheck');
        $('#inputVivantN').iCheck('uncheck');
        $scope.currentChien = {
            id: null,
            nom: null,
            affixe: null,
            race_id: null,
            robe_id: null,
            date_naissance: null,
            date_deces: null,
            pere_id: null,
            mere_id: null,
            puce: null,
            passeport: null,
            tatouage: null,
            client_id: null,
            portee_id: null,
            chiot_id: null,
            present: null,
            produit: null,
            remarques: null,
        };
        $('.robes-select-VAU').select2('val', -1);
        $('#modalVAU').modal();
    };

    // Click sur le bouton d'édition d'un élément du tableau
    $scope.onClickEdit = function(chien) {
        $scope.action = $scope.actionUpdate;
        $scope.title = $scope.titleUpdate;
        $scope.currentChien = jQuery.extend(true, [], chien);
        $scope.syncUI();
        $('#nomFormGroup').removeClass('has-error');
        $('#nomHelpBlock').addClass('hide');
        $('#modalVAU').modal();
    };

    // Synchroniser les widgets de l'UI avec la valeur des datas de cuurentChien
    $scope.syncUI = function() {
        $('#inputSexeM').iCheck('uncheck');
        $('#inputSexeF').iCheck('uncheck');
        $('#inputPresentY').iCheck('uncheck');
        $('#inputPresentN').iCheck('uncheck');
        $('#inputProduitY').iCheck('uncheck');
        $('#inputProduitN').iCheck('uncheck');
        $('#inputVivantY').iCheck('uncheck');
        $('#inputVivantN').iCheck('uncheck');
        if ($scope.currentChien.sexe == 'M') {
            $('#inputSexeM').iCheck('check');
        };
        if ($scope.currentChien.sexe == 'F') {
            $('#inputSexeF').iCheck('check');
        };
        if ($scope.currentChien.present == '1') {
            $('#inputPresentY').iCheck('check');
        };
        if ($scope.currentChien.present == '0') {
            $('#inputPresentN').iCheck('check');
        };
        if ($scope.currentChien.produit == '1') {
            $('#inputProduitY').iCheck('check');
        };
        if ($scope.currentChien.produit == '0') {
            $('#inputProduitN').iCheck('check');
        };
        if (!$scope.currentChien.date_deces) {
            $('#inputVivantY').iCheck('check');
        };
        if ($scope.currentChien.date_deces) {
            $('#inputVivantN').iCheck('check');
        };
        $('.races-select-VAU').select2('val', $scope.currentChien.race.id);
        if ($scope.currentChien.robe.id) {
            $('.robes-select-VAU').select2('val', $scope.currentChien.robe.id);
        } else {
            $('.robes-select-VAU').select2('val', -1);
        };
        $scope.currentChien.date_naissance = $scope.toJMA($scope.currentChien.date_naissance);
        $scope.currentChien.date_deces = $scope.toJMA($scope.currentChien.date_deces);

    };
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    // Accès vers la couche REST (lien avec les factories Angular)
    //--------------------------------------------------------------------------

    // Lister les races
    $scope.listRaces = function() {
        emptySelect2(".races-select");
        raceFactory.list().success(function(races) {
            $scope.races = races;
            var toutesRaces = {
                id: -1,
                nom: "Toutes les races"
            };
            $scope.races.splice(0, 0, toutesRaces);
            var selectRacesCallBack = function(id) {
                if (id === -1) {
                    $scope.criteriaRace = null;
                } else {
                    $scope.criteriaRace = id;
                };
            };

            // creer les objets UI et initialiser le select2
            var raceToSelect2 = function(race) {
                return {
                    id: race.id,
                    text: race.nom
                };
            };

            setSelect2(".races-select", $scope.races, toutesRaces, raceToSelect2, $scope.select2Template, selectRacesCallBack);

        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des races.");
        });
    };

    // Lister les robes
    $scope.listRobes = function() {
        emptySelect2(".robes-select");
        robeFactory.list().success(function(robes) {
            $scope.robes = robes;
            var toutesRobes = {
                id: -1,
                nom: "Toutes les robes"
            };
            $scope.robes.splice(0, 0, toutesRobes);
            var selectRobesCallBack = function(id) {
                if (id === -1) {
                    $scope.criteriaRobe = null;
                } else {
                    $scope.criteriaRobe = id;
                };
            };

            // creer les objets UI et initialiser le select2
            var robeToSelect2 = function(robe) {
                return {
                    id: robe.id,
                    text: robe.nom
                };
            };

            setSelect2(".robes-select", $scope.robes, toutesRobes, robeToSelect2, $scope.select2Template, selectRobesCallBack);

        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des robes.");
        });
    };
    // Lister les races (VAU)
    $scope.listRacesVAU = function() {
        emptySelect2(".races-select-VAU");
        raceFactory.list().success(function(races) {
            $scope.racesVAU = races;
            var selectRacesVAUCallBack = function(id) {
                $scope.currentChien.race_id = id;
            };

            // creer les objets UI et initialiser le select2
            var raceVAUToSelect2 = function(race) {
                return {
                    id: race.id,
                    text: race.nom
                };
            };

            setSelect2(".races-select-VAU", $scope.racesVAU, null, raceVAUToSelect2, $scope.select2Template, selectRacesVAUCallBack);


        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des races (VAU).");
        });
    };

    // Lister les robes
    $scope.listRobesVAU = function() {
        emptySelect2(".robes-select-VAU");
        robeFactory.list().success(function(robes) {
            $scope.robesVAU = robes;
            var robeInconnue = {
                id: -1,
                nom: "Robe inconnue"
            };
            $scope.robesVAU.splice(0, 0, robeInconnue);
            var selectRobesVAUCallBack = function(id) {
                if ($scope.currentChien) {
                    if (id == -1) {
                        $scope.currentChien.robe_id = null;
                    } else {
                        $scope.currentChien.robe_id = id;
                    };
                };
            };

            // creer les objets UI et initialiser le select2
            var robeVAUToSelect2 = function(robe) {
                return {
                    id: robe.id,
                    text: robe.nom
                };
            };

            setSelect2(".robes-select-VAU", $scope.robesVAU, robeInconnue, robeVAUToSelect2, $scope.select2Template, selectRobesVAUCallBack);


        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des robes (VAU).");
        });
    };

    // Lister les chiens
    $scope.listChiens = function(chiens) {
        $scope.searchResultsTitle = "Résultats de la recherche (" + chiens.length + ")";
        $scope.chiens = chiens;
        for (chien of $scope.chiens) {
            if (chien.client_id) {
                clientFactory.find(chien.client_id)
                    .success(function(client) {
                        chien['client'] = client;
                    })
                    .error(function(error) {
                        console.log("Erreur de la recherche du client");
                        chien['client'] = {
                            nom: '',
                            prenom: ''
                        };
                    });
            } else {
                chien['client'] = {
                    nom: '',
                    prenom: ''
                };
            };
        }
        $scope.initTableChiens($scope.chiens);


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
    $(".tabs").tabs();
    $('input[type=checkbox]').iCheck({
        checkboxClass: 'icheckbox_flat-blue'
    });
    $('input[type=checkbox]').iCheck('check');
    $('#criteriaNom').keyup(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $scope.onClickStartSearchStandard();
        }
    });

    $scope.listRaces();
    $scope.listRobes();
    $scope.listRacesVAU();
    $scope.listRobesVAU();
    //--------------------------------------------------------------------------



}]);