app.directive('bug', ['$log', '$timeout', '$moment', 'socket', 
    function ($log, $timeout, $moment, socket) {
        return {
            templateUrl: "/modules/bug/cg.html",
            replace: true,
            scope: {
                animation: '=',
            },
            link: function ($scope, element, attrs) {
                //Apply the animation and position class
                //element.addClass(attrs.animation);
                $scope.tickInterval = 1000;

                socket.on("bug", function (payload) {
                    $scope.bug = payload;
                });

                var tick = function () {
                    $scope.clock = Date.now() // get the current time
                    $timeout(tick, $scope.tickInterval); // reset the timer
                }

                // Start the timer
                $timeout(tick, $scope.tickInterval);


                /*
                 *   BailriggFM CountDown
                 */
                var countdown = function () {
                    var end         = $moment.unix(1435046400);
                    var now         = $moment();
                    var totalSec    = Math.abs(end.diff(now, 'seconds'));



                    var hours = parseInt( totalSec / 3600 ) % 24;
                    var minutes = parseInt( totalSec / 60 ) % 60;
                    var seconds = totalSec % 60;

                    $scope.countdown = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);                   

                    $timeout(countdown, $scope.tickInterval);
                };

                $timeout(countdown, $scope.tickInterval);
            }
        };
    }
]);