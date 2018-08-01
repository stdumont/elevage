angular.module('elevageApp')
    .factory('fichierFactory', ['$http', function($http) {

        var urlBase = '/api/fichier/';
        var fichierFactory = {};

        // renvoi de tous les types de documents triés par nom
        fichierFactory.list = function() {
            return $http.get(urlBase + 'get-all');
        };

        // renvoi le nombre de types de documents
        fichierFactory.count = function() {
            return $http.get(urlBase + 'get-count');
        };

        // renvoi d'un type de document sur base de son id
        fichierFactory.find = function(id) {
            return $http.get(urlBase + 'find' + '/' + id);
        };

        // insère un type de document
        fichierFactory.insert = function(typedoc) {
            return $http.post(urlBase + 'insert', typedoc);
        };

        // met à jour un type de document
        fichierFactory.update = function(typedoc) {
            return $http.post(urlBase + 'update', typedoc);
        };

        // supprime un type de document
        fichierFactory.delete = function(id) {
            return $http.delete(urlBase + 'delete' + '/' + id);
        };

        return fichierFactory;

    }]);