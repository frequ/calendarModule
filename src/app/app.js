angular.module('SteroidsApp', [
    'supersonic'
])

.controller('AppCtrl', function($scope){

    $scope.events = [];
    $scope.days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    $scope.day = moment();

    supersonic.data.model('events').findAll().then(function(events) {
        $scope.$apply(function() {
            $scope.events = events.toJson();
        });

    });
})

.filter('dateFilter', function() {
    return function(events, selected) {

        var filtered = [];
        for(var i = 0; i < events.length; i++) {
            if( selected.isSame(events[i].date, 'day')) {
                filtered.push(events[i]);
            }
        }
        return filtered;
    };
});
