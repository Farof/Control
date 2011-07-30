(function (exports) {
  "use strict";

  var WorkspaceItemType = exports.WorkspaceItemType = function (options) {
    Object.merge(this, options);
    this.libraryItem = new LibraryItem(document.getElementById('library'), this);
  };
  
  WorkspaceItemType.extends(new Map(WorkspaceItemType, 'type', {
    Events: Object.undefined
  }));
  
  WorkspaceItemType.add({
    type: 'twitter.input.global',
    name: 'All Tweets'
  });

}(window));
