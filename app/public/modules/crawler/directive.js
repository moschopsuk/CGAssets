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
                element.addClass(attrs.animation);
                $log.info(element);

                socket.on("crawler", function (payload) {

                    if (payload === "hide") {
                        //payload is to hide the lower third
                        $scope.show = false;
                        $log.info("Hiding Crawler");
                    } else {
                          var scrollTime = 15;
                          if (payload.text.length > 15) {
                            scrollTime = payload.text.length*0.2;
                          }

                          element.children().css("animation", "scroll-left " + scrollTime + "s linear infinite");

                          $scope.text = payload.text;
                          $scope.show = true;

                          $log.info("Showing Crawler: " + $scope.text.length);
                    }

                });
            }
        };
    }
]);
