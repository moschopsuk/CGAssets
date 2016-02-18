app.directive('lowerThirds', ['$log', 'socket',
    function ($log, socket) {
        return {
            templateUrl: "/modules/lowerthirds/cg.html",
            replace: true,
            scope: {
                side: '=',
                animation: '=',
            },
            link: function ($scope, element, attrs) {
                //Apply the animation and position class
                element.addClass(attrs.side);
                element.addClass(attrs.animation);


                socket.on("lowerthird", function (payload) {

                    if (payload === "hide") {
                        //payload is to hide the lower third
                        $scope.show = false;
                        $log.info("Hiding Lower Thirds");
                    } else {
                        //Check that we only show LT on the selected side
                        if(payload.side == attrs.side) {
                            $scope.heading = payload.data.heading;
                            $scope.subHeading = payload.data.subHeading;
                            $scope.show = true;
                            $log.info("Showing Lower Thirds");
                        }
                    }

                });
            }
        };
    }
]);
