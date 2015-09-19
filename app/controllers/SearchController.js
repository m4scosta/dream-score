/**
 * Search Controller
 * @namespace Controllers
 */
(function(){

'use strict';

angular
  .module('App')
  .controller('SearchController', SearchController)

  SearchController.$inject = ['$scope', '$rootScope', 'uiGmapGoogleMapApi'];

  /**
   * @namespace SearchController
   * @desc Controller for the chapter route
   * @memberOf Controllers
   */
  function SearchController($scope, $rootScope, uiGmapGoogleMapApi) {
    console.log($scope.$parent.chosenPlace);
    $scope.map = { center: { latitude: -23.5534084, longitude: -46.6577078 }, zoom: 17 };
    uiGmapGoogleMapApi.then(function(maps) {
      alert('Map OK');
    });
  }

})();
