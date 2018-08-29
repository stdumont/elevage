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
            criteriaReproducteur,
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
            criteriaPere,
            criteriaMere,
            criteriaNomClient
        ) {
            return $http.get(urlBase + 'get-by-criteria', {
                params: {
                    nom: criteriaNom,
                    affixe: criteriaAffixe,
                    race: criteriaRace,
                    robe: criteriaRobe,
                    sexe: criteriaSexe,
                    reproducteur: criteriaReproducteur,
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
                    pere: criteriaPere,
                    mere: criteriaMere,
                    nomClient: criteriaNomClient
                }
            });
        };

        // renvoi la liste des enfants
        chienFactory.getEnfants = function(id) {
            return $http.get(urlBase + 'get-enfants', {
                params: {
                    id: id
                }
            });
        };

        // renvoi la liste des pères
        chienFactory.getPeres = function(exceptId) {
            return $http.get(urlBase + 'get-peres', {
                params: {
                    exceptId: exceptId
                }
            });
        };

        // renvoi la liste des mères
        chienFactory.getMeres = function(exceptId) {
            return $http.get(urlBase + 'get-meres', {
                params: {
                    exceptId: exceptId
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

        // insère ou met à jour un chien
        chienFactory.save = function(chien) {
            var params = {
                id: chien.id,
                nom: chien.nom,
                affixe: chien.affixe,
                sexe: chien.sexe,
                race_id: chien.race_id,
                robe_id: chien.robe_id,
                date_naissance: chien.date_naissance,
                date_deces: chien.date_deces,
                pere_id: chien.pere_id,
                mere_id: chien.mere_id,
                puce: chien.puce,
                passeport: chien.passeport,
                pedigree: chien.pedigree,
                tatouage: chien.tatouage,
                client_id: chien.client_id,
                portee_id: chien.portee_id,
                chiot_id: chien.chiot_id,
                present: chien.present,
                produit: chien.produit,
                reproducteur: chien.reproducteur,
                remarques: chien.remarques
            };
            return $http.post(urlBase + 'save', params);
        };

        // supprime une chien
        chienFactory.delete = function(id) {
            return $http.delete(urlBase + 'delete' + '/' + id);
        };

        return chienFactory;

    }]);