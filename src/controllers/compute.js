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
.controller('ComputeCtrl', function($scope, $http, $location, Config, Criteria, Place, Tweet, Calc) {

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
    else if(term == 'cinema') {
      return 'black'
    }
    else if(term == 'gig' || term == 'music' || term == 'concert') {
      return 'red'
    }
    else if(term == 'club' || term == 'bar' || term == 'cafe' || term == 'restaurant' || term == 'pub') {
      return 'orange'
    }
    else {
      return 'yellow'
    }
  }

  async.eachSeries(criteria.terms, function(term, callback) {
    $http({
      method: 'GET',
      url: Config.twitter_api('/tweets/' + term.text + '/' + criteria.city.geometry.location.lat + ',' + criteria.city.geometry.location.lng + ',' + criteria.radius + 'km')
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available

      tweets.push({
        term: term.text,
        colour: assignColour(term.text),
        tweets: response.data
      })

      callback(null)

    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.

      callback(response)
    })
  }, function(err) {
    if(err) {
      if(err.status == 429) {
        $scope.status = 'Error: Rate Limit Reached. Wait 15 minutes and try again' 
      }
      else if(err.status == 400 && err.data[0].code == 215) {
        $scope.status = 'Error: ' + err.data[0].message 
      }
      else {
        $scope.status = 'Error' + "\n\n" + JSON.stringify(err)
      }
      return console.error(err)
    }

    Tweet.set(tweets)

    $scope.status = 'Computation complete'
    $location.path('/schedule')

  })

})
