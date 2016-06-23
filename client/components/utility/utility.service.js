'use strict';

angular.module('adminApp')
  .service('utility', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      getFromStorage: function(storage, key, def) {
        if (storage && storage.getItem) {
          try {
            var r = JSON.parse(storage.getItem(key));     
            if (r === null || r === undefined) {
              return def;
            }
            return r;
          } catch (e) {
            return def;
          }
        } 
        return def;
      },


      setIntoStorage: function(storage, key, value) {
        if (storage && storage.setItem) {
          try {
            storage.setItem(key, JSON.stringify(value));      
          } catch (e) { }
        }
      },

       removeFromStorage: function(storage, key) {
        if (storage && storage.removeItem) {
          try {
            storage.removeItem(key);
          } catch (e) { }
        }
      },

      clearStorage: function(storage, key) {
        if (storage && storage.clear) {
          try {
            storage.clear();
          } catch (e) { }
        }
      } 


    }

    

  });
