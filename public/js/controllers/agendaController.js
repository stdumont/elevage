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
    $scope.addProcessing = false;
    $scope.evenementFormError = false;
    $scope.evenementFormErrorMessage = '';
    //--------------------------------------------------------------------------

    // Click sur le bouton ajouter
    $scope.beginAdd = function() {
        $scope.evenementFormError = false;
        $scope.evenementFormErrorMessage = '';
        $scope.initNewEvent();
        $("#agendaDiv").removeClass("col-md-10").addClass("col-md-7");
        $scope.addProcessing = true;
    };

    // Click sur le bouton 'Annuler' du formulaire d'ajout
    $scope.onClickCancel = function() {
        $("#agendaDiv").removeClass("col-md-7").addClass("col-md-10");
        $scope.addProcessing = false;
    };

    // Click sur le bouton 'Sauvegarder' du formulaire d'ajout
    $scope.onClickSave = function() {
        // si ok on relit les événements
        if ($scope.isValid()) {
            $scope.newData = {
                title: $scope.newEvent.title,
                description: $scope.newEvent.description,
                addDay: 0,
                start: null,
                end: null,
                generated: 0,
                editable: 0,
                color: $scope.newEvent.color,
            };
            var dateStart = $scope.newEvent.start;
            $scope.newData.start = moment(dateStart, 'DD-MM-YYYY').format('YYYY-MM-DD');
            $scope.newData.allDay = 1;
            if ($scope.newEvent.startTime && $scope.newEvent.startTime.length > 0) {
                dateStart = dateStart + ' ' + $scope.newEvent.startTime + ':00';
                $scope.newData.start = moment(dateStart, 'DD-MM-YYYY H:mm:ss').format('YYYY-MM-DD H:mm:ss');
                $scope.newData.allDay = 0;
            };
            if ($scope.newEvent.end && $scope.newEvent.end.length > 0) {
                var dateEnd = $scope.newEvent.end;
                $scope.newData.end = moment(dateEnd, 'DD-MM-YYYY').format('YYYY-MM-DD');
                if ($scope.newEvent.endTime && $scope.newEvent.endTime.length > 0) {
                    dateEnd = dateEnd + ' ' + $scope.newEvent.endTime + ':00';
                    $scope.newData.end = moment(dateEnd, 'DD-MM-YYYY H:mm:ss').format('YYYY-MM-DD H:mm:ss');
                };
            };
            agendaFactory.insert($scope.newData)
                .success(function() {
                    $('#agenda').fullCalendar("refetchEvents");
                })
                .error(function(err) {
                    showMessageInfo("Erreur", "La création n'a pas fonctionné correctement.");
                });

            $("#agendaDiv").removeClass("col-md-7").addClass("col-md-10");
            $scope.addProcessing = false;

        };
    };

    // Contrôle des données du formulaire
    $scope.isValid = function() {
        $scope.evenementFormError = false;
        $scope.evenementFormErrorMessage = '';

        // Le titre doit être rempli
        if (!$scope.newEvent.title) {
            $scope.evenementFormError = true;
            $scope.evenementFormErrorMessage = 'Le titre doit être rempli';
            return false;
        };

        // La date début doit être remplie
        if ($scope.newEvent.start.length == 0) {
            $scope.evenementFormError = true;
            $scope.evenementFormErrorMessage = 'La date début doit être remplie';
            return false;
        };
        return true;
    };

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
    // Initialisation de l'agenda
    //
    $scope.initAgenda = function() {
        $('#agenda').fullCalendar({
            locale: 'fr',
            timeFormat: 'H:mm',
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
            // source des événement affichés par accès à l'api
            events: '/api/agenda/retrieve',

        });

    };

    //
    // Crée un nouvel événement
    //
    $scope.initNewEvent = function() {
        $scope.newEvent = {
            title: null,
            description: null,
            addDay: false,
            start: moment().format('DD-MM-YYYY'),
            startTime: null,
            end: null,
            endTime: null,
            generated: 0,
            editable: 0,
            color: '#004080'
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