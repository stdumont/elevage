angular.module('intranetApp')
    .factory('clientFactory', ['$http', function($http) {

        var urlBase = '/api/client/';
        var clientFactory = {};

        // renvoi de tous les clients triés par nom
        clientFactory.list = function() {
            return $http.get(urlBase + 'get-all');
        };

        // renvoi d'un client sur base de son id
        clientFactory.find = function(id) {
            return $http.get(urlBase + 'find' + '/' + id);
        };

        // insère un client
        clientFactory.insert = function(client) {
            return $http.post(urlBase + 'insert', client);
        };

        // met à jour un client
        clientFactory.update = function(client) {
            return $http.post(urlBase + 'update', client);
        };

        // supprime un client
        clientFactory.delete = function(id) {
            return $http.delete(urlBase + 'delete' + '/' + id);
        };

        return clientFactory;

    }]);