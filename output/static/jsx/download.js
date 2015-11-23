(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


var helper = require('../../widget/util/helper');

var Download = React.createClass({displayName: "Download",

    render: function() {
        "use strict";
        var names = ['king1', 'king2', 'king3'];
        return (
            React.createElement("div", {className: "container"}, 
                React.createElement("h1", null, "我是标题"), 
                
                    names.map(function(name) {
                        return React.createElement("div", {className: "name"}, "hello, ", name, " !")
                    })
                
            )
        );
    }

});

React.render(React.createElement(Download, null), document.getElementById('main'));

},{"../../widget/util/helper":2}],2:[function(require,module,exports){
/**
 * @file
 * @author jinguangguo
 * @date 2015/10/30
 */

module.exports = {

};


},{}]},{},[1])