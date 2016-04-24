'use strict'

angular.module('app.criteria', ['ngRoute'])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/criteria', {
    templateUrl: 'views/criteria.html',
    controller: 'CriteriaCtrl'
  })
}])

/*****************************************************************
*
* CriteriaCtrl controlller
*
******************************************************************/
.controller('CriteriaCtrl', function($scope, $location, Criteria) {

  /**
   * Get data from local storage
   */
  if( ! Criteria.isset()) Criteria.set({})
  var criteria = Criteria.get()

  $scope.criteria = function() {
    return criteria
  }

  $scope.autocompleteOptions = {
    types: ['(cities)']
  }  

  /**
   * Update data model
   *
   * Called when form is saved
   */
  $scope.saveCriteria = function() {
    criteria = $scope.criteria()
    Criteria.set(criteria)

    $location.path('/compute')

  }

})
