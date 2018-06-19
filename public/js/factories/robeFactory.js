angular.module('elevageApp')
    .factory('robeFactory', ['$http', function($http) {

        var urlBase = '/api/robe/';
        var robeFactory = {};

        // renvoi de toutes les robes triées par nom
        robeFactory.list = function() {
            return $http.get(urlBase + 'get-all');
        };

        // renvoi le nombre de robes
        robeFactory.count = function() {
            return $http.get(urlBase + 'get-count');
        };

        // renvoi le nombre de robes pour une race
        robeFactory.countByRace = function(race_id) {
            return $http.get(urlBase + 'get-count-by-race' + '/' + race_id);
        };

        // renvoi d'une robe sur base de son id
        robeFactory.find = function(id) {
            return $http.get(urlBase + 'find' + '/' + id);
        };

        // insère une robe
        robeFactory.insert = function(robe) {
            return $http.post(urlBase + 'insert', robe);
        };

        // met à jour une robe
        robeFactory.update = function(robe) {
            return $http.post(urlBase + 'update', robe);
        };

        // supprime une robe
        robeFactory.delete = function(id) {
            return $http.delete(urlBase + 'delete' + '/' + id);
        };

        return robeFactory;

    }]);