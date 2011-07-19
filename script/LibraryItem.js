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
            class: 'item library-item',
            text: this.source.name,
            events: {
              mousedown: function (source, e) {
                var clone = this.cloneNode(true), pos = this.pos();
                
                clone.style.position = 'absolute';
                clone.style.left = pos.left + 'px';
                clone.style.top = pos.top + 'px';
                
                document.body.appendChild(clone);
                Drag.start(clone, e, window, true);
              }.unshift(this)
            }
          });
          
          this.view = view;
        }
        return this.view.root;
      }
    }
  })

}(window));
