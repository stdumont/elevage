angular.module('elevageApp').controller('documentController', ['$scope', '$window', 'FileUploader', '$route', '$http', 'documentFactory', 'typeDocumentFactory', 'clientFactory', 'fournisseurFactory', 'NgTableParams', '$sce',
    function($scope, $window, FileUploader, $route, $http, documentFactory, typeDocumentFactory, clientFactory, fournisseurFactory, NgTableParams, $sce) {

        // File upload provenant de https://github.com/nervgh/angular-file-upload
        var uploader = $scope.uploader = new FileUploader({
            url: '/api/document/uploadPiece',
            removeAfterUpload: true
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onBeforeUploadItem = function(fileItem) {
            var piece = {
                id: null,
                document_id: $scope.currentDocument.id,
                nom: fileItem.file.name,
                type: fileItem.file.type,
                taille: fileItem.file.size
            };
            documentFactory.addPiece(piece).success(function(id) {
                fileItem.formData.push({ piece_id: id });
            }).error(function() {

            });
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            documentFactory.getFichierById(response)
                .success(function(fichier) {
                    var piece = {
                        id: fichier.piece.id,
                        document_id: $scope.currentDocument.id,
                        nom: fileItem.file.name,
                        type: fileItem.file.type,
                        taille: fileItem.file.size
                    };
                    $scope.currentDocument.pieces.push(piece);
                })
                .error(function() {

                });
        };
        //-- File upload


        // Mettre à jour le menu de navigation avec le lien courant.
        refreshCurrentLink($route.current.activeTab);

        //--------------------------------------------------------------------------
        // Variables
        //--------------------------------------------------------------------------
        $scope.typedocs = null;
        $scope.clients = null;
        $scope.fournisseurs = null;
        $scope.currentDocument = new Object();
        $scope.typedocsCrud = null;
        $scope.clientsCrud = null;
        $scope.fournisseursCrud = null;
        $scope.aucunTypedoc = { id: -1, nom: "" };
        $scope.aucunClient = { id: -1, nom: "" };
        $scope.aucunFournisseur = { id: -1, nom: "" };

        $scope.inputSearchCriteria = null;
        $scope.inputSearchTypedoc = null;
        $scope.inputSearchClient = null;
        $scope.inputSearchFournisseur = null;
        $scope.inputSearchDateDebut = null;
        $scope.inputSearchDateDebutAMJ = null;
        $scope.inputSearchDateFin = null;
        $scope.inputSearchDateFinAMJ = null;

        $scope.showSum = false;
        $scope.sommeMontantTvacDepense = 0.00;
        $scope.sommeRegleDepense = 0.00;
        $scope.sommeSoldeDepense = 0.00;
        $scope.sommeMontantTvacRecette = 0.00;
        $scope.sommeRegleRecette = 0.00;
        $scope.sommeSoldeRecette = 0.00;
        $scope.soldeMontantTvac = 0.00;
        $scope.soldeRegle = 0.00;
        $scope.soldeSolde = 0.00;

        $scope.resultatTitle = 'Résultat de la recherche';
        $scope.disabled = null;
        $scope.editmode = null;

        // colonnes du résultat de recherche
        $scope.columns = [
            { title: 'No', field: 'id', visible: true, class: '' },
            { title: 'Type', field: 'typedoc.nom', visible: true, class: '' },
            { title: 'Date document', field: 'date_document', visible: true, class: '' },
            { title: 'Echéance', field: 'date_echeance', visible: true, class: '' },
            { title: 'Nom', field: 'nom', visible: true, class: '' },
            { title: 'R/D', field: 'rd', visible: true, class: '' },
            { title: 'Contrepartie', field: '', visible: true, class: '' },
            { title: 'Montant', field: 'montant_tvac', visible: true, class: '' },
            { title: 'Payé', field: 'regle', visible: true, class: '' },
            { title: 'Solde', field: 'solde', visible: true, class: '' },
            { title: 'Pièce', field: 'solde', visible: true, class: '' },
            { title: 'Editer', field: 'solde', visible: true, class: '' },
            { title: 'Suppr.', field: 'solde', visible: true, class: '' }
        ];

        $scope.documentFormError = false;
        $scope.documentFormErrorMessage = null;

        //--------------------------------------------------------------------------



        //--------------------------------------------------------------------------
        // Evènements de la couche UI
        //--------------------------------------------------------------------------

        //--------------------------------------------------------------------------
        // Click sur le bouton Rechercher
        //--------------------------------------------------------------------------
        $scope.rechercher = function() {
            $scope.setDocumentsLoading(true);
            if ($scope.inputSearchDateDebut) {
                $scope.inputSearchDateDebutAMJ = moment($scope.inputSearchDateDebut, 'DD/MM/YYYY').format('YYYY-MM-DD');
            } else {
                $scope.inputSearchDateDebutAMJ = null;
            };
            if ($scope.inputSearchDateFin) {
                $scope.inputSearchDateFinAMJ = moment($scope.inputSearchDateFin, 'DD/MM/YYYY').format('YYYY-MM-DD');
            } else {
                $scope.inputSearchDateFinAMJ = null;
            };
            $scope.sommeMontantTvacDepense = 0.00;
            $scope.sommeRegleDepense = 0.00;
            $scope.sommeSoldeDepense = 0.00;
            $scope.sommeMontantTvacRecette = 0.00;
            $scope.sommeRegleRecette = 0.00;
            $scope.sommeSoldeRecette = 0.00;
            $scope.soldeMontantTvac = 0.00;
            $scope.soldeRegle = 0.00;
            $scope.soldeSolde = 0.00;

            documentFactory.getByCriterias(
                $scope.inputSearchCriteria,
                $scope.inputSearchTypedoc,
                $scope.inputSearchFournisseur,
                $scope.inputSearchClient,
                $scope.inputSearchDateDebutAMJ,
                $scope.inputSearchDateFinAMJ
            )

            .success(function(documents) {
                    $.each(documents, function(index, document) {
                        if (document.rd) {
                            if (document.rd === 'D') {
                                if (document.montant_tvac) {
                                    $scope.sommeMontantTvacDepense += parseFloat(document.montant_tvac);
                                    $scope.soldeMontantTvac -= parseFloat(document.montant_tvac);
                                }
                                if (document.regle) {
                                    $scope.sommeRegleDepense += parseFloat(document.regle);
                                    $scope.soldeRegle -= parseFloat(document.regle);
                                }
                                if (document.solde) {
                                    $scope.sommeSoldeDepense += parseFloat(document.solde);
                                    $scope.soldeSolde -= parseFloat(document.solde);
                                }
                            }
                            if (document.rd === 'R') {
                                if (document.montant_tvac) {
                                    $scope.sommeMontantTvacRecette += parseFloat(document.montant_tvac);
                                    $scope.soldeMontantTvac += parseFloat(document.montant_tvac);
                                }
                                if (document.regle) {
                                    $scope.sommeRegleRecette += parseFloat(document.regle);
                                    $scope.soldeRegle += parseFloat(document.regle);
                                }
                                if (document.solde) {
                                    $scope.sommeSoldeRecette += parseFloat(document.solde);
                                    $scope.soldeSolde += parseFloat(document.solde);
                                }
                            }
                        }
                    });
                    $scope.resultatTitle = "Résultat de la recherche (" + documents.length + ")";
                    $scope.initTableDocuments(documents);
                    $scope.setDocumentsLoading(false);
                })
                .error(function(error) {
                    $scope.setDocumentsLoading(false);
                    console.log("Erreur de la recherche de documents");
                });

        };

        //--------------------------------------------------------------------------
        // Click sur le bouton Effacer les critères
        //--------------------------------------------------------------------------
        $scope.effacerCriteres = function() {
            $scope.inputSearchCriteria = null;
            $scope.inputSearchDateDebut = null;
            $scope.inputSearchDateFin = null;
            $scope.listAllTypedocs();
            $scope.listAllClients();
            $scope.listAllFournisseurs();
        };

        //--------------------------------------------------------------------------
        // Click sur le bouton Ajouter un document
        //--------------------------------------------------------------------------
        $scope.askCreationDoc = function() {
            $scope.creationUpdateModalLabel = "Créer un document";
            $scope.currentDocument = {
                typedoc_id: -1,
                client_id: null,
                fournisseur_id: null,
                nom: null,
                description: null,
                rd: null,
                communication: null,
                montant_htva: null,
                montant_tva: null,
                montant_tvac: null,
                regle: null,
                solde: null,
                date_document: moment(new Date()).format('DD/MM/YYYY'),
                date_echeance: null,
            };
            $scope.editmode = 'Add';
            $scope.disabled = false;
            $scope.initSelect2TypedocsCrud();
            $('.inputRD').val(null);
            $scope.initSelect2FournisseursCrud();
            $scope.initSelect2ClientsCrud();
            $scope.documentFormError = false;
            $scope.documentFormErrorMessage = '';
            $('#modalAddUpdateDoc').modal();
        };

        //--------------------------------------------------------------------------
        // Click sur un élément de la liste pour Editer un document
        //--------------------------------------------------------------------------
        $scope.askUpdateDoc = function(document) {
            $scope.creationUpdateModalLabel = "Modifier un document (n° " + document.id + ")";
            $scope.currentDocument = jQuery.extend(true, document);
            if ($scope.currentDocument.date_document !== null) {
                $scope.currentDocument.date_document = $scope.getDateJJMMYYYY($scope.currentDocument.date_document);
            }
            if ($scope.currentDocument.date_echeance !== null) {
                $scope.currentDocument.date_echeance = $scope.getDateJJMMYYYY($scope.currentDocument.date_echeance);
            }
            $scope.editmode = 'Update';
            $scope.disabled = false;
            $('.inputTypedoc').val($scope.currentDocument.typedoc_id).trigger('change');
            if ($scope.currentDocument.fournisseur_id) {
                $('.inputFournisseur').val($scope.currentDocument.fournisseur_id).trigger('change');
            };
            if ($scope.currentDocument.client_id) {
                $('.inputClient').val($scope.currentDocument.client_id).trigger('change');
            };
            $scope.documentFormError = false;
            $scope.documentFormErrorMessage = '';
            $('#modalAddUpdateDoc').modal();
        };

        //--------------------------------------------------------------------------
        // Click sur un élément de la liste pour Visualiser un document
        //--------------------------------------------------------------------------
        $scope.askViewDoc = function(document) {
            $scope.creationUpdateModalLabel = "Consulter un document (n° " + document.id + ")";
            $scope.currentDocument = jQuery.extend(true, document);
            if ($scope.currentDocument.date_document !== null) {
                $scope.currentDocument.date_document = $scope.getDateJJMMYYYY($scope.currentDocument.date_document);
            }
            if ($scope.currentDocument.date_echeance !== null) {
                $scope.currentDocument.date_echeance = $scope.getDateJJMMYYYY($scope.currentDocument.date_echeance);
            }
            $scope.editmode = 'View';
            $scope.disabled = true;
            $('#modalAddUpdateDoc').modal();
        };

        //--------------------------------------------------------------------------
        // Click sur un élément de la liste pour Gérer les pièces d'un document
        //--------------------------------------------------------------------------
        $scope.askManagePieces = function(document) {
            $scope.gestionPiecesModalLabel = "Gérer les pièces jointes du document (n° " + document.id + ") : " + document.nom;
            $scope.currentDocument = document;
            $('#modalGestionPieces').modal();
        };

        //--------------------------------------------------------------------------
        // Click pour visualiser une pièce
        //--------------------------------------------------------------------------
        $scope.askViewPiece = function(piece) {
            $window.open('/api/document/get-fichier-by-piece/' + piece.id, '_blank');
        };

        //--------------------------------------------------------------------------
        // Click pour supprimer une pièce
        //--------------------------------------------------------------------------
        $scope.askDeletePiece = function(piece) {
            for (var i = 0; i < $scope.currentDocument.pieces.length; i++) {
                if (piece.id == $scope.currentDocument.pieces[i].id) {
                    $scope.currentDocument.pieces.splice(i, 1);
                }
            };
            documentFactory.deletePiece(piece.id);
        };

        //--------------------------------------------------------------------------
        // Click sur le bouton Totaux en en-tête de la grille de résultats
        //--------------------------------------------------------------------------
        $scope.toggleSum = function() {
            $scope.showSum = !$scope.showSum;
        };

        //--------------------------------------------------------------------------
        // Click sur un élément de la liste pour Supprimer un document
        //--------------------------------------------------------------------------
        $scope.askDeleteDoc = function(document) {
            $scope.deleteModalLabel = "Supprimer un document (n° " + document.id + ")";
            if (document.pieces.length == 0) {
                $scope.deleteModalText = "Voulez-vous supprimer le document '" + document.nom + "' ?";
            };
            if (document.pieces.length == 1) {
                $scope.deleteModalText = "Voulez-vous supprimer le document '" + document.nom + "', ainsi que sa pièce jointe ?";
            };
            if (document.pieces.length > 1) {
                $scope.deleteModalText = "Voulez-vous supprimer le document '" + document.nom + "', ainsi que ses " + document.pieces.length + " pièces jointes ?";
            };

            $scope.currentDocument = document;
            $('#modalDeleteDoc').modal();
        };

        //--------------------------------------------------------------------------
        // Click sur le bouton Valider lors de l'ajout/modification d'un document
        //--------------------------------------------------------------------------
        $scope.createUpdateDocument = function() {

            $scope.setFormDocumentLoading(true);

            // vérifier validité
            if (!$scope.isFillingDocumentValid()) {
                $scope.setFormDocumentLoading(false);
                return;
            }

            // formatter pour mise en db
            if ($scope.currentDocument.client_id == "-1") {
                $scope.currentDocument.client_id = null;
            }
            if ($scope.currentDocument.fournisseur_id == "-1") {
                $scope.currentDocument.fournisseur_id = null;
            }
            $scope.currentDocument.date_document = moment($scope.currentDocument.date_document, 'DD/MM/YYYY').format('YYYY-MM-DD');
            if ($scope.currentDocument.date_echeance) {
                $scope.currentDocument.date_echeance = moment($scope.currentDocument.date_echeance, 'DD/MM/YYYY').format('YYYY-MM-DD');
            };
            if (!$scope.currentDocument.rd) {
                $scope.currentDocument.client_id = null;
                $scope.currentDocument.fournisseur_id = null;
                $scope.currentDocument.montant_htva = null;
                $scope.currentDocument.montant_tva = null;
                $scope.currentDocument.montant_tvac = null;
                $scope.currentDocument.regle = null;
                $scope.currentDocument.solde = null;
            };
            if ($scope.currentDocument.rd == 'D') {
                $scope.currentDocument.client_id = null;
                $scope.currentDocument.montant_tvac = parseFloat($scope.currentDocument.montant_tvac).toFixed(2);
                $scope.currentDocument.montant_htva = (parseFloat($scope.currentDocument.montant_tvac) / 1.21).toFixed(2);
                $scope.currentDocument.montant_tva = (parseFloat($scope.currentDocument.montant_tvac) - (parseFloat($scope.currentDocument.montant_tvac) / 1.21)).toFixed(2);
                $scope.currentDocument.regle = parseFloat($scope.currentDocument.regle).toFixed(2);
                $scope.currentDocument.solde = (parseFloat($scope.currentDocument.montant_tvac) - parseFloat($scope.currentDocument.regle)).toFixed(2);
            };
            if ($scope.currentDocument.rd == 'R') {
                $scope.currentDocument.fournisseur_id = null;
                $scope.currentDocument.montant_tvac = parseFloat($scope.currentDocument.montant_tvac).toFixed(2);
                $scope.currentDocument.montant_htva = (parseFloat($scope.currentDocument.montant_tvac) / 1.21).toFixed(2);
                $scope.currentDocument.montant_tva = (parseFloat($scope.currentDocument.montant_tvac) - (parseFloat($scope.currentDocument.montant_tvac) / 1.21)).toFixed(2);
                $scope.currentDocument.regle = parseFloat($scope.currentDocument.regle).toFixed(2);
                $scope.currentDocument.solde = (parseFloat($scope.currentDocument.montant_tvac) - parseFloat($scope.currentDocument.regle)).toFixed(2);
            };

            // inserer/mettre à jour au départ de currentDocument
            documentFactory.save($scope.currentDocument).success(function(document) {}).error(function() {});

            // dissimuler la modal dans le .success de l'appel à la factory
            $scope.setFormDocumentLoading(false);
            $('#modalAddUpdateDoc').modal('hide');
            $scope.rechercher();


        };

        //--------------------------------------------------------------------------
        // Click sur le bouton Oui lors de la suppression d'un document
        //--------------------------------------------------------------------------
        $scope.deleteDocument = function() {

            $scope.setFormDocumentLoading(true);

            // supprimer currentDocument
            documentFactory.delete($scope.currentDocument.id);

            // dissimuler la modal
            $('#modalDeleteDoc').modal('hide');
            $scope.setFormDocumentLoading(false);

            // Actualiser la liste de résultats
            $scope.rechercher();

        };

        //--------------------------------------------------------------------------
        // Spinner lors de l'ouverture/fermeture de la modal d'ajout ou de
        // modification d'un document
        //--------------------------------------------------------------------------
        $scope.setFormDocumentLoading = function(loading) {
            setLoading('.form-createUpdate-document', loading);
        };

        //--------------------------------------------------------------------------
        // Spinner sur la table des documennts lors de la recherche
        //--------------------------------------------------------------------------
        $scope.setDocumentsLoading = function(loading) {
            setLoading('.box-documents', loading);
        };

        //--------------------------------------------------------------------------
        // Initialise la table des documennts
        //--------------------------------------------------------------------------
        $scope.initTableDocuments = function(documents) {

            $scope.tableDocuments = new NgTableParams({
                // PARAMETRES   
                // sorting: sortingParam,          // initialiser le tri sur le numero descendant
                count: 50 // nbre d elements affiches par defaut
            }, {
                // DONNEES
                counts: [10, 20, 50, 100, 500], // choix d'affichage du nombre d elements par page. tableau vide = absence de choix d elements par page
                dataset: documents // fournir la liste de donnees
            });
        };

        //--------------------------------------------------------------------------
        // Remplace ',' par '.' dans montant_tvac
        //--------------------------------------------------------------------------
        $scope.$watch('currentDocument.montant_tvac', function(newVal) {
            if (newVal && $scope.currentDocument) {
                $scope.currentDocument.montant_tvac = newVal.replace(/,/g, '.');
            };
        });

        //--------------------------------------------------------------------------
        // Remplace ',' par '.' dans regle
        //--------------------------------------------------------------------------
        $scope.$watch('currentDocument.regle', function(newVal) {
            if (newVal && $scope.currentDocument) {
                $scope.currentDocument.regle = newVal.replace(/,/g, '.');
            };
        });

        //--------------------------------------------------------------------------
        // Contrôles de validité dans la modal d'ajout ou de modification d'un
        // document
        //--------------------------------------------------------------------------
        $scope.isFillingDocumentValid = function() {
            $scope.documentFormError = false;
            $scope.documentFormErrorMessage = null;

            // Type de document garni ?
            if ($scope.currentDocument.typedoc_id == -1) {
                $scope.documentFormError = true;
                $scope.documentFormErrorMessage = "Le type de document doit être rempli."
                return false;
            };

            // Date du document garnie ?
            if ($scope.currentDocument.date_document == null || $scope.currentDocument.date_document == '') {
                $scope.documentFormError = true;
                $scope.documentFormErrorMessage = "La date du document doit être remplie."
                return false;
            };

            // Date du document valide ?
            if (!moment($scope.currentDocument.date_document, 'DD/MM/YYYY').isValid()) {
                $scope.documentFormError = true;
                $scope.documentFormErrorMessage = "Le format de la date du document doit être 'JJ/MM/AAAA'."
                return false;
            };

            // Date d'échéance du document valide si garnie ?
            if ($scope.currentDocument.date_echeance !== null && $scope.currentDocument.date_echeance !== '') {
                if (!moment($scope.currentDocument.date_echeance, 'DD/MM/YYYY').isValid()) {
                    $scope.documentFormError = true;
                    $scope.documentFormErrorMessage = "Le format de la date d'échéance doit être 'JJ/MM/AAAA'."
                    return false;
                };
            };

            // Nom du document garni ?
            if ($scope.currentDocument.nom == null) {
                $scope.documentFormError = true;
                $scope.documentFormErrorMessage = "Le nom du document doit être rempli."
                return false;
            };

            // Recette/Depense = 'R' ou 'D' si garni ?
            if ($scope.currentDocument.rd !== null && $scope.currentDocument.rd !== 'D' && $scope.currentDocument.rd !== 'R') {
                $scope.documentFormError = true;
                $scope.documentFormErrorMessage = "Le code Dépense/Recette doit valoir 'D' ou 'R'."
                return false;
            };

            // Fournisseur garni si Recette/Depense = 'D' ?
            if ($scope.currentDocument.rd == 'D' && $scope.currentDocument.fournisseur_id == "-1") {
                $scope.documentFormError = true;
                $scope.documentFormErrorMessage = "Le fournisseur doit être choisi."
                return false;
            };

            // Client garni si Recette/Depense = 'R' ?
            if ($scope.currentDocument.rd == 'R' && $scope.currentDocument.client_id == "-1") {
                $scope.documentFormError = true;
                $scope.documentFormErrorMessage = "Le client doit être choisi."
                return false;
            };

            var decimal = /^[-+]?[0-9]{1,6}\.[0-9]{1,2}$/;

            // Montant tvac correct si garni ?
            if ($scope.currentDocument.montant_tvac !== null) {
                if (!$scope.currentDocument.montant_tvac.match(decimal)) {
                    $scope.documentFormError = true;
                    $scope.documentFormErrorMessage = "Le montant à payer ou à recevoir introduit n'est pas correct."
                    return false;
                }
            };

            // Montant reglé correct si garni ?
            if ($scope.currentDocument.regle !== null) {
                if (!$scope.currentDocument.regle.match(decimal)) {
                    $scope.documentFormError = true;
                    $scope.documentFormErrorMessage = "Le montant payé ou reçu introduit n'est pas correct."
                    return false;
                }
            };

            return true;
        };

        //--------------------------------------------------------------------------
        // Formatte une date en JJ/MM/YYYY
        //--------------------------------------------------------------------------
        $scope.getDateJJMMYYYY = function(date) {
            if (date === null || typeof date === 'undefined') {
                return '';
            }
            return moment(date).format("DD/MM/YYYY");
        };

        //--------------------------------------------------------------------------
        // Formatte une date en JJ/MM/YYYY qui est dans currentDocument
        // 1 = date document
        // 2 = date échéance
        //--------------------------------------------------------------------------
        $scope.getCurrentDateJJMMYYYY = function(whichDate) {
            let date = null;
            switch (whichDate) {
                case 1:
                    date = $scope.currentDocument.date_document;
                    break;
                case 2:
                    date = $scope.currentDocument.date_echeance;
                    break;
                default:
                    return '';
            }
            return $scope.getDateJJMMYYYY(date);
        };

        //--------------------------------------------------------------------------
        // Affiche un montant à la manière française
        //--------------------------------------------------------------------------
        $scope.getMontantFr = function(montant) {
            if (montant === null || typeof montant === 'undefined') {
                return '';
            }

            var formatter = new Intl.NumberFormat('fr-BE', {
                style: 'currency',
                currency: 'EUR',
                useGrouping: true,
                minimumFractionDigits: 2,
                // the default value for minimumFractionDigits depends on the currency
                // and is usually already 2
            });

            return formatter.format(montant);
        };

        //--------------------------------------------------------------------------
        // Affiche un montant à la manière française de currentDocument
        // 1 = montant tvac
        // 2 = montant réglé
        // 3 = solde
        // 4 = montant htva
        // 5 = montant tva
        //--------------------------------------------------------------------------
        $scope.getCurrentMontantFr = function(whichMontant) {
            let montant = null;
            switch (whichMontant) {
                case 1:
                    montant = $scope.currentDocument.montant_tvac;
                    break;
                case 2:
                    montant = $scope.currentDocument.regle;
                    break;
                case 3:
                    montant = $scope.currentDocument.solde;
                    break;
                case 4:
                    montant = $scope.currentDocument.montant_htva;
                    break;
                case 5:
                    montant = $scope.currentDocument.montant_tva;
                    break;
                default:
                    return '';
            }
            return $scope.getMontantFr(montant);
        };

        //--------------------------------------------------------------------------
        // Détermine si un document a une date d'échéance passée et un solde # 0.00
        // et une action de recette ou dépense
        //--------------------------------------------------------------------------
        $scope.isDocumentEchu = function(document) {
            if (!document.date_echeance) {
                return false;
            };
            if (!document.solde) {
                return false;
            };
            if (document.solde === '0.00') {
                return false;
            };
            if (!document.rd) {
                return false;
            };
            let today = moment();
            let echeance = moment(document.date_echeance);
            return today.diff(echeance, 'days') >= 0;
        };

        //--------------------------------------------------------------------------
        // Renvoie le nom du fournisseur ou du client ou ''
        //--------------------------------------------------------------------------
        $scope.getContrepartie = function(document) {
            if (document.client) {
                return document.client.nom;
            };
            if (document.fournisseur) {
                return document.fournisseur.nom;
            };
            return '';
        };

        //--------------------------------------------------------------------------
        // Renvoie le nom du fournisseur ou du client ou '' de currentDocument
        //--------------------------------------------------------------------------
        $scope.getCurrentContrepartie = function() {
            return $scope.getContrepartie($scope.currentDocument);
        };

        //--------------------------------------------------------------------------
        // Renvoie le solde des montants Tvac (r-d)
        //--------------------------------------------------------------------------
        $scope.getSoldeMontantTvac = function() {
            return $scope.getMontantFr($scope.soldeMontantTvac);
        };

        //--------------------------------------------------------------------------
        // Renvoie le solde des montants réglés (r-d)
        //--------------------------------------------------------------------------
        $scope.getSoldeRegle = function() {
            return $scope.getMontantFr($scope.soldeRegle);
        };

        //--------------------------------------------------------------------------
        // Renvoie le solde des soldes (r-d)
        //--------------------------------------------------------------------------
        $scope.getSoldeSolde = function() {
            return $scope.getMontantFr($scope.soldeSolde);
        };

        //--------------------------------------------------------------------------
        // Renvoie la somme des montants Tvac de dépense
        //--------------------------------------------------------------------------
        $scope.getSommeMontantTvacDepense = function() {
            return $scope.getMontantFr($scope.sommeMontantTvacDepense);
        };

        //--------------------------------------------------------------------------
        // Renvoie la somme des montants payés de dépense
        //--------------------------------------------------------------------------
        $scope.getSommeRegleDepense = function() {
            return $scope.getMontantFr($scope.sommeRegleDepense);
        };

        //--------------------------------------------------------------------------
        // Renvoie la somme des soldes de dépense
        //--------------------------------------------------------------------------
        $scope.getSommeSoldeDepense = function() {
            return $scope.getMontantFr($scope.sommeSoldeDepense);
        };

        //--------------------------------------------------------------------------
        // Renvoie la somme des montants Tvac de recette
        //--------------------------------------------------------------------------
        $scope.getSommeMontantTvacRecette = function() {
            return $scope.getMontantFr($scope.sommeMontantTvacRecette);
        };

        //--------------------------------------------------------------------------
        // Renvoie la somme des montants payés de recette
        //--------------------------------------------------------------------------
        $scope.getSommeRegleRecette = function() {
            return $scope.getMontantFr($scope.sommeRegleRecette);
        };

        //--------------------------------------------------------------------------
        // Renvoie la somme des soldes de recette
        //--------------------------------------------------------------------------
        $scope.getSommeSoldeRecette = function() {
            return $scope.getMontantFr($scope.sommeSoldeRecette);
        };

        //--------------------------------------------------------------------------
        // Liste tous les types de documents + appel création select2
        //--------------------------------------------------------------------------
        $scope.listAllTypedocs = function() {
            emptySelect2(".inputSearchTypedoc");
            emptySelect2(".inputTypedoc");
            typeDocumentFactory.list()
                .success(function(typedocs) {
                    $scope.typedocs = typedocs;
                    $scope.typedocsCrud = jQuery.extend(true, [], typedocs); // cloner/copier en profondeur
                    $scope.typedocsCrud.splice(0, 0, $scope.aucunTypedoc);
                    $scope.initSelect2Typedocs();
                    $scope.initSelect2TypedocsCrud();
                })
                .error(function(error) {
                    console.log("Erreur lors du chargement des types de documents");
                });
        };

        //--------------------------------------------------------------------------
        // Liste tous les clients + appel création select2
        //--------------------------------------------------------------------------
        $scope.listAllClients = function() {
            emptySelect2(".inputSearchClients");
            emptySelect2(".inputClient");
            clientFactory.list()
                .success(function(clients) {
                    $scope.clients = clients;
                    $scope.clientsCrud = jQuery.extend(true, [], clients); // cloner/copier en profondeur
                    $scope.clientsCrud.splice(0, 0, $scope.aucunClient);
                    $scope.initSelect2Clients();
                    $scope.initSelect2ClientsCrud();
                })
                .error(function(error) {
                    console.log("Erreur lors du chargement des clients");
                });
        };

        //--------------------------------------------------------------------------
        // Liste tous les fournisseurs + appel création select2
        //--------------------------------------------------------------------------
        $scope.listAllFournisseurs = function() {
            emptySelect2(".inputSearchFournisseurs");
            emptySelect2(".inputFournisseur");
            fournisseurFactory.list()
                .success(function(fournisseurs) {
                    $scope.fournisseurs = fournisseurs;
                    $scope.fournisseursCrud = jQuery.extend(true, [], fournisseurs); // cloner/copier en profondeur
                    $scope.fournisseursCrud.splice(0, 0, $scope.aucunFournisseur);
                    $scope.initSelect2Fournisseurs();
                    $scope.initSelect2FournisseursCrud();
                })
                .error(function(error) {
                    console.log("Erreur lors du chargement des fournisseurs");
                });
        };

        //--------------------------------------------------------------------------
        // Initialise le select des types de documents
        //--------------------------------------------------------------------------
        $scope.initSelect2Typedocs = function() {
            // ajouter un critere vide
            var tousTypes = { id: -1, nom: "Tous types" };
            $scope.typedocs.splice(0, 0, tousTypes);

            var typedocToSelect2 = function(typedoc) {
                return { id: typedoc.id, text: typedoc.nom };
            };

            var onChangeTypedoc = function(typedocId) {
                $scope.inputSearchTypedoc = typedocId;
            };

            // initialiser select2
            setSelect2(".inputSearchTypedoc", $scope.typedocs, tousTypes, typedocToSelect2, null, onChangeTypedoc);
        };

        //--------------------------------------------------------------------------
        // Initialise le select des types de documents (crud)
        //--------------------------------------------------------------------------
        $scope.initSelect2TypedocsCrud = function() {
            var typedocCrudToSelect2 = function(typedoc) {
                return { id: typedoc.id, text: typedoc.nom };
            };

            var onChangeTypedocCrud = function(typedocId) {
                $scope.currentDocument.typedoc_id = typedocId;
            };

            // initialiser select2
            setSelect2(".inputTypedoc", $scope.typedocsCrud, $scope.aucunTypedoc, typedocCrudToSelect2, null, onChangeTypedocCrud);
        };

        //--------------------------------------------------------------------------
        // Initialise le select des fournisseurs
        //--------------------------------------------------------------------------
        $scope.initSelect2Fournisseurs = function() {
            // ajouter un critere vide
            var tousFournisseurs = { id: -1, nom: "Tous fournisseurs" };
            $scope.fournisseurs.splice(0, 0, tousFournisseurs);

            var fournisseurToSelect2 = function(fournisseur) {
                return { id: fournisseur.id, text: fournisseur.nom };
            };

            var onChangeFournisseur = function(fournisseurId) {
                $scope.inputSearchFournisseur = fournisseurId;
            };

            // initialiser select2
            setSelect2(".inputSearchFournisseurs", $scope.fournisseurs, tousFournisseurs, fournisseurToSelect2, null, onChangeFournisseur);
        };

        //--------------------------------------------------------------------------
        // Initialise le select des fournisseurs (Crud)
        //--------------------------------------------------------------------------
        $scope.initSelect2FournisseursCrud = function() {

            var fournisseurCrudToSelect2 = function(fournisseur) {
                return { id: fournisseur.id, text: fournisseur.nom };
            };

            var onChangeFournisseurCrud = function(fournisseurId) {
                $scope.currentDocument.fournisseur_id = fournisseurId;
            };

            // initialiser select2
            setSelect2(".inputFournisseur", $scope.fournisseursCrud, $scope.aucunFournisseur, fournisseurCrudToSelect2, null, onChangeFournisseurCrud);
        };

        //--------------------------------------------------------------------------
        // Initialise le select des clients
        //--------------------------------------------------------------------------
        $scope.initSelect2Clients = function() {
            // ajouter un critere vide
            var tousClients = { id: -1, nom: "Tous clients" };
            $scope.clients.splice(0, 0, tousClients);

            var clientToSelect2 = function(client) {
                return { id: client.id, text: client.nom };
            };

            var onChangeClient = function(clientId) {
                $scope.inputSearchClient = clientId;
            };

            // initialiser select2
            setSelect2(".inputSearchClients", $scope.clients, tousClients, clientToSelect2, null, onChangeClient);
        };

        //--------------------------------------------------------------------------
        // Initialise le select des clients (Crud)
        //--------------------------------------------------------------------------
        $scope.initSelect2ClientsCrud = function() {

            var clientCrudToSelect2 = function(client) {
                return { id: client.id, text: client.nom };
            };

            var onChangeClientCrud = function(clientId) {
                $scope.currentDocument.client_id = clientId;
            };

            // initialiser select2
            setSelect2(".inputClient", $scope.clientsCrud, $scope.aucunClient, clientCrudToSelect2, null, onChangeClientCrud);
        };
        //--------------------------------------------------------------------------


        //--------------------------------------------------------------------------
        // Accès vers la couche REST (lien avec les factories Angular)
        //--------------------------------------------------------------------------
        //--------------------------------------------------------------------------

        //--------------------------------------------------------------------------
        // MAIN
        //--------------------------------------------------------------------------
        $scope.listAllTypedocs();
        $scope.listAllClients();
        $scope.listAllFournisseurs();

        //--------------------------------------------------------------------------

    }
]);