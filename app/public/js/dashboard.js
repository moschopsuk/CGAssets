var app = angular.module('DashboardApp', ['ngRoute']);

app.controller('DashCtrl', ['$scope', '$log', '$location',
    function($scope, $log, $location){
    	$log.info("LA1TV CG Dashboard Started");
    }
]);