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

  function assignColour(term) {
    if(term == 'museum') {
      return 'green'
    }
    else if(term == 'art' || term == 'gallery') {
      return 'blue'
    }
    else if(term == 'theatre' || term == 'theater' || term == 'musical' || term == 'opera') {
      return 'purple'
    }
    else if(term == 'gig' || term == 'music') {
      return 'red'
    }
    else {
      return 'black'
    }
  }

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
        colour: assignColour(term.text),
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
