app.controller('crawlerCtrl', ['$scope', '$log', '$resource', 'socket', 'localStorageService',
    function($scope, $log, $resource, socket, localStorageService){

        var stored = localStorageService.get('crawlerItems');
        $scope.crawlerActive = false;

        if(stored === null) {
            $scope.crawlerItems = [];
        } else {
            $scope.crawlerItems = stored;
        }

        $scope.$on("$destroy", function() {
            localStorageService.set('crawlerItems', $scope.crawlerItems);
        });

        var keySecret = btoa('');
        var twitterAuth = $resource('https://api.twitter.com/oauth2/token', null, {
          getBearer: {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + keySecret,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }
        })

        var twitter = '';

        twitterAuth.getBearer("grant_type=client_credentials").$promise.then(function(data) {
          $log.info(data);
          twitter = $resource('https://api.twitter.com/1.1/search/tweets.json', null, {
            getTweets: {
                  method: 'GET',
                  params: {result_type: 'recent'},
                  headers: {
                      'Authorization': 'Bearer ' + data.access_token,
                      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                  }
              }
          });
        });

        $scope.startFetch = function() {
          $scope.fetchTweets = true;
          $scope.tweetInterval = setInterval( function() {
            twitter.getTweets({q: $scope.tweetText}).$promise.then(function(data) {
              $log.info(data);
              $scope.tweets = data.statuses;
            });
          }, 10*1000);
        }

        $scope.stopFetch = function() {
          $scope.fetchTweets = false;
          clearInterval($scope.tweetInterval);
        }

        $scope.tweets = [];

        $scope.add = function(item) {
            item.enabled = true;

            $scope.crawlerItems.push(jQuery.extend({}, item));

            $scope.crawlerItemForm.$setPristine();
            $scope.newText = {};
        };

        $scope.addTweet = function(tweet) {
          item = {
            enabled: true,
            text: '@' + tweet.user.screen_name + ': ' + tweet.text
          }

          $scope.crawlerItems.push(jQuery.extend({}, item));
        }

        $scope.enabled = function(index, newState){
            $scope.crawlerItems[index].enabled = newState;
            $log.info("Enabling");
        };

        $scope.show = function() {
          allText = "";
          console.log($scope.crawlerItems[0]);

          for (var iItem = 0; iItem < $scope.crawlerItems.length; iItem++) {
            if ($scope.crawlerItems[iItem].enabled) {
              allText += '   ' + $scope.crawlerItems[iItem].text.replace(/(?:\r\n|\r|\n)/g, ' ');
            }
          }

          var payload = { "text": allText};
          socket.emit('crawler', payload);

          $scope.currentText = allText;
          $scope.crawlerActive = true;

          $log.info("crawler.show()");
          $log.info(payload);
        };

        $scope.hide = function() {
            socket.emit('crawler', 'hide');
            $scope.crawlerActive = false;
            $log.info("crawler.hide()");
        };

        $scope.showThird = function(side, item) {
            var data = {
              "heading": item.text
            }
            var payload = { "side": side, data };
            socket.emit('lowerthird', payload);

            $log.info("lowerthirds.show()");
            $log.info(payload);
        };

        $scope.hideThird = function() {
            socket.emit('lowerthird', 'hide');

            $log.info("lowerthirds.hide()");
        };
    }
]);
