angular.module('elevageApp')
    .factory('raceFactory', ['$http', function($http) {

        var urlBase = '/api/race/';
        var raceFactory = {};

        // renvoi de toutes les races triées par nom
        raceFactory.list = function() {
            return $http.get(urlBase + 'get-all');
        };

        // renvoi le nombre de races
        raceFactory.count = function() {
            return $http.get(urlBase + 'get-count');
        };

        // renvoi d'une race sur base de son id
        raceFactory.find = function(id) {
            return $http.get(urlBase + 'find' + '/' + id);
        };

        // insère une race
        raceFactory.insert = function(race) {
            return $http.post(urlBase + 'insert', race);
        };

        // met à jour une race
        raceFactory.update = function(race) {
            return $http.post(urlBase + 'update', race);
        };

        // supprime une race
        raceFactory.delete = function(id) {
            return $http.delete(urlBase + 'delete' + '/' + id);
        };

        return raceFactory;

    }]);