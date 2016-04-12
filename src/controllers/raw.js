'use strict'

angular.module('app.raw', ['ngRoute', 'jsonFormatter'])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/raw', {
    templateUrl: 'views/raw.html',
    controller: 'RawCtrl'
  })
}])

/*****************************************************************
*
* RawCtrl controlller
*
******************************************************************/
.controller('RawCtrl', function($scope, Criteria, Place, Tweet) {

  /**
   * Get data from local storage
   */
  var criteria = Criteria.get()
  var places = Place.get()
  var tweets = Tweet.get()

  $scope.criteria = function() {
    return criteria
  }
  $scope.places = function() {
    return places
  }
  $scope.tweets = function() {
    return tweets
  }

  $scope.clearCriteria = function() {
    return Criteria.unset()
  }

  $scope.clearPlace = function() {
    return Place.unset()
  }

  $scope.clearTweet = function() {
    return Tweet.unset()
  }


})
