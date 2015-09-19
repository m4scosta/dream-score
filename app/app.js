// App

angular
  .module('App', [
    'ngRoute',
    'ngResource',
    'uiGmapgoogle-maps'
  ])
  .config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
      $httpProvider.defaults.withCredentials = false;
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $routeProvider
        .when('/', {
          templateUrl: 'app/templates/home.html',
          controller: 'AppController'
        })
        .when('/search/:location', {
          templateUrl: 'app/templates/search.html',
          controller: 'SearchController'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ])
  .value(
    'froalaConfig', {inlineMode: false, placeholder: 'Enter Text Here'}
  )
  // Run
  .run(function() {
    // TODO: locale changing automatically inside application.js
  });
