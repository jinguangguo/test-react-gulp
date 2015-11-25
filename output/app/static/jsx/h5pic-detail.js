(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file
 * @author jinguangguo
 * @date 2015/11/25
 */

// 画图组件
var PicPage = React.createClass({displayName: "PicPage",

    // 初始化
    getInitialState: function() {
        "use strict";
        return {

        };
    },

    render: function() {
        "use strict";
        return (
            React.createElement("div", null, 
                "detail"
            )
        );
    }
});

// render
React.render(
    React.createElement(PicPage, null),
    document.getElementById('main')
);

},{}]},{},[1])