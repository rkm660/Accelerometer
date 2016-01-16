angular.module('starter.controllers', [])


.controller('HomeCtrl', function($scope, $cordovaDeviceMotion, $firebaseArray) {
    var ref = new Firebase("https://helloworld395.firebaseio.com");
    $scope.data = $firebaseArray(ref);

    // watch Acceleration
    var options = {
        frequency: 200
    };

    document.addEventListener("deviceready", function() {
        var watch = $cordovaDeviceMotion.watchAcceleration(options);
        watch.then(
            null,
            function(error) {
                // An error occurred
                console.log(error);
            },
            function(result) {
                var timeStamp = result.timestamp;
                var coords = {
                    x: result.x,
                    y: result.y,
                    z: result.z
                };
                console.log(result)
                $scope.data.$add(result);
                if (coords.z > 7){
                  $scope.output = "Hello";
                }
                else{
                  $scope.output = "World";
                }
            });

    }, false);


});