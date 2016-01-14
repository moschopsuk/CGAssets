app.controller('twitterCtrl', ['$scope', '$log', 'socket', 'localStorageService',
    function($scope, $log, socket, localStorageService){

        var stored = localStorageService.get('tweets');

        if(stored === null) {
            $scope.queuedTweets = [];
        } else {
            $scope.queuedTweets = stored;
        }

        $scope.$on("$destroy", function() {
            localStorageService.set('tweets', $scope.queuedTweets);
        });

        $scope.add = function(item) {
            $scope.queuedTweets.push(item);

            $scope.tweetForm.$setPristine();
            $scope.tweet = {};
        };

        $scope.remove = function(index){
            $scope.queuedTweets.splice(index, 1);
        };

        $scope.show = function(data) {
            var payload = { "side": 'left' ,"data": data };
            socket.emit('tweet', payload);

            $log.info("tweet.show()");
            $log.info(payload);
        };

        $scope.hide = function() {
            socket.emit('tweet', 'hide');

            $log.info("tweet.hide()");
        };
    }
]);
