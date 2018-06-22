angular.module('elevageApp')
    .factory('agendaFactory', ['$http', function($http) {

        var urlBase = '/api/agenda/';
        var agendaFactory = {};

        // insère un événement de l'agenda
        agendaFactory.insert = function(evenement) {
            return $http.post(urlBase + 'insert', evenement);
        };

        // met à jour un événement de l'agenda
        agendaFactory.update = function(evenement) {
            return $http.post(urlBase + 'update', evenement);
        };

        // supprime un événement de l'agenda
        agendaFactory.delete = function(id) {
            return $http.delete(urlBase + 'delete' + '/' + id);
        };


        return agendaFactory;

    }]);