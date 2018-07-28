angular.module('elevageApp').controller('chienController', ['$scope', '$route', '$http', '$timeout', 'chienFactory', 'raceFactory', 'robeFactory', 'clientFactory', 'NgTableParams', '$sce', function($scope, $route, $http, $timeout, chienFactory, raceFactory, robeFactory, clientFactory, NgTableParams, $sce) {

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
    $scope.criteriaReproducteur = null;
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

        var reproducteurY = $('#reproducteurY').iCheck('update')[0].checked;
        var reproducteurN = $('#reproducteurN').iCheck('update')[0].checked;
        if ((reproducteurY && reproducteurN) || (!reproducteurY && !reproducteurN)) {
            $scope.criteriaReproducteur = null;
        } else {
            if (reproducteurY) {
                $scope.criteriaReproducteur = '1';
            };
            if (reproducteurN) {
                $scope.criteriaReproducteur = '0';
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
            $scope.criteriaReproducteur,
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
        $scope.title = $scope.titleView + ' : ' + $scope.currentChien.nom + ' ' + ($scope.currentChien.affixe ? $scope.currentChien.affixe : '');
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
        $('#inputReproducteurY').iCheck('uncheck');
        $('#inputReproducteurN').iCheck('uncheck');
        $('#inputPresentY').iCheck('uncheck');
        $('#inputPresentN').iCheck('uncheck');
        $('#inputProduitY').iCheck('uncheck');
        $('#inputProduitN').iCheck('uncheck');
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
            pedigree: null,
            tatouage: null,
            client_id: null,
            portee_id: null,
            chiot_id: null,
            present: null,
            reproducteur: null,
            produit: null,
            remarques: null,
        };
        $('.robes-select-VAU').select2('val', -1);
        $('.peres-select-VAU').select2('val', -1);
        $('.meres-select-VAU').select2('val', -1);
        $('.clients-select-VAU').select2('val', -1);
        $('.tabs').tabs({ active: 0 });
        $('#modalVAU').modal();
    };

    // Click sur le bouton d'édition d'un élément du tableau
    $scope.onClickEdit = function(chien) {
        $scope.action = $scope.actionUpdate;
        $scope.currentChien = jQuery.extend(true, [], chien);
        $scope.title = $scope.titleUpdate + ' : ' + $scope.currentChien.nom + ' ' + ($scope.currentChien.affixe ? $scope.currentChien.affixe : '');;
        $scope.syncUI();
        $('#nomFormGroup').removeClass('has-error');
        $('#nomHelpBlock').addClass('hide');
        $('#modalVAU').modal();
    };

    // Synchroniser les widgets de l'UI avec la valeur des datas de cuurentChien
    $scope.syncUI = function() {
        $('#inputSexeM').iCheck('uncheck');
        $('#inputSexeF').iCheck('uncheck');
        $('#inputReproducteurY').iCheck('uncheck');
        $('#inputReproducteurN').iCheck('uncheck');
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
        if ($scope.currentChien.reproducteur == '1') {
            $('#inputReproducteurY').iCheck('check');
        };
        if ($scope.currentChien.reproducteur == '0') {
            $('#inputReproducteurN').iCheck('check');
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
        $('.races-select-VAU').select2('val', $scope.currentChien.race_id);
        if ($scope.currentChien.robe_id) {
            $('.robes-select-VAU').select2('val', $scope.currentChien.robe_id);
        } else {
            $('.robes-select-VAU').select2('val', -1);
        };
        $scope.currentChien.date_naissance = $scope.toJMA($scope.currentChien.date_naissance);
        $scope.currentChien.date_deces = $scope.toJMA($scope.currentChien.date_deces);


        if ($scope.currentChien.pere_id) {
            console.log($scope.currentChien.pere_id);
            $('.peres-select-VAU').select2('val', $scope.currentChien.pere_id);
        } else {
            $('.peres-select-VAU').select2('val', -1);
        };
        if ($scope.currentChien.mere_id) {
            $('.meres-select-VAU').select2('val', $scope.currentChien.mere_id);
        } else {
            $('.meres-select-VAU').select2('val', -1);
        };
        if ($scope.currentChien.client_id) {
            $('.clients-select-VAU').select2('val', $scope.currentChien.client_id);
        } else {
            $('.clients-select-VAU').select2('val', -1);
        };

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
                nom: "Inconnue"
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

    // Lister les pères
    $scope.listPeresVAU = function() {
        emptySelect2(".peres-select-VAU");
        var exceptId = null;
        if ($scope.currentChien && $scope.currentChien.id) {
            exceptId = $scope.currentChien.id;
        };
        chienFactory.getPeres(exceptId).success(function(peres) {
            $scope.peresVAU = peres;
            var pereInconnu = {
                id: -1,
                nom: "Inconnu"
            };
            $scope.peresVAU.splice(0, 0, pereInconnu);
            var selectPeresVAUCallBack = function(id) {
                if ($scope.currentChien) {
                    if (id == -1) {
                        $scope.currentChien.pere_id = null;
                        $scope.pereInfos = '';
                        $timeout(function() {
                            $scope.$apply();
                        });
                    } else {
                        $scope.currentChien.pere_id = id;
                        $.each($scope.peresVAU, function(key, pere) {
                            if (id == pere.id) {
                                $scope.pereInfos = (pere.race.nom ? pere.race.nom : '') + '\n';
                                $scope.pereInfos += (pere.robe.nom ? pere.robe.nom : '') + '\n';
                                $scope.pereInfos += (pere.date_naissance ? $scope.toJMA(pere.date_naissance) : '');
                                $scope.pereInfos += (pere.date_deces ? ' - ' + $scope.toJMA(pere.date_deces) : '');
                                $scope.$apply();
                            };
                        });
                    };
                };
            };

            // creer les objets UI et initialiser le select2
            var pereVAUToSelect2 = function(pere) {
                return {
                    id: pere.id,
                    text: pere.nom + ' ' + (pere.affixe ? pere.affixe : '')
                };
            };

            setSelect2(".peres-select-VAU", $scope.peresVAU, pereInconnu, pereVAUToSelect2, $scope.select2Template, selectPeresVAUCallBack);


        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des pères (VAU).");
        });
    };

    // Lister les mères
    $scope.listMeresVAU = function() {
        emptySelect2(".meres-select-VAU");
        var exceptId = null;
        if ($scope.currentChien && $scope.currentChien.id) {
            exceptId = $scope.currentChien.id;
        };
        chienFactory.getMeres(exceptId).success(function(meres) {
            $scope.meresVAU = meres;
            var mereInconnue = {
                id: -1,
                nom: "Inconnue"
            };
            $scope.meresVAU.splice(0, 0, mereInconnue);
            var selectMeresVAUCallBack = function(id) {
                if ($scope.currentChien) {
                    if (id == -1) {
                        $scope.currentChien.mere_id = null;
                        $scope.mereInfos = '';
                        $timeout(function() {
                            $scope.$apply();
                        });

                    } else {
                        $scope.currentChien.mere_id = id;
                        $.each($scope.meresVAU, function(key, mere) {
                            if (id == mere.id) {
                                $scope.mereInfos = (mere.race.nom ? mere.race.nom : '') + '\n';
                                $scope.mereInfos += (mere.robe.nom ? mere.robe.nom : '') + '\n';
                                $scope.mereInfos += (mere.date_naissance ? $scope.toJMA(mere.date_naissance) : '');
                                $scope.mereInfos += (mere.date_deces ? ' - ' + $scope.toJMA(mere.date_deces) : '');
                                $scope.$apply();
                            };
                        });

                    };
                };
            };

            // creer les objets UI et initialiser le select2
            var mereVAUToSelect2 = function(mere) {
                return {
                    id: mere.id,
                    text: mere.nom + ' ' + (mere.affixe ? mere.affixe : '')
                };
            };

            setSelect2(".meres-select-VAU", $scope.meresVAU, mereInconnue, mereVAUToSelect2, $scope.select2Template, selectMeresVAUCallBack);


        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des mères (VAU).");
        });
    };

    // Lister les clients
    $scope.listClientsVAU = function() {
        emptySelect2(".clients-select-VAU");
        clientFactory.list().success(function(clients) {
            $scope.clientsVAU = clients;
            var clientInconnu = {
                id: -1,
                nom: "Inconnu",
                rue: '',
                numero: '',
                code_postal: '',
                localite: '',
            };
            $scope.clientsVAU.splice(0, 0, clientInconnu);
            var selectClientsVAUCallBack = function(id) {
                if ($scope.currentChien) {
                    if (id == -1) {
                        $scope.currentChien.client_id = null;
                        $scope.clientInfos = '';
                        $timeout(function() {
                            $scope.$apply();
                        });
                    } else {
                        $scope.currentChien.client_id = id;
                        $.each($scope.clientsVAU, function(key, client) {
                            if (id == client.id) {
                                $scope.clientInfos = (client.rue ? client.rue : '');
                                $scope.clientInfos += (client.numero ? ', ' + client.numero : '') + '\n';
                                $scope.clientInfos += (client.code_postal ? client.code_postal : '');
                                $scope.clientInfos += (client.localite ? ' ' + client.localite : '') + '\n';
                                $scope.clientInfos += (client.pays ? client.pays : '') + '\n';
                                $scope.clientInfos += (client.email ? client.email : '') + '\n';
                                $scope.clientInfos += (client.tel1 ? client.tel1 : '') + '';
                                $scope.clientInfos += (client.tel2 ? ' ' + client.tel2 : '');
                                $scope.$apply();
                            };
                        });
                    };
                };
            };

            // creer les objets UI et initialiser le select2
            var clientVAUToSelect2 = function(client) {
                return {
                    id: client.id,
                    text: client.nom + ' ' + (client.prenom ? client.prenom : '')
                };
            };

            setSelect2(".clients-select-VAU", $scope.clientsVAU, clientInconnu, clientVAUToSelect2, $scope.select2Template, selectClientsVAUCallBack);


        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des pères (VAU).");
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
    // Contrôles du formulaire
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
    $('input').iCheck({
        checkboxClass: 'icheckbox_flat-blue',
        radioClass: 'iradio_flat-blue',
    });
    $('input').iCheck('check');
    $('#criteriaNom').keyup(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $scope.onClickStartSearch();
        }
    });

    $scope.listRaces();
    $scope.listRobes();
    $scope.listRacesVAU();
    $scope.listRobesVAU();
    $scope.listPeresVAU();
    $scope.listMeresVAU();
    $scope.listClientsVAU();
    //--------------------------------------------------------------------------



}]);