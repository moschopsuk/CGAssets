app.controller('lowerthirdsCtrl', ['$scope', '$log', 'socket', 'localStorageService',
    function($scope, $log, socket, localStorageService){

        var stored = localStorageService.get('lowerthirds');

        if(stored === null) {
            $scope.queuedThirds = [];
        } else {
            $scope.queuedThirds = stored;
        }

        $scope.$on("$destroy", function() {
            localStorageService.set('lowerthirds', $scope.queuedThirds);
        });

        $scope.add = function(item) {
            $scope.queuedThirds.push(item);

            $scope.lowerThirdsForm.$setPristine();
            $scope.lowerThird = {};
        };

        $scope.remove = function(index){
            $scope.queuedThirds.splice(index, 1);
        };

        $scope.show = function(side, data) {
            var payload = { "side": side, "data": data };
            socket.emit('lowerthird', payload);

            $log.info("lowerthirds.show()");
            $log.info(payload);
        };

        $scope.hide = function() {
            socket.emit('lowerthird', 'hide');

            $log.info("lowerthirds.hide()");
        };
    }
]);
