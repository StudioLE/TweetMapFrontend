'use strict'

angular.module('app.tweetFactory', [])

/*****************************************************************
*
* Connection factory
*
******************************************************************/
.factory('Tweet', function(localStorageService) {
  return {

    /**
     * Data getter
     *
     * @return {Array} data
     */
    get: function() {
      return localStorageService.get('tweet')
    },

    /**
     * Data setter
     *
     * @return {Array} data
     */
    set: function(data) {
      return localStorageService.set('tweet', data)
    },

    /**
     * Data add
     *
     * @return {Array} events
     */
    add: function(data) {
      var data = []
      if(this.isset()) {
        data = data.concat(this.get())
      }
      data.push(data)
      return localStorageService.set('tweet', data)
    },

    /**
     * Data is set
     *
     * @return {Bool} data
     */
    isset: function() {
      if(localStorageService.get('tweet')) {
        return true
      }
      else {
        return false
      }
    },

    /**
     * Data unset
     */
    unset: function() {
      return localStorageService.remove('tweet')
    }
  }
})
