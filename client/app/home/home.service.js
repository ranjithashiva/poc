'use strict';

angular.module('adminApp')
  .service('homeService',['Restangular',  function(Restangular) {
  	Restangular.setBaseUrl('http://api.openweathermap.org');  

  	var _all = function() {
        return Restangular.all('data');
    };
   
    
    return {    	
      searchCity : function (queryParams) {
          return _all().one('2.5').one('weather').get(queryParams);
      }
    }
  }]);
