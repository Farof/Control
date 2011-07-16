(function (exports) {
  "use strict";
  
  exports.Element = function (tag, options) {
    var element = document.createElement(tag), key;
    
    for (key in options) {
      if (exports.Element.Mutators[key]) {
        exports.Element.Mutators[key].call(element, options[key]);
      } else if (['string', 'number'].indexOf(typeof options[key]) > -1) {
        element.setAttribute(key, options[key]);
      } else {
        element[key] = options[key];
      }
    }
    
    return element;
  };
  
  exports.Element.Mutators = {
    /*bound: function (pair) {
      var source = pair[0], prop = pair[1], node = this;
      source.watch(prop, function (id, oldval, newval) {
        node.textContent = newval;
        return newval;
      });
    },*/
    
    events: function (events) {
      var 
        event,
        func = function (func) {
          this.addEventListener(event, func, false);
        }.bind(this);
        
      for (event in events) {
        (Array.isArray(events[event]) ? events[event] : [events[event]]).forEach(func);
      }
    },
    
    style: function (styles) {
      var style, str = '';
      for (style in styles) {
        str += style + ': ' + styles[style] + '; ';
      }
      this.setAttribute('style', str);
    },
    
    text: function (text) {
      var textNode = document.createTextNode(text);
      this.appendChild(textNode);
    }
  };
  
}(window));