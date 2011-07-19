(function (exports) {
  "use strict";

  var Drag = exports.Drag = function (node, event, container, docWide) {
    this.node = node;
    this.event = event;
    this.container = container;
    this.containerIsWindow = this.container === window;
    this.moveContainer = docWide ? window : container;

    this.move = this.move.bind(this);
    this.stop = this.stop.bind(this);

    event.stop();
    this.start();
  };

  Drag.extends({
    start: {
      enumerable: true,
      value: function (node, event, container, docWide) {
        return new Drag(node, event, container, docWide);
      }
    }
  });

  Drag.implements(new Events());

  Drag.implements({
    start: {
      enumerable: true,
      value: function () {
        var parent = this.node.parentNode;

        this.oriX = this.event.clientX;
        this.oriY = this.event.clientY;
        this.offsetX = this.node.offsetLeft;
        this.offsetY = this.node.offsetTop;
        this.scrollOriX = window.scrollX;
        this.scrollOriY = window.scrollY;

        parent.removeChild(this.node);
        parent.appendChild(this.node);

        this.moveContainer.addEventListener('mousemove', this.move, false);
        this.moveContainer.addEventListener('mouseup', this.stop, true);

        this.node.dragging = true;
        this.node.dragged = false;
      }
    },

    move: {
      enumerable: true,
      writable: true,
      value: function (event) {
        var
          item = this.node,
          style = item.style,
          scrollDiffX = window.scrollX - this.scrollOriX,
          scrollDiffY = window.scrollY - this.scrollOriY,
          left = (this.offsetX + (event.clientX - this.oriX) + scrollDiffX),
          top = (this.offsetY + (event.clientY - this.oriY) + scrollDiffY),
          maxWidth = (this.containerIsWindow ? this.container.innerWidth : this.container.clientWidth) - item.scrollWidth + scrollDiffX,
          maxHeight = (this.containerIsWindow ? this.container.innerHeight : this.container.clientHeight) - item.scrollHeight + scrollDiffY;

        this.moveEvent = event;

        left = left.bounds(0, maxWidth);
        top = top.bounds(0, maxHeight);

        style.position = 'absolute';
        style.left = left + 'px';
        style.top = top + 'px';
        this.fire('drag.move', left, top);

        if (!item.dragged) {
          item.dragged = true;
        }
      }
    },

    stop: {
      enumerable: true,
      writable: true,
      value: function (event) {
        this.moveContainer.removeEventListener('mousemove', this.move, false);
        this.moveContainer.removeEventListener('mouseup', this.stop, true);

        this.stopEvent = event;
        this.node.dragging = false;

        this.fire('drag.end');
      }
    }
  });

}(window));
