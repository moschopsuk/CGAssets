app.directive('grid', ['$log', '$timeout', 'socket', 
    function ($log, $timeout, socket) {
        return {
            templateUrl: "/modules/grid/cg.html",
            replace: true,
            scope: {
                animation: '=',
            },
            link: function ($scope, element, attrs) {
                //Apply the animation and position class
                //element.addClass(attrs.animation);

                socket.on("grid", function (payload) {

                    if (payload === "hide") {
                        //We first remove every element with a delay
                        $scope.grid = {};
                        $scope.show = false;
                    } else {
                        $scope.show = true;
                        $scope.grid = payload;
                    }          
                });
            }
        };
    }
]);