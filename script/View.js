(function (exports) {
  "use strict";

  var View = exports.View = function (edit) {
    this.collectionItem = new CollectionItem(document.getElementById('views'), this);
    if (edit) {
      this.collectionItem.edit(true);
    }
  };

  View.extends(new Collection(View, {
    Events: Object.undefined,
    Named: 'View name'
  }));

  View.implements({
    show: {
      enumerable: true,
      value: function (expand) {
        throw new Error('not yet implemented');
        return this;
      }
    },

    hide: {
      enumerable: true,
      value: function () {
        throw new Error('not yet implemented');
        return this;
      }
    },
    
    delete: {
      enumerable: true,
      value: function () {
        this.collectionItem.dispose();
      }
    },
    
    toElement: {
      value: function () {
        var view = this.view;
        if (!view || !view.root) {
          view = {};
          
          view.root = new Element('div', {
            class: 'view'
          });
          
          this.view = view;
        }
        return this.view.root;
      }
    }
  });

}(window));
