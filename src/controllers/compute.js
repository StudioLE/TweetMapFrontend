'use strict'

angular.module('app.compute', ['ngRoute'])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/compute', {
    templateUrl: 'views/compute.html',
    controller: 'ComputeCtrl'
  })
}])

/*****************************************************************
*
* ComputeCtrl controller
*
******************************************************************/
.controller('ComputeCtrl', function($scope, $http, $location, Criteria, Place, Tweet, Calc) {

  /**
   * Get data from local storage
   */
  var criteria = Criteria.get()
  var tweets = []

  $scope.status = 'Computing'

  console.log(criteria.terms)

  async.eachSeries(criteria.terms, function(term, callback) {
    $http({
      method: 'GET',
      url: 'http://localhost:4730/tweets/' + term.text + '/' + criteria.city.geometry.location.lat + ',' + criteria.city.geometry.location.lng + ',' + criteria.radius + 'km'
      // url: 'http://localhost:4730/tweets/museum/51.507222,-0.1275,50km'
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response)

      tweets.push({
        term: term.text,
        colour: 'black',
        tweets: response.data
      })

      callback(null)

    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response)

      callback(response)
    })
  }, function(err) {
    if(err) console.error(err)

    Tweet.set(tweets)

    $scope.status = 'Computation complete'
    $location.path('/schedule')
    // $scope.$apply()
    // window.location.href = '/#/schedule'

  })

})
