(function (exports) {
  "use strict";

  var Collection = exports.Collection = function (Type, defaultName) {
    var collection = [];
    
    Type.implements(new Events());
    Type.implements(new Named(defaultName));
    
    return {
      create: {
        value: function () {
          var process = new Type(true);
          collection.push(process);
        }
      }
    }
  };

}(window));
