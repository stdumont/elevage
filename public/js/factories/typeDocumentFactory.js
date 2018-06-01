angular.module('intranetApp')
    .factory('typeDocumentFactory', ['$http', function($http) {

    var urlBase = '/api/typedoc/';
    var typeDocumentFactory = {};

    // renvoi de tous les types de documents triés par nom
    typeDocumentFactory.list = function () {
        return $http.get(urlBase + 'get-all');
    };

    // renvoi d'un type de document sur base de son id
    typeDocumentFactory.find = function (id) {
        return $http.get(urlBase + 'find' + '/' + id);
    };

    // insère un type de document
    typeDocumentFactory.insert = function (typedoc) {
        return $http.post(urlBase + 'insert', typedoc);
    };

    // met à jour un type de document
    typeDocumentFactory.update = function (typedoc) {
        return $http.post(urlBase + 'update', typedoc);
    };

    // supprime un type de document
    typeDocumentFactory.delete = function (id) {
        return $http.delete(urlBase + 'delete' + '/' + id);
    };
        
    return typeDocumentFactory;
    
}]);

