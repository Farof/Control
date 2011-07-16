(function (exports) {
  "use strict";

  var control = exports.control = {
    state: {
      
    },
    
    start: function () {
      
    },
    
    load: function () {
      return this.storage.load.apply(this.storage, arguments);
    },
    
    save: function () {
      return this.storage.save.apply(this.storage, arguments);
    }
  };

}(window));
