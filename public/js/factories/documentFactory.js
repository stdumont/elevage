angular.module('elevageApp')
    .factory('documentFactory', ['$http', function($http) {

        var urlBase = '/api/document/';
        var documentFactory = {};

        // renvoi le nombre de documents pour un type de document donné
        documentFactory.countByTypedoc = function(id) {
            return $http.get(urlBase + 'get-count-by-typedoc/' + id);
        };

        // renvoi une liste de documents pour un chien donné
        documentFactory.getByChien = function(id) {
            return $http.get(urlBase + 'get-by-chien/' + id);
        };

        // renvoi un fichier binaire sur base de son id
        documentFactory.getFichierById = function(id) {
            return $http.get(urlBase + 'get-fichier-by-id/' + id);
        };

        // supprime un document sur base de son id
        documentFactory.delete = function(id) {
            return $http.delete(urlBase + 'delete/' + id);
        };

        // création d'un document
        documentFactory.insert = function(document) {
            let params = {
                id: document.id,
                typedoc_id: document.typedoc_id,
                chien_id: document.chien_id,
                nom: document.nom,
                description: document.description,
                date_document: document.date_document
            };
            return $http.post(urlBase + 'insert', params);
        };

        // création d'un fichier
        documentFactory.insertFichier = function(fichier) {
            let params = {
                id: fichier.id,
                document_id: fichier.document_id,
                nomFichier: fichier.nomFichier,
                contentType: fichier.contentType,
                taille: fichier.taille,
                donnee: fichier.donnee
            };
            return $http.post(urlBase + 'insert-fichier', params);
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