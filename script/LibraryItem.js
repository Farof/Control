(function (exports) {
  "use strict";

  var LibraryItem = exports.LibraryItem = function (category, source) {
    this.source = source
    this.category = category;
    this.category.appendChild(this.toElement());
  };
  
  LibraryItem.implements({
    toElement: {
      value: function () {
        var view = this.view;
        
        if (!view || !view.root) {
          view = {};
          
          view.root = new Element('p', {
            class: 'item',
            text: this.source.name
          });
          
          this.view = view;
        }
        return this.view.root;
      }
    }
  })

}(window));
