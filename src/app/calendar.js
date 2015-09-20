angular.module('SteroidsApp')
.directive('calendar', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/calendarTmpl.html',
        scope: {
            selected: '=',
            days: '='
        },

        link: function(scope) {

            scope.selected = removeTime(scope.selected || moment());
            scope.month = scope.selected.clone();

            var start = scope.selected.clone();
            start.date(1);
            removeTime(start.day(0));

            buildMonth(scope, start, scope.month);

            //TODO events class
            //TODO today button


            scope.select = function(day) {
                scope.selected = day.date;
                console.log(scope.selected);
            };

            scope.next = function() {
                var next = scope.month.clone();
                removeTime(next.month(next.month()+1).date(1));
                scope.month.month(scope.month.month()+1);
                buildMonth(scope, next, scope.month);
            };

            scope.previous = function() {
                var previous = scope.month.clone();
                removeTime(previous.month(previous.month()-1).date(1));
                scope.month.month(scope.month.month()-1);
                buildMonth(scope, previous, scope.month);
            };

            function buildMonth(scope, start, month) {
                scope.weeks = [];
                var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
                while (!done) {
                    scope.weeks.push({ days: buildWeek(date.clone(), month) });
                    date.add(1, "w");
                    done = count++ > 2 && monthIndex !== date.month();
                    monthIndex = date.month();
                }
            }

            function buildWeek(date, month) {
                var days = [];
                for (var i = 0; i < 7; i++) {
                    days.push({
                        name: date.format("dd").substring(0, 1),
                        number: date.date(),
                        isCurrentMonth: date.month() === month.month(),
                        isToday: date.isSame(new Date(), "day"),
                        date: date
                    });
                    date = date.clone();
                    date.add(1, "d");
                }
                return days;
            }

            function removeTime(date) {
                return date.day(0).hour(0).minute(0).second(0).millisecond(0);
            }


        }
    };
});
