(function (exports) {
  "use strict";

  var Map = exports.Map = function (Type, defaultName) {
    var map = {};
    
    Type.implements(new Events());
    Type.implements(new Named(defaultName));
    
    return {
      map: {
        enumerable: true,
        get: function () {
          return map;
        }
      },
      
      add: {
        enumerable: true,
        value: function (options) {
          var item = new Type(options);
          map[options.type] = item;
          return this;
        }
      }
    };
  };

}(window));
