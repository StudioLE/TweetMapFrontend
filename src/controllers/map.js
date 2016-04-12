'use strict'

angular.module('app.map', ['ngRoute'])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'views/map.html',
    controller: 'MapCtrl'
  })
}])

/*****************************************************************
*
* MapCtrl controlller
*
******************************************************************/
.controller('MapCtrl', function($scope, $http, Criteria, Tweet, Calc) {

  /**
   * Get data from local storage
   */
  var criteria = Criteria.get()
  var tweets = Tweet.get()

  $scope.criteria = function() {
    return criteria
  }
  $scope.tweets = function() {
    return tweets
  }

  var map = new google.maps.Map(document.getElementById('map'), {
    center: criteria.city.geometry.location,
    zoom: 13
  })

  var infowindow = new google.maps.InfoWindow()

  _.each(tweets, function(tweet) {
    if(tweet.geo) {
      var marker = new google.maps.Marker({
        map: map,
        position: {
          lat: tweet.geo.coordinates[0],
          lng: tweet.geo.coordinates[1]
        }
      })

      google.maps.event.addListener(marker, 'click', function() {
        var self = this
        $http({
          method: 'GET',
          url: 'http://localhost:4730/embed/' + tweet.id_str
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          // console.log(response)
          infowindow.setContent(response.data.html)
          infowindow.open(map, self)
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.error(response)
        })
      })
    }
  })

})
