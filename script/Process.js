(function (exports) {
  "use strict";

  var Process = exports.Process = function (edit) {
    this.workspace = new Workspace(this);
    this.collectionItem = new CollectionItem(document.getElementById('processes'), this);
    if (edit) {
      this.collectionItem.edit(true);
    }
  };

  Process.extends(new Collection(Process, {
    Events: Object.undefined,
    Named: 'Process name'
  }));

  Process.implements({
    show: {
      enumerable: true,
      value: function (expand) {
        this.workspace.load(expand);
        return this;
      }
    },

    hide: {
      enumerable: true,
      value: function () {
        this.workspace.unload();
        return this;
      }
    },
    
    delete: {
      enumerable: true,
      value: function () {
        this.collectionItem.dispose();
        this.workspace.dispose();
      }
    }
  });

}(window));
