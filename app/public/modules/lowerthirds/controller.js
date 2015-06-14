app.controller('lowerthirdsCtrl', ['$scope',
    function($scope){

 		$scope.queuedThirds = [];

        $scope.add = function(item) {
            $scope.queuedThirds.push(item);

            $scope.lowerThirdsForm.$setPristine();
            $scope.lowerThird = {};
        };

        $scope.remove = function(index){
            $scope.queuedThirds.splice(index, 1);
        };

        $scope.show = function(side, item) {
        };

        $scope.hide = function() {
        };
    }
]);