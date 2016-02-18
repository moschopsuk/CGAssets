var app = angular.module('CGApp', ['ngAnimate', 'socket-io', 'angular-momentjs']);


app.controller('CGCtrl', ['$scope', '$log', '$location',
    function($scope, $log, $location){
        $log.info("LA1TV CG Page Started");

    }
]);
