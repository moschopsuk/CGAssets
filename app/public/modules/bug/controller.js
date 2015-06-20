app.controller('bugCtrl', ['$scope', '$log', 'socket', 'localStorageService',
    function($scope, $log, socket, localStorageService){

    	var stored = localStorageService.get('bug');

        if(stored === null) {
            $scope.bug = {};
        } else {
            $scope.bug = stored;
        }

         $scope.$watch('bug', function() {
            socket.emit("bug", $scope.bug);

            $log.info($scope.bug);
        }, true);

        $scope.$on("$destroy", function() {
            localStorageService.set('bug', $scope.bug);
        });      
   	}
]);