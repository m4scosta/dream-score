/**
 * Home Controller
 * @namespace Controllers
 */
(function(){

'use strict';

angular
  .module('App')
  .controller('HomeController', HomeController)

  HomeController.$inject = ['$scope'];

  /**
   * @namespace HomeController
   * @desc Controller for the chapter route
   * @memberOf Controllers
   */
  function HomeController($scope) {
    console.log("OK");
  }

})();
