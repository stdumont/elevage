angular.module('elevageApp').controller('agendaController', ['$scope', '$route', '$http', '$timeout', '$interval', 'agendaFactory', function($scope, $route, $http, $timeout, $interval, agendaFactory) {

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
            },
            editable: true,
            droppable: true,
            selectable: true,
            selectHelper: true,
            eventLimit: true,
            select: function(start, end, event, view, resource) {
                console.log('select');
                console.log(start);
                console.log(end);
                console.log(event);
                console.log(view);
                console.log(resource);
            },
            eventDrop: function(event, delta, revertFunc) {
                console.log('eventDrop');
                console.log(event);
                console.log(delta);
                console.log(revertFunc);
            },
            eventClick: function(calEvent, jsEvent, view) {
                console.log('eventClick');
                console.log(calEvent);
                console.log(jsEvent);
                console.log(view);
            },
            events: [{
                    id: 1,
                    title: 'Event1',
                    start: '2018-04-04'
                },
                {
                    id: 2,
                    title: 'Event2',
                    start: '2018-05-05'
                }
                // etc...
            ],
            color: 'yellow', // an option!
            textColor: 'black' // an option!

        });

    });

}]);