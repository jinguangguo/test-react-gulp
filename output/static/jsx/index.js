(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file
 * @author jinguangguo
 * @date 2015/10/31
 */

/**
 * this.props和this.state的区分：
 *      this.props表示那些一旦定义，就不再改变的特性
 *      this.state会随着用户互动而产生变化的特性
 */

var NotesList = React.createClass({displayName: "NotesList",

    handle: function() {
        "use strict";
        this.getDOMNode(this.refs.myInput).focus();
        this.setState({
            isOk: !this.state.isOk
        });
    },

    doData: function(event, dom) {
        "use strict";
    },

    componentWillReceiveProps: function(nextProps) {
        "use strict";
        debugger;
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        "use strict";
        debugger;
    },

    // 0
    getInitialState: function() {
        "use strict";
        debugger;
        return {
            isOk: true
        }
    },

    // 进入状态之前 - 1
    componentWillMount: function() {
        "use strict";
        debugger;
    },

    // 进入状态之后 - 3 - 已经渲染完成
    componentDidMount: function() {
        "use strict";
        debugger;
    },

    // 进入状态之中 - 2
    render: function() {
        debugger;
        var that = this;
        return (
            React.createElement("div", {className: "my-module"}, 
                React.createElement("input", {type: "text", ref: "myInput"}), 
                React.createElement("button", {onClick: this.handle}, "test"), 
                React.createElement("ul", {className: "list"}, 
                    
                        this.props.notes.map(function(note) {
                            "use strict";
                            return (
                                React.createElement("li", {className: "item"}, 
                                    React.createElement("span", {className: "name", onClick: that.doData}, note.name, " ------ ", note.desc)
                                )
                            );
                        })
                    
                ), 
                React.createElement("h4", null,  this.state.isOk === true ? 'OK' : 'not ok !')
            )
        );
    }
});

var notes = [
    {
        id: 1,
        name: 'note1',
        desc: 'desc note1'
    },
    {
        id: 2,
        name: 'note2',
        desc: 'desc note2'
    },
    {
        id: 3,
        name: 'note3',
        desc: 'desc note3'
    }
];

React.render(
    React.createElement(NotesList, {notes: notes}),
    document.getElementById('main')
);

},{}]},{},[1])