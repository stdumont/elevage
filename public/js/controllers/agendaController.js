angular.module('elevageApp').controller('agendaController', ['$scope', '$route', '$http', 'agendaFactory', '$sce', function($scope, $route, $http, agendaFactory, $sce) {

    // Mettre à jour le menu de navigation avec le lien courant.
    refreshCurrentLink($route.current.activeTab);

    //--------------------------------------------------------------------------
    // Variables
    //--------------------------------------------------------------------------
    $scope.calendarEvent;
    $scope.calendarStart;
    $scope.calendarEnd;
    $scope.dataEvent;
    $scope.titleAdd = "Ajouter un événement";
    $scope.newEvent = null;
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    // Evènements de la couche UI
    //--------------------------------------------------------------------------
    //
    // Gestion du click sur un événement
    //
    $scope.onEventClick = function(event) {
        // console.log('eventClick');
        // console.log(event);
        $scope.calendarEvent = event;
        $scope.calendarStart = event.start;
        $scope.calendarEnd = event.end;
        // $scope.modalTitle = $scope.modalTitleUpdate;
        // console.log($scope.calendarEvent);
        // console.log($scope.calendarStart);
        // console.log($scope.calendarEnd);
        // $('#modalTitle').html(event.title);
        // $('#modalBody').html(event.description);
        if ($scope.calendarEvent.generated) {
            $scope.action = "View";
        } else {
            $scope.action = "Update";
        };
        // $('#fullCalendarModal').modal();
    };

    //
    // Gestion du click sur une journée/heure
    //
    $scope.onSelect = function(start, end) {
        console.log('select');
        // console.log(start);
        // console.log(end);
        $scope.calendarEvent = null;
        $scope.calendarStart = start;
        $scope.calendarEnd = end;
        // console.log($scope.calendarEvent);
        // console.log($scope.calendarStart);
        // console.log($scope.calendarEnd);
        $scope.action = "Add";
        // $('#fullCalendarModal').modal();
    };

    //
    // Initialisation de l'agenda
    //
    $scope.initAgenda = function() {
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

    };

    //
    // Crée un nouvel événement
    //
    $scope.initNewEvent = function() {
        $scope.newEvent = {
            id: null,
            title: '',
            description: null,
            addDay: true,
            start: moment().format('DD-MM-YYYY'),
            end: null,
            generated: 0,
            editable: 0,
            color: null
        };
        //     $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        //         checkboxClass: 'icheckbox_minimal-blue',
        //         radioClass: 'iradio_minimal-blue'
        //     });
    };

    //--------------------------------------------------------------------------    


    //--------------------------------------------------------------------------
    // MAIN
    //--------------------------------------------------------------------------
    $scope.initAgenda();
    $scope.initNewEvent();

    //--------------------------------------------------------------------------



}]);