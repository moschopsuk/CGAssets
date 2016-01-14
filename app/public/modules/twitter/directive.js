app.directive('twitterDisplay', ['$log', 'socket',
    function ($log, socket) {
        return {
            templateUrl: "/modules/twitter/cg.html",
            replace: true,
            scope: {
            //    side: '=',
                animation: '=',
            },
            link: function ($scope, element, attrs) {
                //Apply the animation and position class
              //  element.addClass(attrs.side);
                element.addClass(attrs.animation);

                socket.on("tweet", function (payload) {

                    if (payload === "hide") {
                        //payload is to hide the lower third
                        $scope.show = false;
                        $log.info("Hiding Tweet!");
                    } else {
                        //Check that we only show LT on the selected side

                            $scope.tweet = payload.data.tweet;
                            $scope.user = payload.data.user;
                            $scope.show = true;

                    }

                });
            }
        };
    }
]);
