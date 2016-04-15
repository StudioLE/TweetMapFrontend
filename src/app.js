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
  'ngTagsInput',
  'xeditable',
  'nav',
  'app.config',
  'app.static',
  'app.criteria',
  'app.compute',
  'app.schedule',
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

/*****************************************************************
*
* Angular X-editable
*
******************************************************************/
.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
})