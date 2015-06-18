var app = angular.module('DashboardApp', ['ngRoute', 'socket-io', 'ngAnimate']);

app.controller('DashCtrl', ['$scope', '$log', '$location',
    function($scope, $log, $location){
        $log.info("LA1TV CG Dashboard Started");

        $scope.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };

        $scope.menu = [
            {
                name:   'Lower Thirds',
                icon:   'tasks',
                url:    '/lowerthirds',
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
        .otherwise({redirectTo: '/lowerthirds'});

    }
]);