/**
 * Home Controller
 * @namespace Controllers
 */
(function(){

'use strict';

angular
  .module('App')
  .controller('AppController', AppController)

  AppController.$inject = ['$scope'];

  /**
   * @namespace AppController
   * @desc Controller for the chapter route
   * @memberOf Controllers
   */
  function AppController($scope) {
    $scope.chosenCity = '';
    $scope.selectTransaction = '';
    $scope.propertyTypeSelector = '';
  }

})();
