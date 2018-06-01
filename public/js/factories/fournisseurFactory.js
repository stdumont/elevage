angular.module('intranetApp')
    .factory('fournisseurFactory', ['$http', function($http) {

    var urlBase = '/api/fournisseur/';
    var fournisseurFactory = {};

    // renvoi de tous les fournisseurs triés par nom
    fournisseurFactory.list = function () {
        return $http.get(urlBase + 'get-all');
    };

    // renvoi d'un fournisseur sur base de son id
    fournisseurFactory.find = function (id) {
        return $http.get(urlBase + 'find' + '/' + id);
    };

    // insère un fournisseur
    fournisseurFactory.insert = function (fournisseur) {
        return $http.post(urlBase + 'insert', fournisseur);
    };

    // met à jour un fournisseur
    fournisseurFactory.update = function (fournisseur) {
        return $http.post(urlBase + 'update', fournisseur);
    };

    // supprime un fournisseur
    fournisseurFactory.delete = function (id) {
        return $http.delete(urlBase + 'delete' + '/' + id);
    };
        
    return fournisseurFactory;
    
}]);

