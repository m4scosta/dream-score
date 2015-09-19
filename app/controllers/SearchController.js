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
    $scope.workLocation = "";
    $scope.workLat = null;
    $scope.workLng = null;

    var initialCenter = {
      latitude: -23.5534084,
      longitude: -46.6577078
    };

    $http.get('http://houserank.felipevr.com/geocode?name=' + $scope.loc).then(
        function(response) {
          loadPopovers();
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
              center: { latitude: lat,
                longitude: lng},
              radius: 2500,
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

    $scope.hoverIn = function(id) {
      var el = $scope.markers[id];
      $scope.map = { center: {latitude: el.coords.latitude, longitude: el.coords.longitude }, zoom: 13 };
      el.options.animation = '1';
    }

    $scope.hoverOut = function(id) {
      var el = $scope.markers[id];
      el.options.animation = '0';
    }

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
            labelContent: "R$100",
            labelAnchor: "20 70",
            labelClass: "marker-labels"
          }
        },
        {
          id: 1,
          coords: {
            latitude: -23.5634084,
            longitude: -46.6577078
          },
          options: {
            draggable: false,
            labelContent: "R$100",
            labelAnchor: "20 70",
            labelClass: "marker-labels"
          }
        },
        {
          id: 2,
          coords: {
            latitude: -23.5434084,
            longitude: -46.6577078
          },
          options: {
            draggable: false,
            labelContent: "R$100",
            labelAnchor: "20 70",
            labelClass: "marker-labels"
          }
        }
      ];
    };

    $scope.chooseWorkLocation = function () {
      $http.get('http://houserank.felipevr.com/geocode?name=' + $scope.workLocation).then(
          function(response) {
            $scope.workLat = response.data.lat;
            $scope.workLng = response.data.lng;

            $('#modal-inputs').hide();
            $('#work-spinner').show();

            window.setTimeout("$('#myModal').modal('hide'); $('#work-spinner').hide(); $('#modal-inputs').show()", 1000);
          }
      );
    };

    function loadPopovers() {
      $('#work-pref, #hosp-rel-pref')
          .on('hidden.bs.popover', function (e) {
            $(this).off('hidden.bs.popover');
            $(this).popover('destroy');
          })
          .popover('show');
      $('#work-spinner').hide();
    }

  }

})();
