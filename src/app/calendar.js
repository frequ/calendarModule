angular.module('SteroidsApp')
.directive('calendar', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/calendarTmpl.html',
        scope: {
            selected: '=',
            days: '=',
            events: '='
        },

        link: function(scope) {

            scope.selected = removeTime(scope.selected || moment());
            scope.month = scope.selected.clone();

            var start = scope.selected.clone();
            start.date(0);
            removeTime(start.day(0));
            buildMonth(scope, start, scope.month, scope.events);


            scope.$watch("events", function(newVal, oldVal) {
                buildMonth(scope, start, scope.month, scope.events);
            });

            //TODO today button
            //TODO maybe implement events in template with badges

            scope.select = function(day) {
                scope.selected = day.date;
            };

            scope.next = function() {
                var next = scope.month.clone();
                removeTime(next.month(next.month()+1).date(0));
                scope.month.month(scope.month.month()+1);
                buildMonth(scope, next, scope.month, scope.events);
            };

            scope.previous = function() {
                var previous = scope.month.clone();
                removeTime(previous.month(previous.month()-1).date(0));
                scope.month.month(scope.month.month()-1);
                buildMonth(scope, previous, scope.month, scope.events);
            };

            function buildMonth(scope, start, month, events) {

                scope.weeks = [];
                var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
                while (!done) {
                    scope.weeks.push({ days: buildWeek(date.clone(), month, events) });
                    date.add(1, "w");
                    done = count++ > 2 && monthIndex !== date.month();
                    monthIndex = date.month();
                }
            }

            function hasEvents(date, events) {

                if( events && events.length > 0 ) {
                    for(var i = 0; i < events.length; i++) {
                        if (date.isSame(events[i].date, "day")) {
                            return events[i].type;
                        }
                    }
                }
                return false;
            }

            function buildWeek(date, month, events) {

                var days = [];
                for (var i = 0; i < 7; i++) {

                    days.push({
                        name: date.format("dd").substring(0, 1),
                        number: date.date(),
                        isCurrentMonth: date.month() === month.month(),
                        isToday: date.isSame(new Date(), "day"),
                        hasEvents: hasEvents(date, events),
                        date: date
                    });
                    date = date.clone();
                    date.add(1, "d");
                }
                return days;
            }

            function removeTime(date) {
                return date.day(1).hour(0).minute(0).second(0).millisecond(0);
            }


        }
    };
});
