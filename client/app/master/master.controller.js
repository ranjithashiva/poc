'use strict';

angular.module('adminApp')
  .controller('MasterCtrl',['$scope','$timeout','$window',function($scope,$timeout,$window) {
    var supports_history_api = function() {
      return !!(window.history && history.pushState);
    }
    $timeout(function(){
        if(supports_history_api()) {
          $window.location.href = '/login';
        } else {
          $window.location.href = 'login#/login';
        }

    }, 1000)
    
   

  }]);