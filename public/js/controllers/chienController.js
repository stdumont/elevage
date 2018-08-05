angular.module('elevageApp').controller('chienController', ['$scope', '$window', 'FileUploader', '$route', '$http', '$timeout', 'chienFactory', 'raceFactory', 'robeFactory', 'clientFactory', 'documentFactory', 'typeDocumentFactory', 'NgTableParams', '$sce', function(
    $scope, $window, FileUploader, $route, $http, $timeout, chienFactory, raceFactory, robeFactory, clientFactory, documentFactory, typeDocumentFactory, NgTableParams, $sce) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    //--------------------------------------------------------------------------
    // Variables
    //--------------------------------------------------------------------------
    $scope.chiens = null;
    $scope.currentChien = null;
    $scope.currentDocument = null;
    $scope.currentFichier = null;
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
    $scope.pereInfos = '';
    $scope.mereInfos = '';
    $scope.clientInfos = '';

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

    // colonnes de la table des enfants
    $scope.columnsEnfants = [{
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
        }
    ];

    // colonnes de la table des documents
    $scope.columnsDocuments = [{
            title: 'Type',
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
            title: 'Description',
            field: '',
            visible: true,
            class: ''
        },
        {
            title: 'Date',
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
            title: 'Supprimer',
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
        $scope.pereInfos = '';
        $scope.mereInfos = '';
        $scope.clientInfos = '';
        $scope.listPeresVAU();
        $scope.listMeresVAU();
        $('.robes-select-VAU').val(-1).trigger('change');
        $('.clients-select-VAU').val(-1).trigger('change');
        $('.tabs').tabs({
            active: 0
        });
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

    // Click sur le bouton permettant de voir un document (ouvre un nouvel onglet)
    $scope.onClickViewDocument = function(document) {
        $window.open('/api/document/get-fichier/' + document.id, '_blank');
    };

    // Click sur le bouton de suppression d'un document (efface aussi le fichier binaire attaché)
    $scope.onClickDeleteDocument = function(document) {
        documentFactory.delete(document.id)
            .success(function() {
                    $scope.listDocumentsVAU();
                }

            );
    };

    // Click sur le bouton ajout d'un document
    $scope.onClickAddDocument = function() {
        $('.documents-list').addClass('hidden');
        $('.btn-add-document').addClass('hidden');
        $('.modalVAU-footer').addClass('hidden');
        $('.div-file-input').removeClass('hidden');
        $(".typedocs-select-VAU").val(-1).trigger('change');
        $scope.currentDocument = {
            id: null,
            typedoc_id: null,
            chien_id: $scope.currentChien.id,
            nom: null,
            description: null,
            date_document: null
        };
        $scope.currentFichier = {
            id: null,
            document_id: null,
            nomFichier: null,
            contentType: null,
            taille: null,
            donnee: null
        };
    };

    // Click sur le bouton valider du formulaire d'ajout d'un document
    $scope.onAcceptAddDocument = function() {
        var fichier = document.getElementById('fichier').files[0];
        var lecture = new FileReader();
        lecture.onload = function(e) {
            var nomFichier = fichier.name;
            var contentType = fichier.type;
            var datedoc = moment(fichier.lastModifiedDate).format('YYYY-MM-DD');
            var donnee = lecture.result;
            console.log(donnee);
            var taille = fichier.size;
            $scope.currentDocument.nom = nomFichier;
            $scope.currentDocument.date_document = datedoc;
            $scope.currentFichier.nomFichier = nomFichier;
            $scope.currentFichier.contentType = contentType;
            $scope.currentFichier.taille = taille;
            $scope.currentFichier.donnee = donnee;
            documentFactory.insert($scope.currentDocument)
                .success(function(document) {
                    $scope.currentFichier.document_id = document.id;
                    documentFactory.insertFichier($scope.currentFichier);
                });
            $('.documents-list').removeClass('hidden');
            $('.btn-add-document').removeClass('hidden');
            $('.modalVAU-footer').removeClass('hidden');
            $('.div-file-input').addClass('hidden');
        }
        if (fichier) {
            lecture.readAsDataURL(fichier);
        } else {
            alert('Veuillez choisir un fichier');
        };
    };

    // Click sur le bouton annuler du formulaire d'ajout d'un document
    $scope.onCancelAddDocument = function() {
        $('.documents-list').removeClass('hidden');
        $('.btn-add-document').removeClass('hidden');
        $('.modalVAU-footer').removeClass('hidden');
        $('.div-file-input').addClass('hidden');

    };

    // Synchroniser les widgets de l'UI avec la valeur des datas de cuurentChien
    $scope.syncUI = function() {
        $scope.listEnfantsVAU();
        $scope.listDocumentsVAU();
        $scope.listPeresVAU();
        $scope.listMeresVAU();
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
        $(".races-select-VAU").val($scope.currentChien.race_id).trigger('change');
        if ($scope.currentChien.robe_id) {
            $(".robes-select-VAU").val($scope.currentChien.robe_id).trigger('change');
        } else {
            $(".robes-select-VAU").val(-1).trigger('change');
        };
        $scope.currentChien.date_naissance = $scope.toJMA($scope.currentChien.date_naissance);
        $scope.currentChien.date_deces = $scope.toJMA($scope.currentChien.date_deces);
        $scope.pereInfos = '';
        $scope.mereInfos = '';
        $scope.clientInfos = '';

        if ($scope.currentChien.client_id) {
            $(".clients-select-VAU").val($scope.currentChien.client_id).trigger('change');
        } else {
            $(".clients-select-VAU").val(-1).trigger('change');
        };

    };
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    // Accès vers la couche REST (lien avec les factories Angular)
    //--------------------------------------------------------------------------

    // Lister les races
    $scope.listRaces = function() {
        raceFactory.list().success(function(races) {
            $scope.races = races;
            var toutesRaces = {
                id: -1,
                text: "Toutes les races"
            };
            $scope.races.splice(0, 0, toutesRaces);
            $(".races-select").select2({
                language: "fr",
                data: $scope.races
            });

            $('.races-select').on('select2:select', function(e) {
                if (e.params.data.id === -1) {
                    $scope.criteriaRace = null;
                } else {
                    $scope.criteriaRace = e.params.data.id;
                };
            });

            $(".races-select").val(-1).trigger('change');


        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des races.");
        });
    };

    // Lister les robes
    $scope.listRobes = function() {
        robeFactory.list().success(function(robes) {
            $scope.robes = robes;
            var toutesRobes = {
                id: -1,
                text: "Toutes les robes"
            };
            $scope.robes.splice(0, 0, toutesRobes);
            $(".robes-select").select2({
                language: "fr",
                data: $scope.robes
            });

            $('.robes-select').on('select2:select', function(e) {
                if (e.params.data.id === -1) {
                    $scope.criteriaRobe = null;
                } else {
                    $scope.criteriaRobe = e.params.data.id;
                };
            });

            $(".robes-select").val(-1).trigger('change');


        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des robes.");
        });
    };
    // Lister les races (VAU)
    $scope.listRacesVAU = function() {
        raceFactory.list().success(function(races) {
            $scope.racesVAU = races;
            $(".races-select-VAU").select2({
                language: "fr",
                data: $scope.racesVAU
            });

        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des races (VAU).");
        });
    };

    // Lister les robes
    $scope.listRobesVAU = function() {
        robeFactory.list().success(function(robes) {
            $scope.robesVAU = robes;
            var robeInconnue = {
                id: -1,
                text: "Inconnue"
            };
            $scope.robesVAU.splice(0, 0, robeInconnue);
            $(".robes-select-VAU").select2({
                language: "fr",
                data: $scope.robesVAU
            });

            $('.robes-select-VAU').on('select2:select', function(e) {
                if ($scope.currentChien) {
                    if (e.params.data.id === -1) {
                        $scope.currentChien.robe_id = null;
                    } else {
                        $scope.currentChien.robe_id = e.params.data.id;
                    };
                };
            });

            $(".robes-select-VAU").val(-1).trigger('change');

        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des robes (VAU).");
        });
    };

    // Lister les enfants
    $scope.listEnfantsVAU = function() {
        if ($scope.currentChien && $scope.currentChien.id) {
            chienFactory.getEnfants($scope.currentChien.id)
                .success(function(enfants) {
                    $scope.listEnfants(enfants);
                })
                .error(function() {
                    showMessageInfo("Erreur", "Impossible de récupérer la liste des enfants (VAU).");
                });
        } else {
            $scope.listEnfants([]);
        };
    };

    // Lister les documents
    $scope.listDocumentsVAU = function() {
        if ($scope.currentChien && $scope.currentChien.id) {
            documentFactory.getByChien($scope.currentChien.id)
                .success(function(documents) {
                    $scope.listDocuments(documents);
                })
                .error(function() {
                    showMessageInfo("Erreur", "Impossible de récupérer la liste des documents (VAU).");
                });
        } else {
            $scope.listDocuments([]);
        };
    };

    // Lister les pères
    $scope.listPeresVAU = function() {
        var exceptId = null;
        if ($scope.currentChien && $scope.currentChien.id && $scope.currentChien.sexe == 'M') {
            exceptId = $scope.currentChien.id;
        };
        chienFactory.getPeres(exceptId).success(function(peres) {
            $scope.peresVAU = peres;
            var pereInconnu = {
                id: -1,
                text: "Inconnu"
            };
            $scope.peresVAU.splice(0, 0, pereInconnu);
            $(".peres-select-VAU").select2({
                language: "fr",
                data: $scope.peresVAU
            });

            $('.peres-select-VAU').on('change', function(e) {
                var datas = $('.peres-select-VAU').select2('data');
                var data = datas[0];
                if ($scope.currentChien && data) {
                    if (data.id == -1) {
                        $scope.currentChien.pere_id = null;
                        $scope.pereInfos = '';
                        $timeout(function() {
                            $scope.$apply();
                        });
                    } else {
                        $scope.currentChien.pere_id = data.id;
                        $scope.pereInfos = (data.race.nom ? data.race.nom : '') + '\n';
                        $scope.pereInfos += (data.robe.nom ? data.robe.nom : '') + '\n';
                        $scope.pereInfos += (data.date_naissance ? $scope.toJMA(data.date_naissance) : '');
                        $scope.pereInfos += (data.date_deces ? ' - ' + $scope.toJMA(data.date_deces) : '');
                        $timeout(function() {
                            $scope.$apply();
                        });
                    };
                };
            });

            if ($scope.currentChien && $scope.currentChien.pere_id) {
                $(".peres-select-VAU").val($scope.currentChien.pere_id).trigger('change');
            } else {
                $(".peres-select-VAU").val(-1).trigger('change');
            };


        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des pères (VAU).");
        });
    };

    // Lister les mères
    $scope.listMeresVAU = function() {
        var exceptId = null;
        if ($scope.currentChien && $scope.currentChien.id && $scope.currentChien.sexe == 'F') {
            exceptId = $scope.currentChien.id;
        };
        chienFactory.getMeres(exceptId).success(function(meres) {
            $scope.meresVAU = meres;
            var mereInconnue = {
                id: -1,
                text: "Inconnue"
            };
            $scope.meresVAU.splice(0, 0, mereInconnue);
            $(".meres-select-VAU").select2({
                language: "fr",
                data: $scope.meresVAU
            });

            $('.meres-select-VAU').on('change', function(e) {
                var datas = $('.meres-select-VAU').select2('data');
                var data = datas[0];
                if ($scope.currentChien && data) {
                    if (data.id == -1) {
                        $scope.currentChien.mere_id = null;
                        $scope.mereInfos = '';
                        $timeout(function() {
                            $scope.$apply();
                        });
                    } else {
                        $scope.currentChien.mere_id = data.id;
                        $scope.mereInfos = (data.race.nom ? data.race.nom : '') + '\n';
                        $scope.mereInfos += (data.robe.nom ? data.robe.nom : '') + '\n';
                        $scope.mereInfos += (data.date_naissance ? $scope.toJMA(data.date_naissance) : '');
                        $scope.mereInfos += (data.date_deces ? ' - ' + $scope.toJMA(data.date_deces) : '');
                        $timeout(function() {
                            $scope.$apply();
                        });
                    };
                };
            });

            if ($scope.currentChien && $scope.currentChien.mere_id) {
                $(".meres-select-VAU").val($scope.currentChien.mere_id).trigger('change');
            } else {
                $(".meres-select-VAU").val(-1).trigger('change');
            };

        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des mères (VAU).");
        });
    };

    // Lister les clients
    $scope.listClientsVAU = function() {
        clientFactory.list().success(function(clients) {
            $scope.clientsVAU = clients;
            var clientInconnu = {
                id: -1,
                text: "Inconnu",
            };
            $scope.clientsVAU.splice(0, 0, clientInconnu);
            $(".clients-select-VAU").select2({
                language: "fr",
                data: $scope.clientsVAU
            });

            $('.clients-select-VAU').on('change', function(e) {
                var datas = $('.clients-select-VAU').select2('data');
                var data = datas[0];
                if ($scope.currentChien && data) {
                    if (data.id == -1) {
                        $scope.currentChien.client_id = null;
                        $scope.clientInfos = '';
                        $timeout(function() {
                            $scope.$apply();
                        });
                    } else {
                        $scope.currentChien.client_id = data.id;
                        $scope.clientInfos = (data.rue ? data.rue : '');
                        $scope.clientInfos += (data.numero ? ', ' + data.numero : '') + '\n';
                        $scope.clientInfos += (data.code_postal ? data.code_postal : '');
                        $scope.clientInfos += (data.localite ? ' ' + data.localite : '') + '\n';
                        $scope.clientInfos += (data.pays ? data.pays : '') + '\n';
                        $scope.clientInfos += (data.email ? data.email : '') + '\n';
                        $scope.clientInfos += (data.tel1 ? data.tel1 : '') + '';
                        $scope.clientInfos += (data.tel2 ? ' ' + data.tel2 : '');
                        $timeout(function() {
                            $scope.$apply();
                        });
                    };
                };
            });
            $(".clients-select-VAU").val(-1).trigger('change');

        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des clients (VAU).");
        });
    };

    // Lister les types de document
    $scope.listTypedocsVAU = function() {
        typeDocumentFactory.list().success(function(types) {
            $scope.typesDocumentVAU = types;
            var typeInconnu = {
                id: -1,
                text: "Inconnu",
            };
            $scope.typesDocumentVAU.splice(0, 0, typeInconnu);
            $(".typedocs-select-VAU").select2({
                language: "fr",
                data: $scope.typesDocumentVAU
            });

            $('.typedocs-select-VAU').on('change', function(e) {
                var datas = $('.typedocs-select-VAU').select2('data');
                var data = datas[0];
                if ($scope.currentChien && $scope.currentDocument && data) {
                    if (data.id == -1) {
                        $scope.currentDocument.typedoc_id = null;
                    } else {
                        $scope.currentDocument.typedoc_id = data.id;
                    };
                };
            });
            $(".typedocs-select-VAU").val(-1).trigger('change');

        }).error(function() {
            showMessageInfo("Erreur", "Impossible de récupérer la liste des types de document (VAU).");
        });
    };

    // Lister les chiens
    $scope.listChiens = function(chiens) {
        $scope.searchResultsTitle = "Résultats de la recherche (" + chiens.length + ")";
        $scope.chiens = chiens;
        $.each($scope.chiens, function(key, chien) {
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

        });
        $scope.initTableChiens($scope.chiens);
    };

    // Lister les enfants
    $scope.listEnfants = function(chiens) {
        $scope.enfants = chiens;
        $.each($scope.enfants, function(key, chien) {
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

        });
        $scope.initTableEnfants($scope.enfants);
    };

    // Lister les documents
    $scope.listDocuments = function(documents) {
        $scope.documents = documents;
        $scope.initTableDocuments($scope.documents);
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

    // initialisation de la table des enfants
    $scope.initTableEnfants = function(enfants) {
        $scope.tableEnfants = new NgTableParams({
            // PARAMETRES
            sorting: {
                nom: "asc"
            }, // initialiser le tri sur le numero ascendant
            count: 15 // nbre d elements affiches par defaut
        }, {
            // DONNEES
            counts: [5, 10, 15, 20, 50], // choix d'affichage du nombre d elements par page. tableau vide = absence de choix d elements par page
            dataset: enfants // fournir la liste de donnees
        });
    };

    // initialisation de la table des documents
    $scope.initTableDocuments = function(documents) {
        $scope.tableDocuments = new NgTableParams({
            // PARAMETRES
            sorting: {
                nom: "asc"
            },
            count: 15
        }, {
            // DONNEES
            counts: [5, 10, 15, 20, 50], // choix d'affichage du nombre d elements par page. tableau vide = absence de choix d elements par page
            dataset: documents
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
    $scope.listClientsVAU();
    $scope.listTypedocsVAU();
    //--------------------------------------------------------------------------



}]);