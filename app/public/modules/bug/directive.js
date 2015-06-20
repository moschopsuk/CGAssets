app.directive('bug', ['$log', '$timeout', 'socket', 
    function ($log, $timeout, socket) {
        return {
            templateUrl: "/modules/bug/cg.html",
            replace: true,
            scope: {
                animation: '=',
            },
            link: function ($scope, element, attrs) {
                //Apply the animation and position class
                //element.addClass(attrs.animation);

                socket.on("bug", function (payload) {
                    $scope.bug = payload;
                });

                var tick = function () {
                    $scope.clock = Date.now() // get the current time
                    $timeout(tick, $scope.tickInterval); // reset the timer
                }

                // Start the timer
                $timeout(tick, $scope.tickInterval);
            }
        };
    }
]);