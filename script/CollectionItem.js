(function (exports) {
  "use strict";

  var CollectionItem = exports.CollectionItem = function (category, source) {
    this.source = source
    this.category = category;
    this.category.appendChild(this.toElement());
  };
  
  CollectionItem.implements({
    dispose: {
      value: function () {
        if (this.view && this.view.root) {
          this.view.root.unload();
        }
        return this;
      }
    },
    
    edit: {
      value: function (first) {
        this.creation = !!first;
        this.toEditElement().replaces(this.toElement());
        this.view.input.focus();
      }
    },
    
    unedit: {
      value: function () {
        this.source.name = this.view.input.value;
        this.toElement().replaces(this.toEditElement());
      }
    },
    
    toElement: {
      value: function () {
        var view = this.view;
        if (!view || !view.root) {
          view = {};
          
          view.root = new Element('p', {
            class: 'item',
            events: {
              click: function () {
                if (!this.clickTimer) {
                  this.clickTimer = setTimeout(function () {
                    delete this.clickTimer;
                    this.source.show(true);
                  }.bind(this), 200);
                }
              }.bind(this)
            }
          });

          view.title = new Element('span', {
            class: 'title',
            text: this.source.name,
            events: {
              dblclick: function (e) {
                e.stop();
                clearTimeout(this.clickTimer);
                this.edit();
              }.bind(this)
            }
          });
          this.source.on('prop.change.name', function (name) {
            view.title.textContent = name;
          });
          view.root.appendChild(view.title);
          
          view.remove = new Element('span', {
            class: 'remove',
            events: {
              click: function (e) {
                e.stop();
                this.source.delete();
              }.bind(this)
            }
          });
          view.root.appendChild(view.remove);

          this.view = view;
        }

        return this.view.root;
      }
    },
    
    toEditElement: {
      value: function () {
        if (!this.view.edit) {
          this.view.edit = new Element('p', {
            class: 'item'
          });
          
          this.view.input = new Element('input', {
            class: 'input',
            value: this.source.name,
            events: {
              blur: function () {
                this.unedit();
              }.bind(this),
              
              keydown: function (bind, e) {
                if (e.keyCode === 13) {
                  this.blur();
                } else if (e.keyCode === 27) {
                  if (bind.creation) {
                    this.blur();
                    bind.source.delete();
                  } else {
                    this.value = bind.source.name;
                    this.blur();
                  }
                }
              }.unshift(this)
            }
          });
          this.view.edit.appendChild(this.view.input);
        }
        return this.view.edit;
      }
    }
  });

}(window));
