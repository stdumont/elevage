angular.module('elevageApp')
    .factory('tableauBordFactory', ['$http', function($http) {

        var tableauBordFactory = {};

        // renvoi le nombre de clients 
        tableauBordFactory.getClientCount = function() {
            return $http.get('/api/client/get-count');
        };

        // renvoi le nombre de chiens
        tableauBordFactory.getChienCount = function() {
            return $http.get('/api/chien/get-count');
        };

        return tableauBordFactory;

    }]);