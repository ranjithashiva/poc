'use strict';

angular.module('loginApp')
  .controller('LoginCtrl',['$scope', '$window', '$location', '$state', 'toastr' ,'loginService','utility','Restangular',
   function ($scope, $window, $location, $state, toastr,loginService,utility,Restangular) {

    $scope.user={};
   
    var setLandingPage = function(loginInfo) {              
      $state.go('home');        
             
    }

    $scope.login = function() {
      $scope.user = {
        'email': $scope.user.username,
        'password': $scope.user.password      
      };		 
      loginService.doLogin($scope.user).then(function(loginInfo){
          if(loginInfo.success){
           utility.setIntoStorage(localStorage, 'user', $scope.user);
           setLandingPage();
          }
          else{
            var msg="Authentication not available for this current user";
            toastr.warning(msg,null);
          } 
      });
    }    
   
    

  }]);
