angular.module('SteroidsApp', [
    'supersonic'
])

.controller('AppCtrl', function($scope){

    $scope.events = [];
    $scope.days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    $scope.day = moment();

    // supersonic.data.model('events').findAll().then(function(events) {
    //     console.log(events);
    // });

});
