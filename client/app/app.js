/*globals noty */
'use strict';

angular.module('adminApp', [ 'ngRoute',
  'ui.router',
  'toastr',
  'restangular',
  'loginApp'
  ])
  .config(['$urlRouterProvider','$locationProvider', '$httpProvider','RestangularProvider', function($urlRouterProvider,$locationProvider, $httpProvider, RestangularProvider) {
   
    
    RestangularProvider.setDefaultHeaders({
      'Content-Type': 'application/json'
    });
    RestangularProvider.setDefaultHttpFields({
     // withCredentials: true
     /* timeout: 30000*/
    });
   

    $urlRouterProvider.otherwise('/login');

    var supports_history_api = function() {
      return !!(window.history && history.pushState);
    }
    if(supports_history_api()) {
      $locationProvider.html5Mode(true).hashPrefix('!');
    } else {
      $locationProvider.html5Mode(false);      
    }
    $httpProvider.interceptors.push('authInterceptor');
    
  }]).factory('authInterceptor', function() { // function($rootScope, $q, $cookieStore, $location) {
    return {
    };
  })
  
  
.run(['$rootScope','$timeout', '$location',  '$window', '$state','Restangular','toastr', function($rootScope, $timeout, $location,  $window, $state,Restangular,toastr) {
 $rootScope.$on('$stateChangeSuccess', function(event) {
    if (!$window.ga)
      return;
    $window.ga('send', 'pageview', { page: $location.path() });
  });
 $rootScope.$on('$stateChangeStart', function(event, next) {
        
  }); 

 Restangular.addResponseInterceptor(function(data, operation, what, url, response) {    
    return data;
  });

  Restangular.addFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {   
    return {
      element: element,
      headers: _.extend(headers, {"x-service-id" : "RandomUsesKey-86452"}),
      params: _.extend(params),
      httpConfig: httpConfig 
    };
  });

 Restangular.setErrorInterceptor(function(response) {
    if (response.status === 401 || response.status === 403) {
      if(!$rootScope.isUnauthorized && $state.current.name != 'login') {
        $rootScope.isUnauthorized = true;
        console.log('Login required... , redirecting to /login');
        toastr.error('Unauthorized access,Redirecting to login ');
        $timeout(function(){
          $window.location.href = '/';
        }, 1000);

      }     
      $window.localStorage.clear();     
    } else if (response.status === 301 || response.status === 302 || response.status === 303) {
      console.log('Redirecting to ' + response.header.Location);
    } else if (response.status === 404) {
      console.log('Resource not available...');
    } else {
      toastr.error('Not able to fetch the given Resource, Please try again after sometime. ');
      console.log('Response received with HTTP error code: ' + response.status + ' - ' + response.statusText);
    }    
    return false;
  }); 
  
}]);
