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

  var customMapTypeId = 'custom_style'

  // https://snazzymaps.com/style/38/shades-of-grey
  var shadesOfGrey = new google.maps.StyledMapType([
    {"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}
  ])

  // https://snazzymaps.com/style/151/ultra-light-with-labels
  var ultaLightWithLabels = new google.maps.StyledMapType([
    {"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}
  ])

  // https://snazzymaps.com/style/102/clean-grey
  var cleanGrey = new google.maps.StyledMapType([
    {"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#e3e3e3"}]},{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"color":"#cccccc"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#FFFFFF"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]}
  ])

  var customMapType = new google.maps.StyledMapType([
      // {
      //   stylers: [
      //     {hue: '#890000'},
      //     {visibility: 'simplified'},
      //     {gamma: 0.5},
      //     {weight: 0.5}
      //   ]
      // },
      {
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      // {
      //   featureType: 'water',
      //   stylers: [{color: '#890000'}]
      // }
    ], {
      name: 'Custom Style'
  })

  var map = new google.maps.Map(document.getElementById('map'), {
    center: criteria.city.geometry.location,
    zoom: 13,
    streetViewControl: false,
    mapTypeControl: false,
    // mapTypeControlOptions: {
    //   mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    // }
  })

  map.mapTypes.set(customMapTypeId, cleanGrey)
  map.setMapTypeId(customMapTypeId)

  var infowindow = new google.maps.InfoWindow()

  _.each(tweets, function(term) {
    _.each(term.tweets, function(tweet) {
      if(tweet.geo) {
        var marker = new google.maps.Marker({
          map: map,
          position: {
            lat: tweet.geo.coordinates[0],
            lng: tweet.geo.coordinates[1]
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5,
            fillOpacity: 0.5,
            fillColor: term.colour || '#000',
            strokeOpacity: 0
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

})
