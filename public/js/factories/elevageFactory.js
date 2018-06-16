angular.module('elevageApp')
    .factory('elevageFactory', ['$http', function($http) {

        var urlBase = '/api/elevage/';
        var elevageFactory = {};

        // renvoi le premier élevage
        elevageFactory.first = function() {
            return $http.get(urlBase + 'first');
        };

        // met à jour un elevage
        elevageFactory.update = function(elevage) {
            return $http.post(urlBase + 'update', elevage);
        };

        return elevageFactory;

    }]);