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
                right: 'month,basicWeek,basicDay,listMonth'
            },
            navLinks: true,
            selectable: true,
            eventLimit: true,
            eventClick: function(calEvent, jsEvent, view) {
                console.log('eventClick');
                console.log(calEvent);
                console.log(jsEvent);
                console.log(view);
            },
            eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) {
                console.log('eventDrop');
                console.log(event);
                console.log(delta);
                console.log(delta._days);
                console.log(revertFunc);
                console.log(jsEvent);
                console.log(ui);
                console.log(view);
            },
            eventRender: function(event, element) {
                element.qtip({
                    content: event.description
                });
            },
            eventResize: function(event, delta, revertFunc, jsEvent, ui, view) {
                console.log('eventResize');
                console.log(event);
                console.log(delta);
                console.log(revertFunc);
                console.log(jsEvent);
                console.log(ui);
                console.log(view);
            },
            select: function(start, end, event, view, resource) {
                console.log('select');
                console.log(start);
                console.log(end);
                console.log(event);
                console.log(view);
                console.log(resource);
            },
            events: '/api/agenda/retrieve',

        });

    });

}]);