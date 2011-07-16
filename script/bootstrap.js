(function (exports) {
  "use strict";

  control.bootstrap = function () {
    var process = exports.process = new Process();
    process.items = [
      new WorkspaceItem(WorkspaceItemType.map['twitter.input.global']),
      new WorkspaceItem(WorkspaceItemType.map['twitter.input.global'])
    ];
    process.show();
    
    var view = exports.view = new View();
  };

}(window));
