/**
 * Search Controller
 * @namespace Controllers
 */
(function(){

'use strict';

angular
  .module('App')
  .controller('SearchController', SearchController)

  SearchController.$inject = ['$scope', '$http', '$routeParams', 'uiGmapGoogleMapApi'];

  /**
   * @namespace SearchController
   * @desc Controller for the chapter route
   * @memberOf Controllers
   */
  function SearchController($scope, $http, $routeParams, uiGmapGoogleMapApi) {
    $scope.loc = $routeParams.location;
    var initialCenter = {
      latitude: -23.5534084,
      longitude: -46.6577078
    };

    $http.get('http://houserank.felipevr.com/geocode?name=' + $scope.loc).then(
      function(response) {
        var lat = response.data.lat;
        var lng = response.data.lng;
        var initialCenter = {
          latitude: lat,
          longitude: lng
        };
        $scope.map = { center: initialCenter, zoom: 13 };
        $scope.circles = [
      {
        id: 0,
        center: initialCenter,
        radius: 2000,
        stroke: {
            color: '#08B21F',
            weight: 2,
            opacity: 1
        },
        fill: {
            color: '#08B21F',
            opacity: 0.1
        },
        geodesic: true,
        draggable: true,
        clickable: true,
        editable: true,
        visible: true,
        control: {}
      }
    ];

      }
    );


    $scope.applyFilters= function() {
      $scope.markers = [
        {
          id: 0,
          coords: {
            latitude: -23.5534084,
            longitude: -46.6577078
          },
          options: {
            draggable: false,
            labelContent: "R$ 100,00",
            labelAnchor: "30 70",
            labelClass: "marker-labels"
          }
        },
        {
          id: 1,
          coords: {
            latitude: -23.5634084,
            longitude: -46.6577078
          },
        },
        {
          id: 2,
          coords: {
            latitude: -23.5434084,
            longitude: -46.6577078
          },
        }
      ];
    };

  }

})();
