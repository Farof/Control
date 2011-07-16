(function (exports) {
  "use strict";

  var WorkspaceItem = exports.WorkspaceItem = function (type) {
    this.type = type;
  };

  WorkspaceItem.implements({
    toElement: {
      value: function () {
        var view = this.view;

        if (!view || !view.root) {
          view = {};

          view.root = new Element('div', {
            class: 'item'
          });
          
          view.title = new Element('p', {
            class: 'title',
            text: this.type.name
          });
          view.root.appendChild(view.title);
          
          view.contents = new Element('div', {
            class: 'contents'
          });
          view.root.appendChild(view.contents);

          this.view = view;
        }

        return this.view.root;
      }
    }
  })

}(window));
