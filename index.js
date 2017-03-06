;
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory();
    } else {
        // 浏览器全局变量(root 即 window)
        root.returnExports = factory();
    }
}(this, function($) {
  function isBodyNode = function(ele) {
    return ele.tagName === 'BODY' ? true : false;
  }
  
  var scrollbar = {};
  
  scrollbar.width = (function() {
    var body = document.body;
    
    var div = document.createElement('div');
    div.style.cssText = 'height: 50px;overflow: scroll;position: absolute;top: -9999px;width: 50px;';
    body.appendChild(div);

    var width = div.offsetWidth - div.clientWidth;

    body.removeChild(div);

    // free memony
    div = null;

    return width;
  })();
  
  // 是否有X滚动条
  scrollbar.isScrollX = function(ele) {
        var body = isBodyNode(ele);

        var offsetWidth = body ? document.body.offsetWidth || document.documentElement.offsetWidth : ele.offsetWidth;

        var clientWidth = body ? document.body.clientWidth || document.documentElement.clientWidth : ele.clientWidth;

        return offsetWidth - clientWidth;
    }
    
    // 是否有Y滚动条
    scrollbar.isScrollY = function(ele) {
        var body = isBodyNode(ele);

        var offsetHeight = body ? document.body.offsetHeight || document.documentElement.offsetHeight : ele.offsetHeight;

        var clientHeight = body ? document.body.clientHeight || document.documentElement.clientHeight : ele.clientHeight;

        return offsetHeight - clientHeight;
    }

    // 是否有滚动条
    scrollbar.isScroll = function(ele) {
        return scrollbar.isScrollX(ele) || scrollbar.isScrollY(ele);
    }

    function obtainWindowRect() {
        var width = window.innerWidth;
        var height = window.innerHeight;

        if (typeof width != 'number') { // IE 5/6/7/8
            if (document.compatMode == 'CSS1Compat') {
                width = document.documentElement.clientWidth;
                height = document.docuementElement.clientHeight;
            } else {
                width = document.body.clientWidth;
                height = document.body.clientHeight;
            }
        }

        return {
            width: width,
            height: height,
            top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
            left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
        };
    }

}));
