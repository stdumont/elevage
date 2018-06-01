angular.module('intranetApp')
    .factory('tableauBordFactory', ['$http', function($http) {

        var tableauBordFactory = {};

        // renvoi le nombre de fournisseurs 
        tableauBordFactory.getFournisseurCount = function() {
            return $http.get('/api/fournisseur/get-count');
        };

        // renvoi le nombre de clients 
        tableauBordFactory.getClientCount = function() {
            return $http.get('/api/client/get-count');
        };

        // renvoi le nombre de documents
        tableauBordFactory.getDocumentCount = function() {
            return $http.get('/api/document/get-count');
        };

        return tableauBordFactory;

    }]);