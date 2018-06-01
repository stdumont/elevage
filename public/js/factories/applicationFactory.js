angular.module('intranetApp')
    .factory('applicationFactory', ['$http', function($http) {

        var urlBase = '/api/parameter/';
        var applicationFactory = {};

        // renvoi du nom de l'application
        applicationFactory.getApplicationName = function() {
            return $http.get(urlBase + 'get-application-name');
        };

        // renvoi de la version de l'application
        applicationFactory.getApplicationVersion = function() {
            return $http.get(urlBase + 'get-application-version');
        };

        // renvoi de l'année de création de l'application
        applicationFactory.getApplicationCreationYear = function() {
            return $http.get(urlBase + 'get-application-creation-year');
        };

        // renvoi du nom du créateur de l'application
        applicationFactory.getApplicationCreatorName = function() {
            return $http.get(urlBase + 'get-application-creator-name');
        };

        // renvoi du mail du créateur de l'application
        applicationFactory.getApplicationCreatorMail = function() {
            return $http.get(urlBase + 'get-application-creator-mail');
        };

        // renvoi de l'utilisateur courant
        applicationFactory.getCurrentUser = function() {
            return $http.get('/get-current-user');
        };

        return applicationFactory;

    }]);