'use strict';

angular.module('adminApp')
  .controller('HomeController', ['$scope',  '$state', '$location', '$rootScope','utility','homeService','$window',
    function($scope,$state, $location, $rootScope,utility,homeService,$window) {
    $scope.currentUserName = utility.getFromStorage(localStorage, 'user').email; 
    var queryParams = {};
    $scope.model={};
    $scope.model.cityName="";
    $scope.showResult = false;

    var setParams = function() {      
      queryParams['appId'] = "bc9a99b72eb27eb6fcc062633cb84188"; 
    };
    
     $scope.searchByCityName = function() { 
      setParams();  
      queryParams['q'] = $scope.model.cityName;   
      console.log("Search", queryParams);		 
      homeService.searchCity(queryParams).then(function(response){
          $scope.weatherInfo = response;
          $scope.showResult = true;
      });
    }

    $scope.logout = function() {
      utility.removeFromStorage(localStorage, 'user');
      utility.clearStorage(localStorage);
      function supports_history_api() {
        return !!(window.history && history.pushState);
      }
      if(supports_history_api()) {
        $window.location.href = '/login';
      } else {
        $window.location.href = 'login#/login';
      }
    }
    
    
}]);          