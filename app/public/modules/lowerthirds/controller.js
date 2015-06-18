app.controller('lowerthirdsCtrl', ['$scope', '$log', 'socket',
    function($scope, $log, socket){

        $scope.queuedThirds = [];

        $scope.add = function(item) {
            $scope.queuedThirds.push(item);

            $scope.lowerThirdsForm.$setPristine();
            $scope.lowerThird = {};
        };

        $scope.remove = function(index){
            $scope.queuedThirds.splice(index, 1);
        };

        $scope.show = function(side, data) {
            var payload = { "side": side, data };
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