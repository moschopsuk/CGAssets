var app = angular.module('DashboardApp', ['ngRoute', 'socket-io', 'ngAnimate', 'LocalStorageModule', 'angularify.semantic']);

app.controller('DashCtrl', ['$scope', '$log', '$location',
    function($scope, $log, $location){
        $log.info("LA1TV CG Dashboard Started");

        $scope.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };

        $scope.menu = [
            {
                name:   'Lower Thirds',
                icon:   'list layout',
                url:    '/lowerthirds',
            },
            {
                name:   'Grid',
                icon:   'grid layout',
                url:    '/grid',
            },
            {
                name:   'Bug',
                icon:   'bug',
                url:    '/bug',
            },
        ];
    }
]);


app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when("/lowerthirds", {
                templateUrl: '/modules/lowerthirds/admin.html',
                controller: 'lowerthirdsCtrl'
            })
            .when("/grid", {
                templateUrl: '/modules/grid/admin.html',
                controller: 'gridCtrl'
            })
            .when("/bug", {
                templateUrl: '/modules/bug/admin.html',
                controller: 'bugCtrl'
            })
        .otherwise({redirectTo: '/lowerthirds'});
    }
]);