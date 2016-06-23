'use strict';

angular.module('loginApp')
  .service('loginService',['Restangular',  function(Restangular) {
    Restangular.setBaseUrl('http://medicalassistant-jazzyarchitect.rhcloud.com');   
   

    var _all = function() {
        return Restangular.all('api').all('user');
    };
    
    return {    	
      doLogin: function (body,queryParams) {
          return _all().one('login').post('',body);
      }
    }
  }]);
