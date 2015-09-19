angular.module('SteroidsApp', [
    'supersonic',
    'mwl.calendar',
    'ui.bootstrap',
    'ngTouch'
])

.config(function(calendarConfigProvider) {

    calendarConfigProvider.setDateFormats({
        hour: 'HH:mm' // this will configure times on the day view to display in 24 hour format rather than the default of 12 hour
    });

    calendarConfigProvider.setTitleFormats({
        day: 'ddd D MMM' //this will configure the day view title to be shorter
    });

    calendarConfigProvider.setI18nStrings({
        eventsLabel: 'Events', //This will set the events label on the day view
        timeLabel: 'Time' //This will set the time label on the time view
    });

})

.controller('AppCtrl', function(moment){

    moment.locale('en', {
        week : {
            dow : 1 // Monday is the first day of the week
        }
    });

    var calendar = this;

    calendar.calendarView = 'month';
    calendar.calendarDay = new Date();

    //TODO get from backend
    //possible to add endsAt momentObj
    calendar.events = [
        {
            title: 'An event',
            type: 'warning',
            startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
            // draggable: true,
            // resizable: true
        }, {
            title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
            type: 'info',
            startsAt: moment().subtract(1, 'day').toDate(),
            // draggable: true,
            // resizable: true
        }, {
            title: 'This is a really long event title that occurs on every year',
            type: 'important',
            startsAt: moment().startOf('day').add(7, 'hours').toDate(),
            recursOn: 'year',
            // draggable: true,
            // resizable: true
        }
    ];


});
