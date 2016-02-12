app.controller('crawlerCtrl', ['$scope', '$log', 'socket', 'localStorageService',
    function($scope, $log, socket, localStorageService){

        var stored = localStorageService.get('crawler');

        if(stored === null) {
            $scope.crawlerItems = [];
        } else {
            $scope.crawlerItems = stored;
        }

        $scope.$on("$destroy", function() {
            localStorageService.set('crawlerItems', $scope.crawlerItems);
        });

        $scope.add = function(item) {
            item.enabled = true;

            $scope.crawlerItems.push(jQuery.extend({}, item));

            $scope.crawlerItemForm.$setPristine();
            $scope.newText = {};
        };

        $scope.enabled = function(index, newState){
            $scope.crawlerItems[index].enabled = newState;
            $log.info("Enabling");
        };

        $scope.show = function() {
          allText = "";
          console.log($scope.crawlerItems[0]);

          for (var iItem = 0; iItem < $scope.crawlerItems.length; iItem++) {
            if ($scope.crawlerItems[iItem].enabled) {
              allText += '   ' + $scope.crawlerItems[iItem].text;
            }
          }

          var payload = { "text": allText};
          socket.emit('crawler', payload);

          $scope.currentText = allText;

          $log.info("crawler.show()");
          $log.info(payload);
        };

        $scope.hide = function() {
            socket.emit('crawler', 'hide');

            $log.info("crawler.hide()");
        };
    }
]);
