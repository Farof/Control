(function (exports) {
  "use strict";

  var Collection = exports.Collection = function (Type, defaultName) {
    var collection = [];
    
    Type.implements(new Events());
    Type.implements(new Named(defaultName));
    
    return {
      items: {
        enumerable: true,
        get: function () {
          return collection;
        }
      },
      
      create: {
        enumerable: true,
        value: function () {
          var item = new Type(true);
          collection.push(item);
          return this;
        }
      }
    };
  };

}(window));
