'use strict'

angular.module('app.schedule', ['ngRoute'])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schedule', {
    templateUrl: 'views/schedule.html',
    controller: 'ScheduleCtrl'
  })
}])

/*****************************************************************
*
* ScheduleCtrl controlller
*
******************************************************************/
.controller('ScheduleCtrl', function($scope, Criteria, Tweet, Calc) {

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

  /**
   * Adjacent spaces
   *
   * Return spaces adjacent to key
   */
  // $scope.adjacent = function(key) {
  //   var adjacent = []

  //   _.each(data.adjacencies, function(edge) {
  //     if(edge.source == key) {
  //       adjacent.push(edge.target)
  //     }
  //     else if(edge.target == key) {
  //       adjacent.push(edge.source)
  //     }
  //   })
  //   return adjacent
  // }

  /**
   * Update data model
   *
   * Called when a x-editable is saved
   */
  $scope.save = function() {
    tweets = $scope.tweets()
    Tweet.set(tweets)
  }

  /**
   * Remove row
   *
   * Called when a x-editable is saved
   */
  // $scope.removeRow = function(row) {
  //   // Toggle remove
  //   // row.removed = ! row.removed
  //   // Data.set($scope.data())
  // }

  $scope.colours = [
    'navy',
    'blue',
    'aqua',
    'teal',
    'olive',
    'green',
    'lime',
    'yellow',
    'orange',
    'red',
    'fuchsia',
    'purple',
    'maroon',
    'white',
    'silver',
    'gray',
    'black'
  ]

})
