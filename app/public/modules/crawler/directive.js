app.directive('crawler', ['$log', 'socket',
    function ($log, socket) {
        return {
            templateUrl: "/modules/crawler/cg.html",
            replace: true,
            scope: {
                animation: '=',
            },
            link: function ($scope, element, attrs) {
                //Apply the animation and position class
                //element.addClass(attrs.animation);

                // element.marquee({
                //   duration: 10000,
                //   duplicated: false,
                //   allowCss3Support: false,
                // });

                $scope.show = false;

                socket.on("crawler", function (payload) {

                    if (payload === "hide") {
                        //payload is to hide the lower third
                        $scope.show = false;
                        $log.info("Hiding Crawler");
                    } else {
                          $scope.text = payload.text;
                          $scope.show = true;

                          // element
                          //   .marquee()
                          //   .bind('finished', function() {
                          //     $scope.show = false;
                          //   });
                          $log.info("Showing Crawler: " + $scope.text.length);
                    }

                });
            }
        };
    }
]);
