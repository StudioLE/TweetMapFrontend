'use strict'

/*****************************************************************
*
* Declare app level module which depends on views, and components
*
******************************************************************/
angular.module('app', [
  'ngRoute',
  'ngResource',
  'LocalStorageModule',
  'google.places',
  'nav',
  'app.config',
  'app.static',
  'app.criteria',
  'app.compute',
  'app.schedule',
  'app.graph',
  'app.map',
  'app.raw',
  'app.dataFactory',
  'app.criteriaFactory',
  'app.placeFactory',
  'app.tweetFactory',
  'app.calcFactory'
])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/404'})
}])

/*****************************************************************
*
* Lodash
*
******************************************************************/
.constant('_', window._)