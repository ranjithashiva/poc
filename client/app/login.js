/*globals noty */
'use strict';

angular.module('loginApp', [ 'ngRoute',
  'ui.router',
  'toastr',
  'restangular'
  ])
  .config(['$urlRouterProvider','$locationProvider', '$httpProvider','RestangularProvider', function($urlRouterProvider,$locationProvider, $httpProvider, RestangularProvider) {
   

  }])  
  .run(['$rootScope','$timeout', '$location',  '$window', '$state','Restangular', function($rootScope, $timeout, $location,  $window, $state,Restangular) {


   
    
  }]);
