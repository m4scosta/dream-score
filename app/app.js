// App

angular
  .module('App', [
    'ngRoute',
    'ngResource'
  ])
  .config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
      // $httpProvider.defaults.withCredentials = true;
      // $httpProvider.defaults.useXDomain = true;
      // delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $routeProvider
        .when('/home', {
          templateUrl: 'app/templates/home.html',
          controller: 'HomeController'
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
