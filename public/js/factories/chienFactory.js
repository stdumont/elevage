angular.module('elevageApp')
    .factory('chienFactory', ['$http', function($http) {

        var urlBase = '/api/chien/';
        var chienFactory = {};

        // renvoi le nombre de chiens
        chienFactory.count = function() {
            return $http.get(urlBase + 'get-count');
        };

        // renvoi le nombre de chiens pour une race
        chienFactory.countByRace = function(race_id) {
            return $http.get(urlBase + 'get-count-by-race' + '/' + race_id);
        };

        // renvoi le nombre de chiens pour une robe
        chienFactory.countByRobe = function(robe_id) {
            return $http.get(urlBase + 'get-count-by-robe' + '/' + robe_id);
        };

        // renvoi le nombre de chiens pour un client
        chienFactory.countByClient = function(client_id) {
            return $http.get(urlBase + 'get-count-by-client' + '/' + client_id);
        };

        // renvoi d'une chien sur base de son id
        chienFactory.find = function(id) {
            return $http.get(urlBase + 'find' + '/' + id);
        };

        // insère une chien
        chienFactory.insert = function(chien) {
            return $http.post(urlBase + 'insert', chien);
        };

        // met à jour une chien
        chienFactory.update = function(chien) {
            return $http.post(urlBase + 'update', chien);
        };

        // supprime une chien
        chienFactory.delete = function(id) {
            return $http.delete(urlBase + 'delete' + '/' + id);
        };

        return chienFactory;

    }]);