(function (exports) {
  "use strict";

  Object.defineProperties(Object, {
    every: {
      value: function (obj, func) {
        for (var key in obj) {
          if (!func(obj[key], key)) {
            return false;
          }
        }

        return true;
      }
    },

    implements: {
      value: function (obj, refInterface) {
        if (obj && refInterface && typeof refInterface === 'object') {
          return Object.every(refInterface, function (value, key) {
            return Object.T(obj[key]);
          });
        }

        return false;
      }
    },

    undef: {
      value: (function () {} ())
    },

    F: {
      value: function (value) {
        return value === null || value === Object.undef;
      }
    },

    T: {
      value: function (value) {
        return !Object.F(value);
      }
    },

    merge: {
      value: function (source, adds) {
        var key;
        for (key in adds) {
          source[key] = adds[key];
        }
        return source;
      }
    }
  });

  Object.defineProperties(Object.prototype, {

  });

  Object.defineProperties(HTMLElement.prototype, {
    unload: {
      enumerable: true,
      value: function () {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
          return this;
        }
        return false;
      }
    },

    empty: {
      enumerable: true,
      value: function () {
        while (this.children[0]) {
          this.removeChild(this.children[0]);
        }
        return this;
      }
    },

    replaces: {
      enumerable: true,
      value: function (replaced) {
        if (replaced.parentNode) {
          replaced.parentNode.replaceChild(this, replaced);
        }
      }
    },
    
    pos: {
      enumerable: true,
      value: function (topParent) {
        var
          parent,
          node = this,
          coord = {
            left: node.offsetLeft,
            top: node.offsetTop
          };
        
        topParent = topParent || document;
        parent = node.offsetParent;

        while (parent && parent !== topParent) {
          coord.left += parent.offsetLeft;
          coord.top += parent.offsetTop;
          parent = parent.offsetParent;
        }
        
        coord.right = coord.left + node.scrollWidth;
        coord.centerX = coord.left + node.scrollWidth / 2;
        coord.bottom = coord.top + node.scrollHeight;
        coord.centerY = coord.top + node.scrollHeight / 2;

        return coord;
      }
    }
  });

  Object.defineProperties(Function.prototype, {
    extends: {
      value: function (properties) {
        Object.defineProperties(this, properties);
        return this;
      }
    },

    implements: {
      value: function (properties) {
        Object.defineProperties(this.prototype, properties);
        return this;
      }
    },

    delay: {
      value: function (delay, bind) {
        var func = this;
        setTimeout(function () {
          func.call(bind);
        }, delay);
      }
    },

    unshift: {
      value: function (arg, bind) {
        var func = this;
        return function () {
          return func.apply(bind || this, [arg].concat(Array.prototype.slice.call(arguments)));
        }
      }
    }
  });

  Object.defineProperties(Event.prototype, {
    stop: {
      enumerable: true,
      value: function () {
        this.stopPropagation();
        this.preventDefault();
      }
    }
  }),

  Object.defineProperties(Array.prototype, {
    first: {
      get: function () {
        return this[0];
      }
    },

    last: {
      get: function () {
        return this[this.lenght - 1];
      }
    },

    contains: {
      value: function (item) {
        return this.indexOf(item) > -1;
      }
    },

    include: {
      value: function (item, pass) {
        if (!pass && Array.isArray(item)) {
          return this.merge(item);
        }
        if (!this.contains(item)) {
          this.push(item);
        }
        return this;
      }
    },

    merge: {
      value: function (items) {
        var i, ln;
        for (i = 0, ln = items.length; i < ln; i += 1) {
          this.include(items[i], true);
        }
        return this;
      }
    },

    remove: {
      value: function (item) {
        var i = this.indexOf(item);
        if (i > -1) {
          return this.splice(i, 1);
        }
        return null;
      }
    }
  });

  Object.defineProperties(Number.prototype, {
    bounds: {
      value: function (min, max) {
        var ret = this;

        //console.log('bound: ' + ret + ' in ' + '[' + min + ', ' + max + ']');

        max = max || (min ? 0 : 100);
        min = min || 0;
        if (min > max) {
          [min, max] = [max, min];
        }
        
        

        return  ret < min ? min :
                ret > max ? max :
                            ret;
      }
    }
  });

}(window));
