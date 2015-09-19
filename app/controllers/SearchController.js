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
    $scope.workLat = null;
    $scope.workLng = null;

    $scope.work = 1;
    $scope.grocery_or_supermarket = 1;
    $scope.hospital = 1;
    $scope.bar = 1;
    $scope.gym = 1;
    $scope.school = 1;

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
        $scope.c =
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
          };

      }
    );

    $scope.hoverIn = function(id) {
      var el = $scope.markers[id];
      $scope.map = { center: {latitude: el.coords.latitude, longitude: el.coords.longitude }, zoom: 13 };
      el.options.animation = '1';
    };

    $scope.hoverOut = function(id) {
      var el = $scope.markers[id];
      el.options.animation = '0';
    };

    $scope.applyFilters= function() {
      var dict = {
        grocery_or_supermarket: $scope.grocery_or_supermarket,
        hospital: $scope.hospital,
        bar: $scope.bar,
        gym: $scope.gym,
        school: $scope.school
      };

      var url = 'http://177.8.106.72/HouseRank/public/search?x=' + $scope.c.center.latitude + '&y=' + $scope.c.center.longitude + '&r=' + $scope.c.radius + '&types=grocery_or_supermarket,hospital,bar,gym,school&weights=' + $scope.grocery_or_supermarket + ',' + $scope.hospital + ',' + $scope.bar + ',' + $scope.gym + ',' + $scope.school;

      if ($scope.workLat && $scope.workLng) {
        url += "&wx=" +  $scope.workLat + "&wy=" + $scope.workLng + "&wp=" + $scope.work;
      }

      $http.get(url).then(
        function(response) {
          var markers = [];
          response.data.forEach(function(element, index){
            var marker = {};
            marker.id = index;
            marker.title = element.title;
            marker.siteUrl = element.siteUrl;
            marker.thumbnail = element.thumbnails[0];
            marker.salePrice = element.salePrice;
            marker.legend = element.legend;
            marker.coords = { latitude: element.latitude, longitude: element.longitude };
            marker.options = {
              draggable: false,
              labelContent: "R$"+element.salePrice,
              labelAnchor: "20 70",
              labelClass: "marker-labels"
            };
            markers.push(marker);
            $scope.markers = markers;
          });
        });
    };

    $scope.chooseWorkLocation = function () {
      $http.get('http://houserank.felipevr.com/geocode?name=' + $scope.workLocation).then(
          function(response) {
            $scope.workLat = response.data.lat;
            $scope.workLng = response.data.lng;
            var workMarker = {};
            workMarker.id = 999;
            workMarker.coords = { latitude: response.data.lat, longitude: response.data.lng };
            workMarker.options = {
              draggable: false,
              labelAnchor: "20 70",
              labelContent: "Trabalho",
              labelClass: "marker-labels"
            };
            $scope.workMarker = workMarker;
            $("#myModal").modal('hide');
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
    }

  }

})();
