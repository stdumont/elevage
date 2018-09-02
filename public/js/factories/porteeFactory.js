angular.module('elevageApp')
    .factory('porteeFactory', ['$http', function($http) {

        var urlBase = '/api/portee/';
        var porteeFactory = {};

        // recherche des portées sur base de critères
        porteeFactory.getByCriteria = function(
            criteriaPere,
            criteriaMere,
            criteriaNaissanceDu,
            criteriaNaissanceAu
        ) {
            return $http.get(urlBase + 'get-by-criteria', {
                params: {
                    pere: criteriaPere,
                    mere: criteriaMere,
                    naissanceDu: criteriaNaissanceDu,
                    naissanceAu: criteriaNaissanceAu
                }
            });
        };

        return porteeFactory;

    }]);