angular.module('starter.controllers', [])


.controller('HomeCtrl', function($scope, $cordovaDeviceMotion, $firebaseArray) {
    var ref = new Firebase("https://helloworld395.firebaseio.com");
    ref.remove();
    $scope.data = $firebaseArray(ref);
    $scope.output = "Loading...";
    $scope.ready = false;
    $scope.threshold = 7;
    $scope.coords = {};
    // watch Acceleration
    var options = {
        frequency: 100
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
                $scope.ready = true;
                var timeStamp = result.timestamp;
                var coords = {
                    x: result.x,
                    y: result.y,
                    z: result.z
                };
                $scope.coords = coords;
                $scope.data.$add(result);
                if (coords.z > $scope.threshold) {
                    $scope.output = "Hello";
                } else {
                    $scope.output = "World";
                }

            });

    }, false);

    $scope.changedThreshold = function(threshold){
        $scope.threshold = threshold;
    }

});