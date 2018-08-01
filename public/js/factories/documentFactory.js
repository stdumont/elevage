angular.module('elevageApp')
    .factory('documentFactory', ['$http', function($http) {

        var urlBase = '/api/document/';
        var documentFactory = {};

        // renvoi le nombre de documents pour un type de document donné
        documentFactory.countByTypedoc = function(id) {
            return $http.get(urlBase + 'get-count-by-typedoc/' + id);
        };

        // renvoi un fichier binaire sur base de son id
        documentFactory.getFichierById = function(id) {
            return $http.get(urlBase + 'get-fichier-by-id/' + id);
        };

        // création ou mise à jour d'un document
        documentFactory.save = function(document) {
            let params = {
                id: document.id,
                typedoc_id: document.typedoc_id,
                client_id: document.client_id,
                fournisseur_id: document.fournisseur_id,
                nom: document.nom,
                description: document.description,
                rd: document.rd,
                communication: document.communication,
                montant_htva: document.montant_htva,
                montant_tva: document.montant_tva,
                montant_tvac: document.montant_tvac,
                regle: document.regle,
                solde: document.solde,
                date_document: document.date_document,
                date_echeance: document.date_echeance
            };
            if (document.id == null) {
                return $http.post(urlBase + 'insert', params);
            } else {
                return $http.post(urlBase + 'update', params);
            };
        };

        // suppression d'un document sur base de son id
        documentFactory.delete = function(id) {
            return $http.delete(urlBase + 'delete/' + id);
        };

        // renvoi le nombre de documents pour un chien donné
        documentFactory.countByChien = function(id) {
            return $http.get(urlBase + 'get-count-by-chien/' + id);
        };

        return documentFactory;

    }]);