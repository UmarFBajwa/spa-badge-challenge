var SweetSelector = (function() {
  // var selectedElement;

  return {
    select: function(argument){
      if(argument.includes('#')){
        return document.getElementById(argument.substring(1))
      }
      else if(argument.includes('.')){
       return document.getElementsByClassName(argument.substring(1))
     }
     else {
       return document.getElementsByTagName(argument)
     }
   }
 }
})()

var DOM = (function() {

  return {

    hide: function(argument){
      var SelectedElement = SweetSelector.select(argument)
      if (SelectedElement instanceof HTMLCollection) {
        for(var i = 0; i < SelectedElement.length; i++) {
          SelectedElement[i].style.display = "none";}
      } else {
        SelectedElement.style.display = "none";
      }
    },
    show: function(argument){
   var SelectedElement = SweetSelector.select(argument)
      if (SelectedElement instanceof HTMLCollection) {
        for(var i = 0; i < SelectedElement.length; i++) {
          SelectedElement[i].style.display = "initial";}
      } else {
        SelectedElement.style.display = "initial";
      }
    },
    addClass: function(element, argument){
      var SelectedElement = SweetSelector.select(element)
      if (SelectedElement instanceof HTMLCollection) {
        for(var i = 0; i < SelectedElement.length; i++) {
          SelectedElement[i].className += " " + argument.substring(1);}
      } else {
        SelectedElement.className += " " + argument.substring(1);
      }
    },
    removeClass: function(element, argument){
      var SelectedElement = SweetSelector.select(element)
      if (SelectedElement instanceof HTMLCollection) {
        for(var i = 0; i < SelectedElement.length; i++) {
          SelectedElement[i].classList.remove(argument.substring(1));
        }
      } else {
        SelectedElement.classList.remove(argument.substring(1));
      }
    },
  }
})()

var EventDispatcher = (function(){

  return {
    on: function(selector, eventName, callback){
      var tag = SweetSelector.select(selector)
      if (tag instanceof HTMLCollection) {
        for(var i = 0; i < tag.length; i++) {
          tag[i].addEventListener(eventName, callback, false)
        }
      } else {tag.addEventListener(eventName, callback, false)}
    },
    trigger: function(selector, eventName){
      var event = new Event(eventName);
      var tag = SweetSelector.select(selector)
      if (tag instanceof HTMLCollection) {
        for(var i = 0; i < tag.length; i++) {
          tag[i].dispatchEvent(event)
        }
      } else {tag.dispatchEvent(event)}
    }
  }

})()

var AjaxWrapper = (function(){

  return {
    request: function(params){
      var urlSelect = params.url;
      var type = params.type;
      var data = params.data
      return new Promise(function(resolve, reject){
        var ajax = new XMLHttpRequest();
        if (type.toUpperCase() === 'GET') {
          ajax.open(type, urlSelect,true);
          ajax.send();} else if (type.toUpperCase() === 'POST') {
          ajax.open(type, urlSelect)
          ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          ajax.send(data);
          }
        ajax.onload = function(e){
          if (ajax.readyState === 4) {
            if (ajax.status >= 200 && ajax.status < 400) {
              resolve(ajax.response);
            } else {reject(ajax.statusText);}
          };
        };

        ajax.onerror = function(e){
          console.error(ajax.statusText);};

      })
    }
  };
})()

var MiniQuery = (function(){
  return {
    select: SweetSelector.select,
    hide: DOM.hide,
    show: DOM.show,
    addClass: DOM.addClass,
    removeClass: DOM.removeClass,
    on: EventDispatcher.on,
    trigger: EventDispatcher.trigger,
    request: AjaxWrapper.request,
    ready: function(callback){
      document.addEventListener("DOMContentLoaded", function(event) {
      callback();
      });
    }
  }
})();

MiniQuery.ready = function(callback){
  document.addEventListener("DOMContentLoaded", function(event) {
  callback();
  });
}

var $ = Object.assign({}, MiniQuery);
