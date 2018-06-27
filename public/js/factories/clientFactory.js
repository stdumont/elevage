angular.module('elevageApp')
    .factory('clientFactory', ['$http', function($http) {

        var urlBase = '/api/client/';
        var clientFactory = {};

        // renvoi de tous les clients triés par nom
        clientFactory.list = function() {
            return $http.get(urlBase + 'get-all');
        };

        // renvoi de clients triés par nom sur base de critères de recherche standard
        clientFactory.getBySearchStandard = function(nom, prenom, tel, email, codePostal, localite, pays) {
            return $http.get(urlBase + 'get-search-standard', {
                params: {
                    nom: nom,
                    prenom: prenom,
                    tel: tel,
                    email: email,
                    codePostal: codePostal,
                    localite: localite,
                    pays: pays
                }
            });
        };

        // renvoi de clients triés par nom sur base du critères de recherche par chien
        clientFactory.getBySearchByDog = function(proprietaire) {
            return $http.get(urlBase + 'get-search-by-dog', {
                params: {
                    proprietaire: proprietaire
                }
            });
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