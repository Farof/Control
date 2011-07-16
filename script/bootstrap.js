(function (exports) {
  "use strict";

  control.bootstrap = function () {
    var process = exports.process = new Process();
    process.show();
    
    var view = exports.view = new View();
  };

}(window));
