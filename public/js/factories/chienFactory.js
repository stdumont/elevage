angular.module('elevageApp')
    .factory('chienFactory', ['$http', function($http) {

        var urlBase = '/api/chien/';
        var chienFactory = {};

        // recherche des chiens sur base de critères
        chienFactory.getByCriteria = function(
            criteriaNom,
            criteriaAffixe,
            criteriaRace,
            criteriaRobe,
            criteriaSexe,
            criteriaPresent,
            criteriaProduit,
            criteriaVivant,
            criteriaNaissanceDu,
            criteriaNaissanceAu,
            criteriaDecesDu,
            criteriaDecesAu,
            criteriaPasseport,
            criteriaPuce,
            criteriaTatouage,
            criteriaParentsDe,
            criteriaEnfantsDeM,
            criteriaEnfantsDeF,
            criteriaNomClient
        ) {
            return $http.get(urlBase + 'get-by-criteria', {
                params: {
                    nom: criteriaNom,
                    affixe: criteriaAffixe,
                    race: criteriaRace,
                    robe: criteriaRobe,
                    sexe: criteriaSexe,
                    present: criteriaPresent,
                    produit: criteriaProduit,
                    vivant: criteriaVivant,
                    naissanceDu: criteriaNaissanceDu,
                    naissanceAu: criteriaNaissanceAu,
                    decesDu: criteriaDecesDu,
                    decesAu: criteriaDecesAu,
                    passeport: criteriaPasseport,
                    puce: criteriaPuce,
                    tatouage: criteriaTatouage,
                    parentsDe: criteriaParentsDe,
                    enfantsDeM: criteriaEnfantsDeM,
                    enfantsDeF: criteriaEnfantsDeF,
                    nomClient: criteriaNomClient
                }
            });
        };

        // renvoi le nombre de chiens
        chienFactory.count = function() {
            return $http.get(urlBase + 'get-count');
        };

        // renvoi le nombre de chiens pour une race
        chienFactory.countByRace = function(race_id) {
            return $http.get(urlBase + 'get-count-by-race' + '/' + race_id);
        };

        // renvoi le nombre de chiens pour une robe
        chienFactory.countByRobe = function(robe_id) {
            return $http.get(urlBase + 'get-count-by-robe' + '/' + robe_id);
        };

        // renvoi le nombre de chiens pour un client
        chienFactory.countByClient = function(client_id) {
            return $http.get(urlBase + 'get-count-by-client' + '/' + client_id);
        };

        // renvoi d'un chien sur base de son id
        chienFactory.find = function(id) {
            return $http.get(urlBase + 'find' + '/' + id);
        };

        // insère une chien
        chienFactory.insert = function(chien) {
            return $http.post(urlBase + 'insert', chien);
        };

        // met à jour une chien
        chienFactory.update = function(chien) {
            return $http.post(urlBase + 'update', chien);
        };

        // supprime une chien
        chienFactory.delete = function(id) {
            return $http.delete(urlBase + 'delete' + '/' + id);
        };

        return chienFactory;

    }]);