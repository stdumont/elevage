angular.module('intranetApp').controller('agendaController', ['$scope', '$route', '$http', '$timeout', '$interval', 'agendaFactory', function($scope, $route, $http, $timeout, $interval, agendaFactory) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    // MAIN
    $(document).ready(function() {

        $('#agenda').fullCalendar({
            locale: 'fr',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,list'
            }
        });

    });

}]);