(function (exports) {
  "use strict";

  var Named = exports.Named = function (name) {
    return {
      name: {
        enumerable: true,
        get: function () {
          return name;
        },
        set: function (value) {
          var old = name;
          name = value;
          if (old !== name) {
            this.fire('prop.change.name', [name]);
          }
        }
      }
    };
  };

}(window));
