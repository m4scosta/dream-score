(function(){

'use strict';

angular
  .module('App')
  .factory('HomeService', HomeService);

  HomeService.$inject = ['$resource'];

  function HomeService($resource) {
    return $resource('/api/:listing_id', {listing_id: '@listing_id'}, {
      update: {
        method: 'PUT',
        isArray: false
      },
      delete: {
        method: 'DELETE'
      },
      create: {
        method: 'POST'
      }
    });
  }

})();
