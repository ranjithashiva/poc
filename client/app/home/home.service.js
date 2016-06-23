'use strict';

angular.module('adminApp')
  .service('homeService',['Restangular',  function(Restangular) {
  	Restangular.setBaseUrl('http://api.openweathermap.org');
      Restangular.addFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {   
    return {
      element: element,
      headers: null,
      params: _.extend(params),
      httpConfig: httpConfig 
    };
  });  

  	var _all = function() {
        return Restangular.all('data');
    };
   
    
    return {    	
      searchCity : function (queryParams) {
          return _all().one('2.5').one('weather').get(queryParams);
      }
    }
  }]);
