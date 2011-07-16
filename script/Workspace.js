(function (exports) {
  "use strict";

  var Workspace = exports.Workspace = function (process) {
    this.process = process;
  };
  
  Workspace.extends({
    width: {
      value: 600,
      enumerable: true,
      writable: true
    },
    
    height: {
      value: 500,
      enumerable: true,
      writable: true
    }
  });

  Workspace.implements({
    loaded: {
      enumerable: true,
      get: function () {
        return !!this.view && !!this.view.root && !!this.view.root.offsetParent;
      },
      set: function (value) {
        if (value && !this.loaded) {
          this.load();
        } else if (!value && this.loaded) {
          this.unload();
        }
      }
    },

    load: {
      enumerable: true,
      value: function (expand) {
        if (!this.loaded) {
          this.expanded = expand || expand === Object.undef;
          document.getElementById('workspaces').appendChild(this.toElement());
        }
        return this;
      }
    },

    unload: {
      enumerable: true,
      value: function () {
        if (this.loaded) {
          this.view.root.unload();
        }
        return this;
      }
    },

    expanded: (function () {
      var expanded = true;

      return {
        enumerable: true,
        get: function () {
          return this.loaded ? !this.view.root.classList.contains('reduced') : expanded;
        },

        set: function (value) {
          if (this.view && this.view.root) {
            if (this.expanded && !value) {
              this.unexpand();
            } else if (!this.expanded && value) {
              this.expand();
            }
          }
          expanded = value;
        }
      }
    }()),

    expand: {
      enumerable: true,
      value: function () {
        if (this.view && this.view.root) {
          this.view.root.classList.remove('reduced');
        }
        return this;
      }
    },

    unexpand: {
      enumerable: true,
      value: function () {
        if (this.view && this.view.root) {
          this.view.root.classList.add('reduced');
        }
        return this;
      }
    },
    
    dispose: {
      enumerable: true,
      value: function () {
        this.unload();
        return this;
      }
    },

    toElement: {
      value: function () {
        var view = this.view;
        if (!view || !view.root) {
          view = {};

          view.root = new Element('div', {
            class: 'workspace',
            style: {
              width: Workspace.width + 'px'
            }
          });
          if (!this.expanded) {
            view.root.classList.add('reduced');
          }

          view.header = new Element('div', {
            class: 'header'
          });
          view.root.appendChild(view.header);

          view.title = new Element('p', {
            class: 'title',
            text: this.process.name
          });
          this.process.on('prop.change.name', function (name) {
            view.title.textContent = name;
          });
          view.header.appendChild(view.title);

          view.controls = new Element('div', {
            class: 'controls'
          });
          view.header.appendChild(view.controls);

          view.reduce = new Element('div', {
            class: 'control reduce',
            events: {
              click: function () {
                this.expanded = !this.expanded;
              }.bind(this)
            }
          });
          view.controls.appendChild(view.reduce);

          view.close = new Element('div', {
            class: 'control close',
            events: {
              click: function () {
                this.unload();
              }.bind(this)
            }
          });
          view.controls.appendChild(view.close);

          view.items = new Element('div', {
            class: 'container',
            style: {
              width: Workspace.width + 'px',
              height: Workspace.height + 'px'
            }
          });
          view.root.appendChild(view.items);

          view.canvas = new Element('canvas', {
            width: Workspace.width,
            height: Workspace.height
          });
          view.items.appendChild(view.canvas);

          this.view = view;
        }

        return this.view.root;
      }
    }
  });

}(window));
