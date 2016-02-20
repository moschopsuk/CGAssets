var app = angular.module('CGApp', ['ngAnimate', 'socket-io', 'angular-momentjs', 'angular-marquee']);


app.controller('CGCtrl', ['$scope', '$log', '$location',
    function($scope, $log, $location){
        $log.info("LA1TV CG Page Started");

    }
]);
