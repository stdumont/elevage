angular.module('elevageApp').controller('agendaController', ['$scope', '$route', '$http', '$timeout', '$interval', 'agendaFactory', function($scope, $route, $http, $timeout, $interval, agendaFactory) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    // Variables
    $scope.calendarEvent = null;
    $scope.calendarStart = null;
    $scope.calendarEnd = null;
    $scope.dataEvent = null;
    $scope.modalTitle = null;
    $scope.modalTitleAdd = "Ajouter un événement";
    $scope.modalTitleUpdate = 'Modifier un événement';

    //
    // Gestion du click sur un événement
    //
    $scope.onEventClick = function(event) {
        // console.log('eventClick');
        // console.log(event);
        $scope.calendarEvent = event;
        $scope.calendarStart = event.start;
        $scope.calendarEnd = event.end;
        $scope.modalTitle = $scope.modalTitleUpdate;
        // console.log($scope.calendarEvent);
        // console.log($scope.calendarStart);
        // console.log($scope.calendarEnd);
        // $('#modalTitle').html(event.title);
        // $('#modalBody').html(event.description);
        $('#fullCalendarModal').modal();
    };

    //
    // Gestion du click sur une journée/heure
    //
    $scope.onSelect = function(start, end) {
        $scope.modalTitle = "Ajouter un événement";
        // console.log('select');
        // console.log(start);
        // console.log(end);
        $scope.calendarEvent = null;
        $scope.calendarStart = start;
        $scope.calendarEnd = end;
        // console.log($scope.calendarEvent);
        // console.log($scope.calendarStart);
        // console.log($scope.calendarEnd);
        $('#fullCalendarModal').modal();
    };

    // MAIN
    // $(document).ready(function() {

    $('#agenda').fullCalendar({
        locale: 'fr',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay,listMonth'
        },
        navLinks: true,
        selectable: true,
        eventLimit: true, // permet d'avoir '+plus' si trop d'événement sur une journée
        // clic sur un événement
        eventClick: function(calEvent, jsEvent, view) {
            $scope.onEventClick(calEvent);
        },
        // modification des données avant le rendu
        eventRender: function(event, element) {
            if (event.description) {
                element.qtip({
                    content: event.description
                });
            }
        },
        // clic sur une journée; typiquement pour ajouter un événement
        select: function(start, end, event, view, resource) {
            $scope.onSelect(start, end);
        },
        // source des événement affichés par accès à l'api
        events: '/api/agenda/retrieve',

    });

    // });

}]);