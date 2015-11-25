(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file
 * @author jinguangguo
 * @date 2015/11/25
 */

// 列表
var PicList = React.createClass({displayName: "PicList",

    // 初始化
    getInitialState: function() {
        "use strict";
        return {

        };
    },

    render: function() {
        "use strict";
        return (
            React.createElement("div", {className: "h5pic-list"}, 
                React.createElement("div", {className: "doubling stackable three column ui grid container"}, 
                    
                        React.Children.map(this.props.children, function(child) {
                            return (
                                React.createElement("div", {className: "column"}, 
                                    React.createElement("div", {className: "ui segment"}, 
                                        child
                                    )
                                )
                            );
                        })
                    
                )
            )
        );
    }
});

// 详情
var PicDetail = React.createClass({displayName: "PicDetail",

    // 初始化
    getInitialState: function() {
        "use strict";
        return {

        };
    },

    render: function() {
        "use strict";
        return (
            React.createElement("div", {className: "h5pic-detail"}, 
                React.createElement("div", {className: "ui container"}, 
                    React.createElement("img", {className: "ui fluid image", src: this.props.imagePath})
                ), 
                React.createElement("div", {className: "ui horizontal divider"}, "编辑"), 
                React.createElement("div", {className: "ui container"}, 
                    React.createElement("div", {className: "ui segments"}, 
                        React.createElement("div", {className: "ui segment"}, 
                            React.createElement("div", {className: "ui input fluid"}, 
                                React.createElement("input", {type: "text", placeholder: "value..."})
                            )
                        ), 
                        React.createElement("div", {className: "ui segment"}, 
                            React.createElement("div", {className: "ui input fluid"}, 
                                React.createElement("input", {type: "text", placeholder: "value..."})
                            )
                        )
                    ), 
                    React.createElement("button", {className: "ui orange basic button fluid ok"}, "完成")
                )
            )
        );
    }

});

// 画图组件
var PicPage = React.createClass({displayName: "PicPage",

    PAGE_LIST: 0,

    PAGE_DETAIL: 1,

    toDetailPage: function(event) {
        "use strict";
        var $node = $(event.target);
        var src = $node.attr('src');
        this.setState({
            page: this.PAGE_DETAIL,
            imagePath: src
        });
    },

    switchPage: function(type) {
        "use strict";
        if (type === this.PAGE_LIST) {
            this.setState({
                page: this.PAGE_LIST
            });
        } else {
            this.setState({
                page: this.PAGE_DETAIL
            });
        }
    },

    returnToList: function() {
        "use strict";
        this.switchPage(this.PAGE_LIST);
    },

    // 初始化
    getInitialState: function() {
        "use strict";
        return {
            page: this.PAGE_LIST,
            imagePath: ''
        };
    },

    getTitle: function() {
        "use strict";
        if (this.state.page === this.PAGE_LIST) {
            return (
                React.createElement("h1", {className: "ui header title"}, 
                    "List"
                )
            );
        } else {
            return (
                React.createElement("h1", {className: "ui header title"}, 
                    React.createElement("a", {href: "javascript:;", className: "title-link", 
                       onClick: this.returnToList}, "返回"), 
                    "Detail"
                )
            );
        }
    },

    render: function() {
        "use strict";
        return (
            React.createElement("div", {className: "module-h5pic"}, 
                this.getTitle(), 
                
                    this.state.page === this.PAGE_LIST ?
                    React.createElement(PicList, null, 
                        React.createElement("a", {href: "javascript:;", className: "link", onClick: this.toDetailPage}, 
                            React.createElement("img", {src: "../static/img/demo11.jpg", width: "100%", alt: ""})
                        ), 
                        React.createElement("a", {href: "javascript:;", className: "link", onClick: this.toDetailPage}, 
                            React.createElement("img", {src: "../static/img/demo22.png", width: "100%", alt: ""})
                        ), 
                        React.createElement("a", {href: "javascript:;", className: "link", onClick: this.toDetailPage}, 
                            React.createElement("img", {src: "../static/img/demo33.jpg", width: "100%", alt: ""})
                        ), 
                        React.createElement("a", {href: "javascript:;", className: "link", onClick: this.toDetailPage}, 
                            React.createElement("img", {src: "../static/img/image1.jpg", width: "100%", alt: ""})
                        ), 
                        React.createElement("a", {href: "javascript:;", className: "link", onClick: this.toDetailPage}, 
                            React.createElement("img", {src: "../static/img/image2.jpg", width: "100%", alt: ""})
                        )
                    )
                    :
                    React.createElement(PicDetail, {imagePath: this.state.imagePath})
                
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