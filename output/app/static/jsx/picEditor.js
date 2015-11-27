(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file
 * @author jinguangguo
 * @date 2015/11/14
 */

var FontFamily = require('../../widget/fontFamily/fontFamily');

var ShowText = require('../../widget/showText/showText');

var Pic = require('../../widget/pic/pic');

// 左侧的题材库组件
var NavTabs = React.createClass({displayName: "NavTabs",

    TAB_FONT_FAMILY: 1,

    TAB_SHOW_TEXT: 2,

    switchTab: function(event) {
        "use strict";
        var $target = $(event.target);
        var tab = $target.data('tab');
        if (tab === this.TAB_FONT_FAMILY) {
            this.setState({
                currentTab: this.TAB_FONT_FAMILY
            });
        } else if (tab === this.TAB_SHOW_TEXT) {
            this.setState({
                currentTab: this.TAB_SHOW_TEXT
            });
        }
    },

    // 初始化
    getInitialState: function() {
        "use strict";
        return {
            currentTab: this.TAB_FONT_FAMILY
        };
    },

    render: function() {
        "use strict";
        return (
            React.createElement("section", {className: "module-nav"}, 
                
                    this.state.currentTab === this.TAB_FONT_FAMILY ?
                    React.createElement("div", {className: "nav-wrapper"}, 
                        React.createElement("div", {className: "ui top attached tabular menu"}, 
                            React.createElement("a", {className: "item active"}, "文字"), 
                            React.createElement("a", {className: "item", "data-tab": this.TAB_SHOW_TEXT, onClick: this.switchTab}, "宣传语")
                        ), 
                        React.createElement("div", {className: "ui bottom attached segment"}, 
                            React.createElement(FontFamily, null)
                        )
                    )
                    :
                    React.createElement("div", {className: "nav-wrapper"}, 
                        React.createElement("div", {className: "ui top attached tabular menu"}, 
                            React.createElement("a", {className: "item", "data-tab": this.TAB_FONT_FAMILY, onClick: this.switchTab}, "文字"), 
                            React.createElement("a", {className: "item active"}, "宣传语")
                        ), 
                        React.createElement("div", {className: "ui bottom attached segment"}, 
                            React.createElement(ShowText, null)
                        )
                    )
                
            )
        );
    }
});


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
            React.createElement("article", {className: "ui-layout"}, 
                React.createElement(NavTabs, null), 
                React.createElement("div", {className: "layout-main"}, 
                    React.createElement(Pic, null)
                )
            )
        );
    }
});

// render
React.render(
    React.createElement(PicPage, null),
    document.getElementById('main')
);

},{"../../widget/fontFamily/fontFamily":5,"../../widget/pic/pic":14,"../../widget/showText/showText":16}],2:[function(require,module,exports){
// artDialog - 默认配置
module.exports = {

    /* -----已注释的配置继承自 popup.js，仍可以再这里重新定义它----- */

    // 对齐方式
    //align: 'bottom left',

    // 是否固定定位
    //fixed: false,

    // 对话框叠加高度值(重要：此值不能超过浏览器最大限制)
    //zIndex: 1024,

    // 设置遮罩背景颜色
    backdropBackground: '#000',

    // 设置遮罩透明度
    backdropOpacity: 0.7,

    // 消息内容
    content: '<span class="ui-dialog-loading">Loading..</span>',

    // 标题
    title: '',

    // 对话框状态栏区域 HTML 代码
    statusbar: '',

    // 自定义按钮
    button: null,

    // 确定按钮回调函数
    ok: null,

    // 取消按钮回调函数
    cancel: null,

    // 确定按钮文本
    okValue: 'ok',

    // 取消按钮文本
    cancelValue: 'cancel',

    cancelDisplay: true,

    // 内容宽度
    width: '',

    // 内容高度
    height: '',

    // 内容与边界填充距离
    padding: '',

    // 对话框自定义 className
    skin: '',

    // 是否支持快捷关闭（点击遮罩层自动关闭）
    quickClose: false,

    // css 文件路径，留空则不会使用 js 自动加载样式
    // 注意：css 只允许加载一个
    cssUri: './dialog.css',

    // 模板（使用 table 解决 IE7 宽度自适应的 BUG）
    // js 使用 i="***" 属性识别结构，其余的均可自定义
    innerHTML:
    '<div i="dialog" class="ui-dialog">'
    +       '<div class="ui-dialog-arrow-a"></div>'
    +       '<div class="ui-dialog-arrow-b"></div>'
    +       '<table class="ui-dialog-grid">'
    +           '<tr>'
    +               '<td i="header" class="ui-dialog-header">'
    +                   '<button i="close" class="ui-dialog-close">&#215;</button>'
    +                   '<div i="title" class="ui-dialog-title"></div>'
    +               '</td>'
    +           '</tr>'
    +           '<tr>'
    +               '<td i="body" class="ui-dialog-body">'
    +                   '<div i="content" class="ui-dialog-content"></div>'
    +               '</td>'
    +           '</tr>'
    +           '<tr>'
    +               '<td i="footer" class="ui-dialog-footer">'
    +                   '<div i="statusbar" class="ui-dialog-statusbar"></div>'
    +                   '<div i="button" class="ui-dialog-button"></div>'
    +               '</td>'
    +           '</tr>'
    +       '</table>'
    +'</div>'

};

},{}],3:[function(require,module,exports){
/*!
 * artDialog
 * Date: 2014-11-09
 * https://github.com/aui/artDialog
 * (c) 2009-2014 TangBin, http://www.planeArt.cn
 *
 * This is licensed under the GNU LGPL, version 2.1 or later.
 * For details, see: http://www.gnu.org/licenses/lgpl-2.1.html
 */

var Popup = require('./popup');
var defaults = require('./dialog-config');
var css = defaults.cssUri;


// css loader: RequireJS & SeaJS
if (css) {
    var fn = require[require.toUrl ? 'toUrl' : 'resolve'];
    if (fn) {
        css = fn(css);
        css = '<link rel="stylesheet" href="' + css + '" />';
        if ($('base')[0]) {
            $('base').before(css);
        } else {
            $('head').append(css);
        }
    }
}


var _count = 0;
var _expando = new Date() - 0; // Date.now()
var _isIE6 = !('minWidth' in $('html')[0].style);
var _isMobile = 'createTouch' in document && !('onmousemove' in document)
    || /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
var _isFixed = !_isIE6 && !_isMobile;


var artDialog = function (options, ok, cancel) {

    var originalOptions = options = options || {};


    if (typeof options === 'string' || options.nodeType === 1) {

        options = {content: options, fixed: !_isMobile};
    }


    options = $.extend(true, {}, artDialog.defaults, options);
    options.original = originalOptions;

    var id = options.id = options.id || _expando + _count;
    var api = artDialog.get(id);


    // 如果存在同名的对话框对象，则直接返回
    if (api) {
        return api.focus();
    }


    // 目前主流移动设备对fixed支持不好，禁用此特性
    if (!_isFixed) {
        options.fixed = false;
    }


    // 快捷关闭支持：点击对话框外快速关闭对话框
    if (options.quickClose) {
        options.modal = true;
        options.backdropOpacity = 0;
    }


    // 按钮组
    if (!$.isArray(options.button)) {
        options.button = [];
    }


    // 取消按钮
    if (cancel !== undefined) {
        options.cancel = cancel;
    }

    if (options.cancel) {
        options.button.push({
            id: 'cancel',
            value: options.cancelValue,
            callback: options.cancel,
            display: options.cancelDisplay
        });
    }


    // 确定按钮
    if (ok !== undefined) {
        options.ok = ok;
    }

    if (options.ok) {
        options.button.push({
            id: 'ok',
            value: options.okValue,
            callback: options.ok,
            autofocus: true
        });
    }


    return artDialog.list[id] = new artDialog.create(options);
};

var popup = function () {};
popup.prototype = Popup.prototype;
var prototype = artDialog.prototype = new popup();

artDialog.create = function (options) {
    var that = this;

    $.extend(this, new Popup());

    var originalOptions = options.original;
    var $popup = $(this.node).html(options.innerHTML);
    var $backdrop = $(this.backdrop);

    this.options = options;
    this._popup = $popup;


    $.each(options, function (name, value) {
        if (typeof that[name] === 'function') {
            that[name](value);
        } else {
            that[name] = value;
        }
    });


    // 更新 zIndex 全局配置
    if (options.zIndex) {
        Popup.zIndex = options.zIndex;
    }


    // 设置 ARIA 信息
    $popup.attr({
        'aria-labelledby': this._$('title')
            .attr('id', 'title:' + this.id).attr('id'),
        'aria-describedby': this._$('content')
            .attr('id', 'content:' + this.id).attr('id')
    });


    // 关闭按钮
    this._$('close')
        .css('display', this.cancel === false ? 'none' : '')
        .attr('title', this.cancelValue)
        .on('click', function (event) {
            that._trigger('cancel');
            event.preventDefault();
        });


    // 添加视觉参数
    this._$('dialog').addClass(this.skin);
    this._$('body').css('padding', this.padding);


    // 点击任意空白处关闭对话框
    if (options.quickClose) {
        $backdrop
            .on(
            'onmousedown' in document ? 'mousedown' : 'click',
            function () {
                that._trigger('cancel');
                return false;// 阻止抢夺焦点
            });
    }


    // 遮罩设置
    this.addEventListener('show', function () {
        $backdrop.css({
            opacity: 0,
            background: options.backdropBackground
        }).animate(
            {opacity: options.backdropOpacity}
            , 150);
    });


    // ESC 快捷键关闭对话框
    this._esc = function (event) {
        var target = event.target;
        var nodeName = target.nodeName;
        var rinput = /^input|textarea$/i;
        var isTop = Popup.current === that;
        var keyCode = event.keyCode;

        // 避免输入状态中 ESC 误操作关闭
        if (!isTop || rinput.test(nodeName) && target.type !== 'button') {
            return;
        }

        if (keyCode === 27) {
            that._trigger('cancel');
        }
    };

    $(document).on('keydown', this._esc);
    this.addEventListener('remove', function () {
        $(document).off('keydown', this._esc);
        delete artDialog.list[this.id];
    });


    _count ++;

    artDialog.oncreate(this);

    return this;
};


artDialog.create.prototype = prototype;



$.extend(prototype, {

    /**
     * 显示对话框
     * @name artDialog.prototype.show
     * @param   {HTMLElement Object, Event Object}  指定位置（可选）
     */

    /**
     * 显示对话框（模态）
     * @name artDialog.prototype.showModal
     * @param   {HTMLElement Object, Event Object}  指定位置（可选）
     */

    /**
     * 关闭对话框
     * @name artDialog.prototype.close
     * @param   {String, Number}    返回值，可被 onclose 事件收取（可选）
     */

    /**
     * 销毁对话框
     * @name artDialog.prototype.remove
     */

    /**
     * 重置对话框位置
     * @name artDialog.prototype.reset
     */

    /**
     * 让对话框聚焦（同时置顶）
     * @name artDialog.prototype.focus
     */

    /**
     * 让对话框失焦（同时置顶）
     * @name artDialog.prototype.blur
     */

    /**
     * 添加事件
     * @param   {String}    事件类型
     * @param   {Function}  监听函数
     * @name artDialog.prototype.addEventListener
     */

    /**
     * 删除事件
     * @param   {String}    事件类型
     * @param   {Function}  监听函数
     * @name artDialog.prototype.removeEventListener
     */

    /**
     * 对话框显示事件，在 show()、showModal() 执行
     * @name artDialog.prototype.onshow
     * @event
     */

    /**
     * 关闭事件，在 close() 执行
     * @name artDialog.prototype.onclose
     * @event
     */

    /**
     * 销毁前事件，在 remove() 前执行
     * @name artDialog.prototype.onbeforeremove
     * @event
     */

    /**
     * 销毁事件，在 remove() 执行
     * @name artDialog.prototype.onremove
     * @event
     */

    /**
     * 重置事件，在 reset() 执行
     * @name artDialog.prototype.onreset
     * @event
     */

    /**
     * 焦点事件，在 foucs() 执行
     * @name artDialog.prototype.onfocus
     * @event
     */

    /**
     * 失焦事件，在 blur() 执行
     * @name artDialog.prototype.onblur
     * @event
     */


    /**
     * 设置内容
     * @param    {String, HTMLElement}   内容
     */
    content: function (html) {

        var $content = this._$('content');

        this.$content = $content;   // add by jinguangguo

        // HTMLElement
        if (typeof html === 'object') {
            html = $(html);
            $content.empty('').append(html.show());
            this.addEventListener('beforeremove', function () {
                $('body').append(html.hide());
            });
            // String
        } else {
            $content.html(html);
        }

        return this.reset();
    },


    /**
     * 设置标题
     * @param    {String}   标题内容
     */
    title: function (text) {
        this._$('title').text(text);
        this._$('header')[text ? 'show' : 'hide']();
        return this;
    },


    /** 设置宽度 */
    width: function (value) {
        this._$('content').css('width', value);
        return this.reset();
    },


    /** 设置高度 */
    height: function (value) {
        this._$('content').css('height', value);
        return this.reset();
    },


    /**
     * 设置按钮组
     * @param   {Array, String}
     * Options: value, callback, autofocus, disabled
     */
    button: function (args) {
        args = args || [];
        var that = this;
        var html = '';
        var number = 0;
        this.callbacks = {};


        if (typeof args === 'string') {
            html = args;
            number ++;
        } else {
            $.each(args, function (i, val) {

                var id = val.id = val.id || val.value;
                var style = '';
                that.callbacks[id] = val.callback;


                if (val.display === false) {
                    style = ' style="display:none"';
                } else {
                    number ++;
                }

                html +=
                    '<button'
                    + ' type="button"'
                    + ' i-id="' + id + '"'
                    + style
                    + (val.disabled ? ' disabled' : '')
                    + (val.autofocus ? ' autofocus class="ui-dialog-autofocus"' : '')
                    + '>'
                    +   val.value
                    + '</button>';

                that._$('button')
                    .on('click', '[i-id=' + id +']', function (event) {
                        var $this = $(this);
                        if (!$this.attr('disabled')) {// IE BUG
                            that._trigger(id);
                        }

                        event.preventDefault();
                    });

            });
        }

        this._$('button').html(html);
        this._$('footer')[number ? 'show' : 'hide']();

        return this;
    },


    statusbar: function (html) {
        this._$('statusbar')
            .html(html)[html ? 'show' : 'hide']();

        return this;
    },


    _$: function (i) {
        return this._popup.find('[i=' + i + ']');
    },


    // 触发按钮回调函数
    _trigger: function (id) {
        var fn = this.callbacks[id];

        return typeof fn !== 'function' || fn.call(this) !== false ?
            this.close().remove() : this;
    }

});



artDialog.oncreate = $.noop;



/** 获取最顶层的对话框API */
artDialog.getCurrent = function () {
    return Popup.current;
};



/**
 * 根据 ID 获取某对话框 API
 * @param    {String}    对话框 ID
 * @return   {Object}    对话框 API (实例)
 */
artDialog.get = function (id) {
    return id === undefined
        ? artDialog.list
        : artDialog.list[id];
};

artDialog.list = {};



/**
 * 默认配置
 */
artDialog.defaults = defaults;



module.exports = artDialog;


},{"./dialog-config":2,"./popup":4}],4:[function(require,module,exports){
/*!
 * PopupJS
 * Date: 2014-11-09
 * https://github.com/aui/popupjs
 * (c) 2009-2014 TangBin, http://www.planeArt.cn
 *
 * This is licensed under the GNU LGPL, version 2.1 or later.
 * For details, see: http://www.gnu.org/licenses/lgpl-2.1.html
 */

var _count = 0;
var _isIE6 = !('minWidth' in $('html')[0].style);
var _isFixed = !_isIE6;


function Popup () {

    this.destroyed = false;


    this.__popup = $('<div />')
        /*使用 <dialog /> 元素可能导致 z-index 永远置顶的问题(chrome)*/
        .css({
            display: 'none',
            position: 'absolute',
            /*
             left: 0,
             top: 0,
             bottom: 'auto',
             right: 'auto',
             margin: 0,
             padding: 0,
             border: '0 none',
             background: 'transparent'
             */
            outline: 0
        })
        .attr('tabindex', '-1')
        .html(this.innerHTML)
        .appendTo('body');


    this.__backdrop = this.__mask = $('<div />')
        .css({
            opacity: .7,
            background: '#000'
        });


    // 使用 HTMLElement 作为外部接口使用，而不是 jquery 对象
    // 统一的接口利于未来 Popup 移植到其他 DOM 库中
    this.node = this.__popup[0];
    this.backdrop = this.__backdrop[0];

    _count ++;
}


$.extend(Popup.prototype, {

    /**
     * 初始化完毕事件，在 show()、showModal() 执行
     * @name Popup.prototype.onshow
     * @event
     */

    /**
     * 关闭事件，在 close() 执行
     * @name Popup.prototype.onclose
     * @event
     */

    /**
     * 销毁前事件，在 remove() 前执行
     * @name Popup.prototype.onbeforeremove
     * @event
     */

    /**
     * 销毁事件，在 remove() 执行
     * @name Popup.prototype.onremove
     * @event
     */

    /**
     * 重置事件，在 reset() 执行
     * @name Popup.prototype.onreset
     * @event
     */

    /**
     * 焦点事件，在 foucs() 执行
     * @name Popup.prototype.onfocus
     * @event
     */

    /**
     * 失焦事件，在 blur() 执行
     * @name Popup.prototype.onblur
     * @event
     */

    /** 浮层 DOM 素节点[*] */
    node: null,

    /** 遮罩 DOM 节点[*] */
    backdrop: null,

    /** 是否开启固定定位[*] */
    fixed: false,

    /** 判断对话框是否删除[*] */
    destroyed: true,

    /** 判断对话框是否显示 */
    open: false,

    /** close 返回值 */
    returnValue: '',

    /** 是否自动聚焦 */
    autofocus: true,

    /** 对齐方式[*] */
    align: 'bottom left',

    /** 内部的 HTML 字符串 */
    innerHTML: '',

    /** CSS 类名 */
    className: 'ui-popup',

    /**
     * 显示浮层
     * @param   {HTMLElement, Event}  指定位置（可选）
     */
    show: function (anchor) {

        if (this.destroyed) {
            return this;
        }

        var that = this;
        var popup = this.__popup;
        var backdrop = this.__backdrop;

        this.__activeElement = this.__getActive();

        this.open = true;
        this.follow = anchor || this.follow;


        // 初始化 show 方法
        if (!this.__ready) {

            popup
                .addClass(this.className)
                .attr('role', this.modal ? 'alertdialog' : 'dialog')
                .css('position', this.fixed ? 'fixed' : 'absolute');

            if (!_isIE6) {
                $(window).on('resize', $.proxy(this.reset, this));
            }

            // 模态浮层的遮罩
            if (this.modal) {
                var backdropCss = {
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    userSelect: 'none',
                    zIndex: this.zIndex || Popup.zIndex
                };


                popup.addClass(this.className + '-modal');


                if (!_isFixed) {
                    $.extend(backdropCss, {
                        position: 'absolute',
                        width: $(window).width() + 'px',
                        height: $(document).height() + 'px'
                    });
                }


                backdrop
                    .css(backdropCss)
                    .attr({tabindex: '0'})
                    .on('focus', $.proxy(this.focus, this));

                // 锁定 tab 的焦点操作
                this.__mask = backdrop
                    .clone(true)
                    .attr('style', '')
                    .insertAfter(popup);

                backdrop
                    .addClass(this.className + '-backdrop')
                    .insertBefore(popup);

                this.__ready = true;
            }


            if (!popup.html()) {
                popup.html(this.innerHTML);
            }
        }


        popup
            .addClass(this.className + '-show')
            .show();

        backdrop.show();


        this.reset().focus();
        this.__dispatchEvent('show');

        return this;
    },


    /** 显示模态浮层。参数参见 show() */
    showModal: function () {
        this.modal = true;
        return this.show.apply(this, arguments);
    },


    /** 关闭浮层 */
    close: function (result) {

        if (!this.destroyed && this.open) {

            if (result !== undefined) {
                this.returnValue = result;
            }

            this.__popup.hide().removeClass(this.className + '-show');
            this.__backdrop.hide();
            this.open = false;
            this.blur();// 恢复焦点，照顾键盘操作的用户
            this.__dispatchEvent('close');
        }

        return this;
    },


    /** 销毁浮层 */
    remove: function () {

        if (this.destroyed) {
            return this;
        }

        this.__dispatchEvent('beforeremove');

        if (Popup.current === this) {
            Popup.current = null;
        }


        // 从 DOM 中移除节点
        this.__popup.remove();
        this.__backdrop.remove();
        this.__mask.remove();


        if (!_isIE6) {
            $(window).off('resize', this.reset);
        }


        this.__dispatchEvent('remove');

        for (var i in this) {
            delete this[i];
        }

        return this;
    },


    /** 重置位置 */
    reset: function () {

        var elem = this.follow;

        if (elem) {
            this.__follow(elem);
        } else {
            this.__center();
        }

        this.__dispatchEvent('reset');

        return this;
    },


    /** 让浮层获取焦点 */
    focus: function () {

        var node = this.node;
        var popup = this.__popup;
        var current = Popup.current;
        var index = this.zIndex = Popup.zIndex ++;

        if (current && current !== this) {
            current.blur(false);
        }

        // 检查焦点是否在浮层里面
        if (!$.contains(node, this.__getActive())) {
            var autofocus = popup.find('[autofocus]')[0];

            if (!this._autofocus && autofocus) {
                this._autofocus = true;
            } else {
                autofocus = node;
            }

            this.__focus(autofocus);
        }

        // 设置叠加高度
        popup.css('zIndex', index);
        //this.__backdrop.css('zIndex', index);

        Popup.current = this;
        popup.addClass(this.className + '-focus');

        this.__dispatchEvent('focus');

        return this;
    },


    /** 让浮层失去焦点。将焦点退还给之前的元素，照顾视力障碍用户 */
    blur: function () {

        var activeElement = this.__activeElement;
        var isBlur = arguments[0];


        if (isBlur !== false) {
            this.__focus(activeElement);
        }

        this._autofocus = false;
        this.__popup.removeClass(this.className + '-focus');
        this.__dispatchEvent('blur');

        return this;
    },


    /**
     * 添加事件
     * @param   {String}    事件类型
     * @param   {Function}  监听函数
     */
    addEventListener: function (type, callback) {
        this.__getEventListener(type).push(callback);
        return this;
    },


    /**
     * 删除事件
     * @param   {String}    事件类型
     * @param   {Function}  监听函数
     */
    removeEventListener: function (type, callback) {
        var listeners = this.__getEventListener(type);
        for (var i = 0; i < listeners.length; i ++) {
            if (callback === listeners[i]) {
                listeners.splice(i--, 1);
            }
        }
        return this;
    },


    // 获取事件缓存
    __getEventListener: function (type) {
        var listener = this.__listener;
        if (!listener) {
            listener = this.__listener = {};
        }
        if (!listener[type]) {
            listener[type] = [];
        }
        return listener[type];
    },


    // 派发事件
    __dispatchEvent: function (type) {
        var listeners = this.__getEventListener(type);

        if (this['on' + type]) {
            this['on' + type]();
        }

        for (var i = 0; i < listeners.length; i ++) {
            listeners[i].call(this);
        }
    },


    // 对元素安全聚焦
    __focus: function (elem) {
        // 防止 iframe 跨域无权限报错
        // 防止 IE 不可见元素报错
        try {
            // ie11 bug: iframe 页面点击会跳到顶部
            if (this.autofocus && !/^iframe$/i.test(elem.nodeName)) {
                elem.focus();
            }
        } catch (e) {}
    },


    // 获取当前焦点的元素
    __getActive: function () {
        try {// try: ie8~9, iframe #26
            var activeElement = document.activeElement;
            var contentDocument = activeElement.contentDocument;
            var elem = contentDocument && contentDocument.activeElement || activeElement;
            return elem;
        } catch (e) {}
    },


    // 居中浮层
    __center: function () {

        var popup = this.__popup;
        var $window = $(window);
        var $document = $(document);
        var fixed = this.fixed;
        var dl = fixed ? 0 : $document.scrollLeft();
        var dt = fixed ? 0 : $document.scrollTop();
        var ww = $window.width();
        var wh = $window.height();
        var ow = popup.width();
        var oh = popup.height();
        var left = (ww - ow) / 2 + dl;
        var top = (wh - oh) * 382 / 1000 + dt;// 黄金比例
        var style = popup[0].style;


        style.left = Math.max(parseInt(left), dl) + 'px';
        style.top = Math.max(parseInt(top), dt) + 'px';
    },


    // 指定位置 @param    {HTMLElement, Event}  anchor
    __follow: function (anchor) {

        var $elem = anchor.parentNode && $(anchor);
        var popup = this.__popup;


        if (this.__followSkin) {
            popup.removeClass(this.__followSkin);
        }


        // 隐藏元素不可用
        if ($elem) {
            var o = $elem.offset();
            if (o.left * o.top < 0) {
                return this.__center();
            }
        }

        var that = this;
        var fixed = this.fixed;

        var $window = $(window);
        var $document = $(document);
        var winWidth = $window.width();
        var winHeight = $window.height();
        var docLeft =  $document.scrollLeft();
        var docTop = $document.scrollTop();


        var popupWidth = popup.width();
        var popupHeight = popup.height();
        var width = $elem ? $elem.outerWidth() : 0;
        var height = $elem ? $elem.outerHeight() : 0;
        var offset = this.__offset(anchor);
        var x = offset.left;
        var y = offset.top;
        var left =  fixed ? x - docLeft : x;
        var top = fixed ? y - docTop : y;


        var minLeft = fixed ? 0 : docLeft;
        var minTop = fixed ? 0 : docTop;
        var maxLeft = minLeft + winWidth - popupWidth;
        var maxTop = minTop + winHeight - popupHeight;


        var css = {};
        var align = this.align.split(' ');
        var className = this.className + '-';
        var reverse = {top: 'bottom', bottom: 'top', left: 'right', right: 'left'};
        var name = {top: 'top', bottom: 'top', left: 'left', right: 'left'};


        var temp = [{
            top: top - popupHeight,
            bottom: top + height,
            left: left - popupWidth,
            right: left + width
        }, {
            top: top,
            bottom: top - popupHeight + height,
            left: left,
            right: left - popupWidth + width
        }];


        var center = {
            left: left + width / 2 - popupWidth / 2,
            top: top + height / 2 - popupHeight / 2
        };


        var range = {
            left: [minLeft, maxLeft],
            top: [minTop, maxTop]
        };


        // 超出可视区域重新适应位置
        $.each(align, function (i, val) {

            // 超出右或下边界：使用左或者上边对齐
            if (temp[i][val] > range[name[val]][1]) {
                val = align[i] = reverse[val];
            }

            // 超出左或右边界：使用右或者下边对齐
            if (temp[i][val] < range[name[val]][0]) {
                align[i] = reverse[val];
            }

        });


        // 一个参数的情况
        if (!align[1]) {
            name[align[1]] = name[align[0]] === 'left' ? 'top' : 'left';
            temp[1][align[1]] = center[name[align[1]]];
        }


        //添加follow的css, 为了给css使用
        className += align.join('-') + ' '+ this.className+ '-follow';

        that.__followSkin = className;


        if ($elem) {
            popup.addClass(className);
        }


        css[name[align[0]]] = parseInt(temp[0][align[0]]);
        css[name[align[1]]] = parseInt(temp[1][align[1]]);
        popup.css(css);

    },


    // 获取元素相对于页面的位置（包括iframe内的元素）
    // 暂时不支持两层以上的 iframe 套嵌
    __offset: function (anchor) {

        var isNode = anchor.parentNode;
        var offset = isNode ? $(anchor).offset() : {
            left: anchor.pageX,
            top: anchor.pageY
        };


        anchor = isNode ? anchor : anchor.target;
        var ownerDocument = anchor.ownerDocument;
        var defaultView = ownerDocument.defaultView || ownerDocument.parentWindow;

        if (defaultView == window) {// IE <= 8 只能使用两个等于号
            return offset;
        }

        // {Element: Ifarme}
        var frameElement = defaultView.frameElement;
        var $ownerDocument = $(ownerDocument);
        var docLeft =  $ownerDocument.scrollLeft();
        var docTop = $ownerDocument.scrollTop();
        var frameOffset = $(frameElement).offset();
        var frameLeft = frameOffset.left;
        var frameTop = frameOffset.top;

        return {
            left: offset.left + frameLeft - docLeft,
            top: offset.top + frameTop - docTop
        };
    }

});


/** 当前叠加高度 */
Popup.zIndex = 1024;


/** 顶层浮层的实例 */
Popup.current = null;


module.exports = Popup;


},{}],5:[function(require,module,exports){
/**
 * @file
 * @author jinguangguo
 * @date 2015/11/14
 */

var PaperManager = require('../paperManager/paperManager');

var FONTS = [
    {
        name: 'Arial',
        style: 'Arial, Helvetica, sans-serif'
    },
    {
        name: 'Arial Black',
        style: 'Arial Black, Gadget, sans-serif'
    },
    {
        name: 'Arial Narrow',
        style: 'Arial Narrow’, sans-serif'
    },
    {
        name: 'Verdana',
        style: 'Verdana, Geneva, sans-serif'
    },
    {
        name: 'Georgia',
        style: 'Georgia, serif'
    },
    {
        name: 'Times New Roman',
        style: 'Times New Roman, Times, serif'
    },
    {
        name: 'Trebuchet MS',
        style: 'Trebuchet MS, Helvetica, sans-serif'
    },
    {
        name: 'Courier',
        style: 'Courier, monospace'
    },
    {
        name: 'Courier New',
        style: 'Courier New, Courier, monospace'
    },
    {
        name: 'Impact',
        style: 'Impact, Charcoal, sans-serif'
    },
    {
        name: 'Comic Sans MS',
        style: 'Comic Sans MS, cursive'
    },
    {
        name: 'Tahoma',
        style: 'Tahoma, Geneva, sans-serif'
    },
    {
        name: 'Lucida Sans Unicode',
        style: 'Lucida Sans Unicode, Lucida Grande, sans-serif'
    },
    {
        name: 'Lucida Console',
        style: 'Lucida Console, Monaco, monospace'
    },
    {
        name: 'Garamond',
        style: 'Garamond, serif'
    },
    {
        name: 'MS Sans Serif',
        style: 'MS Sans Serif, Geneva, sans-serif'
    },
    {
        name: 'MS Serif',
        style: 'MS Serif, New York, sans-serif'
    },
    {
        name: 'Palatino Linotype',
        style: 'Palatino Linotype, Book Antiqua, Palatino, serif'
    },
    {
        name: 'Symbol',
        style: 'Symbol, sans-serif'
    },
    {
        name: 'Bookman Old Style',
        style: 'Bookman Old Style, serif'
    }
];

var FontFamily = React.createClass({displayName: "FontFamily",
    /**
     *
     * @param event
     */
    addTextToPaper: function(event) {
        "use strict";
        var $font = $(React.findDOMNode(event.target));
        var text = $font.data('text');
        var style = $font.data('style');
        PaperManager.addText({
            text: text,
            fontFamily: style
        });
    },

    render: function() {
        "use strict";
        var that = this;
        var items = [];
        _.forEach(FONTS, function(font, index) {
            items.push(
                React.createElement("li", {className: "item"}, 
                    React.createElement("a", {href: "javascript:;", title: font.name, 
                       onClick: that.addTextToPaper, 
                       "data-text": font.name, 
                       "data-style": font.style, 
                       className: "item-link", style: {fontFamily: font.style}}, 
                        font.name
                    )
                )
            );
        });
        return (
            React.createElement("ul", {className: "widget-font-family"}, 
                items
            )
        );
    }
});

module.exports = FontFamily;

},{"../paperManager/paperManager":7}],6:[function(require,module,exports){
/**
 * covert canvas to image
 * and save the image file
 */

// check if support sth.
var $support = function () {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    return {
        canvas: !!ctx,
        imageData: !!ctx.getImageData,
        dataURL: !!canvas.toDataURL,
        btoa: !!window.btoa
    };
}();

var downloadMime = 'image/octet-stream';

/**
 * 获取指定宽度和高度的画布canvas
 * @param canvas
 * @param width
 * @param height
 * @returns {Element}
 */
function scaleCanvas (canvas, width, height) {
    var w = canvas.width,
        h = canvas.height;

    if (width == undefined) {
        width = w;
    }

    if (height == undefined) {
        height = h;
    }

    var retCanvas = document.createElement('canvas');
    var retCtx = retCanvas.getContext('2d');
    retCanvas.width = width;
    retCanvas.height = height;
    retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
    return retCanvas;
}

/**
 * 针对指定文件类型获取图片
 * @param canvas
 * @param type
 * @param width
 * @param height
 * @returns {string}
 */
function getDataURL (canvas, type, width, height) {
    canvas = scaleCanvas(canvas, width, height);
    return canvas.toDataURL(type);
}

/**
 * 保存文件
 * @param strData
 */
function saveFile (strData) {
    document.location.href = strData;
}

/**
 * 生成image标签
 * @param strData
 * @returns {Element}
 */
function genImage(strData) {
    var img = document.createElement('img');
    img.src = strData;
    return img;
}

/**
 * 生成type使用
 * @param type
 * @returns {string}
 */
function fixType (type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    var r = type.match(/png|jpeg|bmp|gif/)[0];
    return 'image/' + r;
}

/**
 * 生成base 64编码
 * @param data
 * @returns {string}
 */
function encodeData (data) {
    if (!window.btoa) { throw 'btoa undefined' }
    var str = '';
    if (typeof data == 'string') {
        str = data;
    } else {
        for (var i = 0; i < data.length; i ++) {
            str += String.fromCharCode(data[i]);
        }
    }
    return btoa(str);
}

/**
 * 获取imageData
 * @param canvas
 * @returns {ImageData}
 */
function getImageData (canvas) {
    var w = canvas.width,
        h = canvas.height;
    return canvas.getContext('2d').getImageData(0, 0, w, h);
}

/**
 * 生成base64 URI
 * @param strData
 * @param type
 * @returns {string}
 */
function makeURI (strData, type) {
    return 'data:' + type + ';base64,' + strData;
}

/**
 * create bitmap image
 * ���չ�������ͼƬ��Ӧͷ����Ӧ��
 */
var genBitmapImage = function (data) {
    var imgHeader = [],
        imgInfoHeader = [];

    var width = data.width,
        height = data.height;

    imgHeader.push(0x42); // 66 -> B
    imgHeader.push(0x4d); // 77 -> M

    var fsize = width * height * 3 + 54; // header size:54 bytes
    imgHeader.push(fsize % 256); // r
    fsize = Math.floor(fsize / 256);
    imgHeader.push(fsize % 256); // g
    fsize = Math.floor(fsize / 256);
    imgHeader.push(fsize % 256); // b
    fsize = Math.floor(fsize / 256);
    imgHeader.push(fsize % 256); // a

    imgHeader.push(0);
    imgHeader.push(0);
    imgHeader.push(0);
    imgHeader.push(0);

    imgHeader.push(54); // offset -> 6
    imgHeader.push(0);
    imgHeader.push(0);
    imgHeader.push(0);

    // info header
    imgInfoHeader.push(40); // info header size
    imgInfoHeader.push(0);
    imgInfoHeader.push(0);
    imgInfoHeader.push(0);

    // ����info
    var _width = width;
    imgInfoHeader.push(_width % 256);
    _width = Math.floor(_width / 256);
    imgInfoHeader.push(_width % 256);
    _width = Math.floor(_width / 256);
    imgInfoHeader.push(_width % 256);
    _width = Math.floor(_width / 256);
    imgInfoHeader.push(_width % 256);

    // ����info
    var _height = height;
    imgInfoHeader.push(_height % 256);
    _height = Math.floor(_height / 256);
    imgInfoHeader.push(_height % 256);
    _height = Math.floor(_height / 256);
    imgInfoHeader.push(_height % 256);
    _height = Math.floor(_height / 256);
    imgInfoHeader.push(_height % 256);

    imgInfoHeader.push(1);
    imgInfoHeader.push(0);
    imgInfoHeader.push(24); // 24λbitmap
    imgInfoHeader.push(0);

    // no compression
    imgInfoHeader.push(0);
    imgInfoHeader.push(0);
    imgInfoHeader.push(0);
    imgInfoHeader.push(0);

    // pixel data
    var dataSize = width * height * 3;
    imgInfoHeader.push(dataSize % 256);
    dataSize = Math.floor(dataSize / 256);
    imgInfoHeader.push(dataSize % 256);
    dataSize = Math.floor(dataSize / 256);
    imgInfoHeader.push(dataSize % 256);
    dataSize = Math.floor(dataSize / 256);
    imgInfoHeader.push(dataSize % 256);

    // blank space
    for (var i = 0; i < 16; i ++) {
        imgInfoHeader.push(0);
    }

    var padding = (4 - ((width * 3) % 4)) % 4;
    var imgData = data.data;
    var strPixelData = '';
    var y = height;
    do {
        var offsetY = width * (y - 1) * 4;
        var strPixelRow = '';
        for (var x = 0; x < width; x ++) {
            var offsetX = 4 * x;
            strPixelRow += String.fromCharCode(imgData[offsetY + offsetX + 2]);
            strPixelRow += String.fromCharCode(imgData[offsetY + offsetX + 1]);
            strPixelRow += String.fromCharCode(imgData[offsetY + offsetX]);
        }
        for (var n = 0; n < padding; n ++) {
            strPixelRow += String.fromCharCode(0);
        }

        strPixelData += strPixelRow;
    } while(-- y);

    return (encodeData(imgHeader.concat(imgInfoHeader)) + encodeData(strPixelData));

};

/**
 * saveAsImage
 * @param canvasElement
 * @param {String} image type
 * @param {Number} [optional] png width
 * @param {Number} [optional] png height
 */
var saveAsImage = function (canvas, width, height, type) {
    if ($support.canvas && $support.dataURL) {
        if (type == undefined) { type = 'png'; }
        type = fixType(type);
        if (/bmp/.test(type)) {
            var data = getImageData(scaleCanvas(canvas, width, height));
            var strData = genBitmapImage(data);
            saveFile(makeURI(strData, downloadMime));
        } else {
            var strData = getDataURL(canvas, type, width, height);
            saveFile(strData.replace(type, downloadMime));
        }
    }
};

/**
 *
 * @param canvas
 * @param width
 * @param height
 * @param type
 * @returns {Element}
 */
var convertToImage = function (canvas, width, height, type) {
    if ($support.canvas && $support.dataURL) {
        if (type == undefined) { type = 'png'; }
        type = fixType(type);

        if (/bmp/.test(type)) {
            var data = getImageData(scaleCanvas(canvas, width, height));
            var strData = genBitmapImage(data);
            return genImage(makeURI(strData, 'image/bmp'));
        } else {
            var strData = getDataURL(canvas, type, width, height);
            return genImage(strData);
        }
    }
};

module.exports = {
    saveAsImage: saveAsImage,
    saveAsPNG: function (canvas, width, height) {
        return saveAsImage(canvas, width, height, 'png');
    },
    saveAsJPEG: function (canvas, width, height) {
        return saveAsImage(canvas, width, height, 'jpeg');
    },
    saveAsGIF: function (canvas, width, height) {
        return saveAsImage(canvas, width, height, 'gif')
    },
    saveAsBMP: function (canvas, width, height) {
        return saveAsImage(canvas, width, height, 'bmp');
    },

    convertToImage: convertToImage,
    convertToPNG: function (canvas, width, height) {
        return convertToImage(canvas, width, height, 'png');
    },
    convertToJPEG: function (canvas, width, height) {
        return convertToImage(canvas, width, height, 'jpeg');
    },
    convertToGIF: function (canvas, width, height) {
        return convertToImage(canvas, width, height, 'gif');
    },
    convertToBMP: function (canvas, width, height) {
        return convertToImage(canvas, width, height, 'bmp');
    }
};

},{}],7:[function(require,module,exports){
/**
 * @file
 * @author jinguangguo
 * @date 2015/11/14
 */

var TextShapeBox = require('./shapeBox/textShapeBox');

var ImageShapeBox = require('./shapeBox/imageShapeBox');

var ShapeBox = require('./shapeBox/shapeBox');

var CONFIG = require('./shapeBox/config');

module.exports = {
    // 画布对象
    _paper: null,
    /**
     * 基于container画图
     * @param option.container
     * @param option.width
     * @param option.height
     */
    createPaper: function(option) {
        "use strict";
        this._paper = Raphael(option.container[0], option.width, option.height);
        $(this._paper.canvas).click(function() {
            ShapeBox.unSelectAll();
        });
    },

    loadImage: function(option) {
        "use strict";
        var imageShapeBox = new ImageShapeBox({
            paper: this._paper,
            path: option.imgPath,
            width: option.imgWidth,
            height: option.imgHeight
        });
        return imageShapeBox;
    },

    /**
     * @param option
     */
    addText: function(option) {
        var textShapeBox = new TextShapeBox({
            paper: this._paper,
            x: option.x,
            y: option.y,
            text: option.text,
            fontFamily: option.fontFamily,
            fontSize: option.fontSize,
            fontColor: option.fontColor
        });
        return textShapeBox;
    },

    /**
     * 获取画布
     * @returns {paper}
     */
    getPaper: function() {
        "use strict";
        return this._paper;
    },

    /**
     * 清空画布，移除dom对象
     */
    clear: function() {
        "use strict";
        ShapeBox.clear();
    },

    /**
     * 预览
     * @param canvasDom
     */
    toCanvas: function(canvasDom) {
        "use strict";
        // 1. 先清除选中状态
        ShapeBox.unSelectAll();
        // 2. 进行转换成canvas
        canvg(canvasDom, this._paper.canvas.outerHTML);
    },

    /**
     * 另存为
     */
    saveAs: function() {
        "use strict";

    }
};




},{"./shapeBox/config":8,"./shapeBox/imageShapeBox":9,"./shapeBox/shapeBox":12,"./shapeBox/textShapeBox":13}],8:[function(require,module,exports){
/**
 * @file
 * @author jinguangguo
 * @date 2015/11/21
 */

module.exports = {

    DEBUG: true,

    FONTS: [
        {
            name: 'Arial',
            style: 'Arial, Helvetica, sans-serif'
        },
        {
            name: 'Arial Black',
            style: 'Arial Black, Gadget, sans-serif'
        },
        {
            name: 'Arial Narrow',
            style: 'Arial Narrow’, sans-serif'
        },
        {
            name: 'Verdana',
            style: 'Verdana, Geneva, sans-serif'
        },
        {
            name: 'Georgia',
            style: 'Georgia, serif'
        },
        {
            name: 'Times New Roman',
            style: 'Times New Roman, Times, serif'
        },
        {
            name: 'Trebuchet MS',
            style: 'Trebuchet MS, Helvetica, sans-serif'
        },
        {
            name: 'Courier',
            style: 'Courier, monospace'
        },
        {
            name: 'Courier New',
            style: 'Courier New, Courier, monospace'
        },
        {
            name: 'Impact',
            style: 'Impact, Charcoal, sans-serif'
        },
        {
            name: 'Comic Sans MS',
            style: 'Comic Sans MS, cursive'
        },
        {
            name: 'Tahoma',
            style: 'Tahoma, Geneva, sans-serif'
        },
        {
            name: 'Lucida Sans Unicode',
            style: 'Lucida Sans Unicode, Lucida Grande, sans-serif'
        },
        {
            name: 'Lucida Console',
            style: 'Lucida Console, Monaco, monospace'
        },
        {
            name: 'Garamond',
            style: 'Garamond, serif'
        },
        {
            name: 'MS Sans Serif',
            style: 'MS Sans Serif, Geneva, sans-serif'
        },
        {
            name: 'MS Serif',
            style: 'MS Serif, New York, sans-serif'
        },
        {
            name: 'Palatino Linotype',
            style: 'Palatino Linotype, Book Antiqua, Palatino, serif'
        },
        {
            name: 'Symbol',
            style: 'Symbol, sans-serif'
        },
        {
            name: 'Bookman Old Style',
            style: 'Bookman Old Style, serif'
        }
    ]
};

},{}],9:[function(require,module,exports){
/**
 * @file
 * @author jinguangguo
 * @date 2015/11/19
 */


var ShapeBox = require('./shapeBox.js');

/**
 * 图片
 * @param option
 * @property option.path 图片路径
 * @property option.x
 * @property option.y
 * @property option.width 宽度
 * @property option.height 高度
 * @constructor
 */
var ImageShapeBox = function(option) {
    "use strict";

    this._option = option;

    this._paper = option.paper;

    this._path = option.path;
    this._width = option.width;
    this._height = option.height;

    var position = getPositionOfImage(this._width, this._height, this._paper.width, this._paper.height);
    this._x = option.x || position.left;
    this._y = option.y || position.top;

    this._element = this._paper.image(this._path, this._x, this._y, this._width, this._height);

    this._childInit();
};

/**
 * 居中显示图片
 * @param imgWidth
 * @param imgHeight
 * @param paperWidth
 * @param paperHeight
 * @returns {{left: *, top: *}}
 */
function getPositionOfImage(imgWidth, imgHeight, paperWidth, paperHeight) {
    "use strict";
    var leftCha = paperWidth - imgWidth;
    var left;
    if (leftCha > 0) {
        left = leftCha / 2;
    } else {
        left = 0;
    }
    var topCha = paperHeight - imgHeight;
    var top;
    if (topCha > 0) {
        top = topCha / 2;
    } else {
        top = 0;
    }
    return {
        left: left,
        top: top
    }
}

ImageShapeBox.TYPE = ShapeBox.Type_Image;
ImageShapeBox.prototype = new ShapeBox(ImageShapeBox.TYPE);

$.extend(ImageShapeBox.prototype, {

    constructor: ImageShapeBox,

    _childInit: function(option) {
        "use strict";
        this.init();
    }

});

module.exports = ImageShapeBox;

},{"./shapeBox.js":12}],10:[function(require,module,exports){
/**
 * @file
 * @author jinguangguo
 * @date 2015/11/21
 */

var artDialog = require('../../dialog/dialog');

var CONFIG = require('./config');

var MenuTool = function(element, shapeBox) {
    "use strict";
    this._element = element;
    this._shapeBox = shapeBox;
    this._$ui = null;
    this._x = null;
    this._y = null;
    this._init();
};

MenuTool.SHOW_SHIFT_X = 6;
MenuTool.SHOW_SHIFT_Y = 10;

MenuTool.MUNU_HEIGHT = 40;

MenuTool.COPY_SHIFT_X = 30;
MenuTool.COPY_SHIFT_Y = 30;

MenuTool.singleton = null;

MenuTool.isEmptyObject = function(obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
};

MenuTool.obtain = function() {
    "use strict";
    if (!MenuTool.singleton) {
        MenuTool.singleton = new MenuTool();
    }
    return MenuTool.singleton;
};

$.extend(MenuTool.prototype, {

    _init: function() {
        "use strict";
    },

    _setUi: function() {
        "use strict";

        var fontHtml = '';

        var ShapeBoxSuper = this._shapeBox.super;

        switch (this._shapeBox._type) {
            case ShapeBoxSuper.Type_Text:
                fontHtml = [
                    '<a class="item">',
                        '<i class="edit icon" id="edit"></i>',
                    '</a>',
                    '<a class="item">',
                        '<i class="font icon" id="font"></i>',
                    '</a>'
                ].join('');
                break;
            case ShapeBoxSuper.Type_Image:
            default:
                fontHtml = '';
        }

        var html = [
            '<div class="paper-menu paper-menu-'+ this._shapeBox._type +'">',
                // 'compact'
                '<div class="ui icon menu">',
                    fontHtml,
                    //'<a class="item">',
                    //    '<i class="italic icon" id="italic"></i>',
                    //'</a>',
                    //'<a class="item">',
                    //    '<i class="bold icon" id="bold"></i>',
                    //'</a>',

                    '<a class="item">',
                        '<i class="copy icon" id="copy"></i>',
                    '</a>',
                    '<a class="item">',
                        '<i class="remove icon" id="remove"></i>',
                    '</a>',
                    '<a class="item">',
                        '<i class="linkify icon" id="linkify"></i>',
                    '</a>',
                    '<a class="item">',
                        '<i class="barcode icon" id="opacity"></i>',
                    '</a>',
                    '<a class="item">',
                        '<i class="repeat icon" id="rotate"></i>',
                    '</a>',
                '</div>',
            '</div>'
        ].join('');
        this._$ui = $(html);
    },

    _bind: function() {
        "use strict";

        var that = this;

        // 编辑
        this._$ui.find('#edit').click(function() {
            var getHtml = function() {
                var attrs = that._element.attrs;
                return (
                    '<div class="module-edit">' +
                        '<label class="edit-label">' +
                            '请输入文本内容：' +
                            '<input type="text" class="j-edit" value="' + attrs.text + '">' +
                        '</label>' +
                    '</div>'
                );
            };
            artDialog({
                title: '编辑',
                content: getHtml(),
                okValue: '确定',
                ok: function() {
                    var value = this.$content.find('.j-edit').val();
                    that._element.attr({
                        text: value
                    });
                    that._shapeBox.selected();
                }
            }).showModal();
        });

        // 删除 - ok
        this._$ui.find('#remove').click(function() {
            that._shapeBox.destroy();
            that._shapeBox.super.remove(that._shapeBox);
        });

        // 复制 - ok
        this._$ui.find('#copy').click(function() {
            var constructor = that._shapeBox.constructor;
            var newOption = $.extend({}, that._shapeBox._option);
            var attrs = that._element.attrs;
            var ShapeBoxSuper = that._shapeBox.super;
            switch (that._shapeBox._type) {
                case ShapeBoxSuper.Type_Text:
                    newOption.text = attrs.text;
                    newOption.fontFamily = attrs['font-family'];
                    newOption.fontSize = attrs['font-size'];
                    break;
                case ShapeBoxSuper.Type_Image:
                default:
                    newOption.width = attrs.width;
                    newOption.height = attrs.height;
            }
            newOption.x = attrs.x + MenuTool.COPY_SHIFT_X;
            newOption.y = attrs.y + MenuTool.COPY_SHIFT_Y;
            var instance = new constructor(newOption);
        });

        // 超链接
        this._$ui.find('#linkify').click(function() {
            var dialog = artDialog({
                title: '提示',
                content: '<div class="module-link">' +
                            '<label class="link-label">' +
                                '请输入超链接地址：' +
                                '<input type="text" class="j-link" value="http://">' +
                            '</label>' +
                        '</div>',
                ok: function() {
                    var link = this.$content.find('.j-link').val();
                    that._element.attr({
                        href: link,
                        target: '_blank'
                    });
                }
            });
            dialog.showModal();
        });

        // 透明度
        this._$ui.find('#opacity').click(function() {
            var dialog = artDialog({
                title: '提示',
                content: '<div class="module-opacity">' +
                '<label class="link-label">' +
                '选择透明度：' +
                '<select class="j-opacity">' +
                '<option value="0.1">10</option>' +
                '<option value="0.2">20</option>' +
                '<option value="0.3">30</option>' +
                '<option value="0.4">40</option>' +
                '<option value="0.5">50</option>' +
                '<option value="0.6">60</option>' +
                '<option value="0.7">70</option>' +
                '<option value="0.8">80</option>' +
                '<option value="0.9">90</option>' +
                '<option value="1" selected>100</option>' +
                '</select>' +
                '</label>' +
                '</div>',
                ok: function() {
                    var opacity = this.$content.find('.j-opacity').val();
                    that._element.attr({
                        opacity: opacity
                    });
                }
            });
            dialog.showModal();
        });

        // 设置文本属性
        this._$ui.find('#font').click(function() {

            function getFontListHtml() {
                var FONT_LIST = CONFIG.FONTS;
                var resultArray = [];
                $.map(FONT_LIST, function(font, index) {
                    resultArray.push('<option value="' + font.style + '">' + font.name + '</option>');
                });
                return [
                    '<select class="j-font-family">',
                    resultArray.join(''),
                    '</select>'
                ].join('');
            }

            var attrs = that._element.attrs;

            var dialog = artDialog({
                title: '提示',
                content:
                    '<div class="module-font">' +
                        '<p class="row">' +
                            getFontListHtml() +
                        '</p>' +
                        '<p class="row">' +
                            '<label class="link-label">' +
                                '请输入文字大小：' +
                                '<input type="text" class="j-size" value="' + attrs['font-size'] + '">' +
                            '</label>' +
                        '</p>' +
                        '<p class="row">' +
                            '选择颜色：' +
                            '<select class="j-color">' +
                                '<option value="red">red</option>' +
                                '<option value="purple">purple</option>' +
                                '<option value="orange" selected>orange</option>' +
                            '</select>' +
                        '</p>' +
                        '<p class="row">' +
                            '是否倾斜：' +
                            '<select class="j-italic">' +
                                '<option value="bold">是</option>' +
                                '<option value="normal">否</option>' +
                            '</select>' +
                        '</p>' +
                        '<p class="row">' +
                            '是否加粗：' +
                            '<select class="j-bold">' +
                                '<option value="bold">是</option>' +
                                '<option value="normal">否</option>' +
                            '</select>' +
                        '</p>' +
                    '</div>',
                ok: function() {
                    var fontFamily = this.$content.find('.j-font-family').val();
                    var fontSize = this.$content.find('.j-size').val();
                    var fontColor = this.$content.find('.j-color').val();
                    var fontBold = this.$content.find('.j-bold').val();
                    that._element.attr({
                        'font-family': fontFamily,
                        'font-size': fontSize,
                        'fill': fontColor,
                        'font-weight': fontBold
                    });
                }
            });
            dialog.showModal();
        });

        // 旋转
        this._$ui.find('#rotate').click(function() {

            var getHtml = function() {
                return (
                    '<div class="module-rotate">' +
                        '<p class="row">' +
                            '<label class="link-label">' +
                                '请输入旋转角度：' +
                                '<input type="number" class="j-rotate">' +
                            '</label>' +
                        '</p>' +
                    '</div>'
                );
            };

            var dialog = artDialog({
                title: '提示',
                content: getHtml(),
                ok: function() {
                    var rotate = this.$content.find('.j-rotate').val();
                    that._element.rotate(rotate);
                }
            });
            dialog.showModal();
        });

    },

    /**
     * 获取menu的位置
     * @private
     */
    _setMenuPosition: function() {
        "use strict";
        var attrs = this._element.attrs;
        this._x = attrs.x - MenuTool.SHOW_SHIFT_X;
        this._y = attrs.y - MenuTool.SHOW_SHIFT_Y - MenuTool.MUNU_HEIGHT;
    },

    _setMenuPositionOfText: function() {
        "use strict";
        var attrs = this._element.attrs;
        if (CONFIG.DEBUG === true) {
            console.log('attrs.width:' + attrs.width);
        }
        this._x = attrs.x - attrs.width / 2 - MenuTool.SHOW_SHIFT_X;
        this._y = attrs.y - attrs.height / 2 - MenuTool.SHOW_SHIFT_Y- MenuTool.MUNU_HEIGHT;
    },

    _showMenu: function() {
        "use strict";
        this._setUi();
        this._bind();
        this._showUi();
    },

    _showUi: function() {
        "use strict";
        // FIXME 移动端不出现这个menuTool
        if (MenuTool.isEmptyObject($.os)) {
            this._$ui.css({
                position: 'absolute',
                left: this._x,
                top: this._y,
                zIndex: 3
            });
            $(this._element.paper.canvas.parentNode).append(this._$ui);
        }
    },

    _doText: function() {
        "use strict";
        this._setMenuPositionOfText();
        this._showMenu();
    },

    _doImage: function() {
        "use strict";
        this._setMenuPosition();
        this._showMenu();
    },

    rebuild: function() {
        "use strict";
        this.destroy();
        var that = this;
        var ShapeBoxSuper = this._shapeBox.super;
        switch (this._shapeBox._type) {
            case ShapeBoxSuper.Type_Text:
                this._doText();
                break;
            case ShapeBoxSuper.Type_Image:
            default:
                this._doImage();
        }
    },

    destroy: function() {
        "use strict";
        if (this._$ui) {
            this._$ui.remove();
            this._$ui = null;
        }
    }

});

module.exports = MenuTool;

},{"../../dialog/dialog":3,"./config":8}],11:[function(require,module,exports){
/**
 * @file
 * @author jinguangguo
 * @date 2015/11/20
 */

var CONFIG = require('./config');

var ScaleTool = function(element, shapeBox) {
    "use strict";
    this._element = element;
    this._shapeBox = shapeBox;
    this._rt = null;    // 小矩形框
    this._srt = null;   // 选中框
    this._init();
};

ScaleTool.singleton = null;

ScaleTool.obtain = function() {
    "use strict";
    if (!ScaleTool.singleton) {
        ScaleTool.singleton = new ScaleTool();
    }
    return ScaleTool.singleton;
};

ScaleTool.RECT_WH = 20;
ScaleTool.RECT_PADDING = 5;

$.extend(ScaleTool.prototype, {

    _init: function() {
        "use strict";
    },

    /**
     * 校正小矩形的位置
     * @private
     */
    _resetRectPosition: function() {
        "use strict";
        var rectPosition;
        if (this._rt) {
            rectPosition = this._getRectPosition();
            this._rt.attr({
                x: rectPosition.x,
                y: rectPosition.y
            });
        }
    },

    /**
     * 矫正选中框的位置
     * @private
     */
    _resetSelectRectPosition: function() {
        "use strict";
        var rectPosition;
        if (this._srt) {
            rectPosition = this._getSelectRectAttrs();
            this._srt.attr({
                x: rectPosition.x,
                y: rectPosition.y,
                width: rectPosition.width,
                height: rectPosition.height
            });
        }
    },

    /**
     * 入口：改变工具位置
     */
    resetPosition: function() {
        "use strict";
        this._resetRectPosition();
        this._resetSelectRectPosition();
    },

    /**
     * 获取拖拽框的位置
     * @returns {{x: *, y: *}}
     * @private
     */
    _getRectPosition: function() {
        "use strict";
        var attrs = this._element.attrs;
        var result = {};
        var ShapeBoxSuper = this._shapeBox.super;

        switch (this._shapeBox._type) {
            case ShapeBoxSuper.Type_Text:
                result = {
                    x: attrs.x + attrs.width / 2,
                    y: attrs.y + attrs.height / 2
                };
                break;
            case ShapeBoxSuper.Type_Image:
            default:
                result = {
                    x: attrs.x + attrs.width,
                    y: attrs.y + attrs.height
                };
        }

        if (CONFIG.DEBUG === true) {
            console.log('[_getRectPosition][' + this._shapeBox._type + ']' + JSON.stringify(result));
        }

        return result;
    },

    /**
     * 获取选中框的位置
     * @returns {{x: number, y: number, width: *, height: *}}
     * @private
     */
    _getSelectRectAttrs: function() {
        "use strict";
        var attrs = this._element.attrs;
        var result = {};

        var ShapeBoxSuper = this._shapeBox.super;

        switch (this._shapeBox._type) {
            case ShapeBoxSuper.Type_Text:
                result = {
                    x: attrs.x - attrs.width / 2 - ScaleTool.RECT_PADDING,
                    y: attrs.y - attrs.height / 2 - ScaleTool.RECT_PADDING,
                    width: attrs.width + ScaleTool.RECT_PADDING * 2,
                    height: attrs.height + ScaleTool.RECT_PADDING * 2
                };
                break;
            case ShapeBoxSuper.Type_Image:
            default:
                result = {
                    x: attrs.x - ScaleTool.RECT_PADDING,
                    y: attrs.y - ScaleTool.RECT_PADDING,
                    width: attrs.width + ScaleTool.RECT_PADDING * 2,
                    height: attrs.height + ScaleTool.RECT_PADDING * 2
                };
        }
        if (CONFIG.DEBUG === true) {
            console.log('[_getSelectRectAttrs][' + this._shapeBox._type + ']' + JSON.stringify(result));
        }

        return result;
    },

    _setSelectRect: function() {
        "use strict";
        var selectRectAttrs = this._getSelectRectAttrs();
        this._srt = this._shapeBox._paper.rect(selectRectAttrs.x, selectRectAttrs.y, selectRectAttrs.width, selectRectAttrs.height).attr({
            'fill': 'none',
            'stroke': '#000',
            'stroke-opacity': 0.3,
            'stroke-width': 1,
            'cursor': 'default'
        });
    },

    _bindDrag: function() {
        "use strict";

        var that = this;

        var _startTransformX = 0;   // 始终存储已经移动了的距离
        var _startTransformY = 0;   // 始终存储已经移动了的距离
        var _dx = 0;
        var _dy = 0;

        var getHeightByWidth = (function(that) {
            var attrs = that._element.attrs;
            var percentage = attrs.width / attrs.height;
            return function(width) {
                return width / percentage;
            };
        })(this);

        that._rt.drag(function(dx, dy, x, y, event) {

            var rectInstance = this;

            function doLog() {
                var newX = _startTransformX + dx;
                var newY = _startTransformY + dy;
                if (CONFIG.DEBUG) {
                    console.log('x:' + x + ', y:' + y);
                    console.log('dx:' + dx + ', dy:' + dy);
                    console.log('[move] newX:' + newX + ', newY:' + newY);
                }
            }

            // OK
            //function setRectPosition() {
            //    //rectInstance.transform('t' + (rectInstance.data('_startTransformX') + dx) + ','
            //    //    + (rectInstance.data('_startTransformY') + dy));
            //    var rectPosition = that._getRectPosition();
            //    rectInstance.attr({
            //        x: rectPosition.x,
            //        y: rectPosition.y
            //    });
            //}

            // OK
            function setElementSize() {
                var newWidth = rectInstance.data('initElementWidth') + dx;
                var newHeight = getHeightByWidth(newWidth);

                that._element.attr({
                    width: newWidth,
                    height: newHeight
                });
            }

            setElementSize();
            that.resetPosition();

        }, function(x, y, event) {
            if (CONFIG.DEBUG) {
                console.log('start move ...');
            }
            var attrs = that._element.attrs;

            this.data('_startTransformX', _startTransformX + _dx);
            this.data('_startTransformY', _startTransformY + _dy);

            this.data('initElementWidth', attrs.width);
            this.data('initElementHeight', attrs.height);

            // 销毁菜单栏
            that._shapeBox._menuTool.destroy();

        }, function(x, y, event) {
            if (CONFIG.DEBUG) {
                console.log('end move ...');
            }
            // 执行下面两个方法
            // 1.重新设置文本框的大小
            // 2.重新设置小矩阵和选中框
            that._shapeBox.selected();
        });
    },

    _bindDragOfText: function() {
        "use strict";
        var that = this;

        var _startTransformX = 0;   // 始终存储已经移动了的距离
        var _startTransformY = 0;   // 始终存储已经移动了的距离
        var _dx = 0;
        var _dy = 0;

        that._rt.drag(function(dx, dy, x, y, event) {

            var rectInstance = this;

            function doLog() {
                if (CONFIG.DEBUG) {
                    console.log('dx:' + dx + ', dy:' + dy);
                }
            }

            doLog();

            // OK
            function setElementSize() {
                var resultD;
                //if (Math.abs(dx) >= Math.abs(dy)) {
                //    resultD = dx;
                //} else {
                //    resultD = dy;
                //}

                resultD = dx;

                // 以横坐标为基准进行自体的放大与缩小
                that._element.attr({
                    'font-size': rectInstance.data('initFontSize') + resultD
                });
                if (CONFIG.DEBUG === true) {
                    console.log('that._element.attrs:' + JSON.stringify(that._element.attrs));
                }
            }

            setElementSize();

            // 拖动过程中，对选中框和小矩阵的位置进行调整
            that.resetPosition();

        }, function(x, y, event) {
            if (CONFIG.DEBUG === true) {
                console.log('start move ...');
            }
            // 隐藏小矩阵和选中矿
            that.hide();
            // 销毁菜单栏
            that._shapeBox._menuTool.destroy();
            var attrs = that._element.attrs;
            this.data('initFontSize', attrs['font-size']);
        }, function(x, y, event) {
            if (CONFIG.DEBUG === true) {
                console.log('end move ...');
            }
            // 执行下面两个方法
            // 1.重新设置文本框的大小
            // 2.重新设置小矩阵和选中框
            that._shapeBox.selected();
        });
    },

    rebuild: function() {
        "use strict";

        this.destroy();

        var rectPosition = this._getRectPosition();

        var bottomRight = {
            x: rectPosition.x,
            y: rectPosition.y
        };

        this._setSelectRect();

        this._rt = this._shapeBox._paper.rect(bottomRight.x, bottomRight.y, ScaleTool.RECT_WH, ScaleTool.RECT_WH).attr({
            cursor: 'nwse-resize',
            fill: '#fff',
            stroke: '#16ab39'
        });

        var ShapeBoxSuper = this._shapeBox.super;
        switch (this._shapeBox._type) {
            case ShapeBoxSuper.Type_Text:
                this._bindDragOfText();
                break;
            case ShapeBoxSuper.Type_Image:
            default:
                this._bindDrag();
        }

    },

    hide: function() {
        "use strict";
        this._rt.attr({
            opacity: 0
        });
        this._srt.attr({
            opacity: 0
        });
    },

    destroy: function() {
        "use strict";
        if (this._rt) {
            this._rt.remove();
            this._rt = null;
        }
        if (this._srt) {
            this._srt.remove();
            this._srt = null;
        }
    }

});

module.exports = ScaleTool;

},{"./config":8}],12:[function(require,module,exports){
/**
 * @file 形状类的超类
 * @author jinguangguo
 * @date 2015/11/18
 */

var ScaleTool = require('./scaleTool.js');

var MenuTool = require('./menuTool.js');

var CONFIG = require('./config.js');

var ShapeBox = function(type) {
    "use strict";
    // must be override
    this._element = null;
    // must be override
    this._$ui = null;
    this._type = type;
    this._scaleTool = null;
    this._menuTool = null;
};

ShapeBox.Type_Text = 'TEXT';
ShapeBox.Type_Image = 'IMAGE';

// 所有实例
ShapeBox.instances = [];

ShapeBox.unSelectAll = function() {
    "use strict";
    if (CONFIG.DEBUG === true) {
        console.log('ShapeBox.instances length:' + ShapeBox.instances.length);
    }
    $.map(ShapeBox.instances, function(shapeBox, index) {
        shapeBox.unselected();
    });
};

ShapeBox.add = function(instance) {
    "use strict";
    ShapeBox.instances.push(instance);
};

ShapeBox.remove = function(instance) {
    "use strict";
    $.map(ShapeBox.instances, function(shapeBox, index) {
        if (shapeBox === instance) {
            ShapeBox.instances.splice(index, 1);
        }
    });
};

ShapeBox.clear = function() {
    "use strict";
    $.map(ShapeBox.instances, function(shapeBox, index) {
        shapeBox.destroy();
    });
    ShapeBox.instances = [];
};

// 生成的对象数量
ShapeBox.boxCount = 0;

$.extend(ShapeBox.prototype, {
    /**
     * @override
     */
    onSelected: function() {
        "use strict";
    },

    /**
     * @override
     */
    onDrag: function(newX, newY) {
        "use strict";
    },

    /**
     * @override
     */
    onUnselected: function() {
        "use strict";

    },

    /**
     * @override
     */
    onShow: function() {
        "use strict";

    }
});

$.extend(ShapeBox.prototype, {

    constructor: ShapeBox,

    super: ShapeBox,

    init: function() {
        "use strict";
        this._bind();
        this._scaleTool = new ScaleTool(this._element, this);
        this._menuTool = new MenuTool(this._element, this);
        ShapeBox.boxCount++;
        ShapeBox.add(this);
    },

    _bind: function() {
        "use strict";

        var that = this;

        // 选中
        this._element.click(function(event) {
            event.stopPropagation();
            console.log('click...');
            that.selected();
        });

        this._element.touchstart(function(event) {
            event.stopPropagation();
            console.log('touchstart...');
            that.selected();
        });

        // 拖拽
        this._element.drag(function(dx, dy, x, y, event) {
            var startX = that._x;
            var startY = that._y;
            var newX = startX + dx;
            var newY = startY + dy;
            if (CONFIG.DEBUG === true) {
                console.log('x:' + x + ', y:' + y);
                console.log('dx:' + dx + ', dy:' + dy);
                console.log('[move] newX:' + newX + ', newY:' + newY);
            }
            this.attr({
                x: newX,
                y: newY
            });
            that.onDrag(newX, newY);
            // 改变_scaleTool的位置
            that._scaleTool.resetPosition();
        }, function(x, y, event) {
            event.stopPropagation();
            if (CONFIG.DEBUG === true) {
                console.log('start move ...');
            }
            that._menuTool.destroy();
        }, function(event) {
            event.stopPropagation();
            if (CONFIG.DEBUG === true) {
                console.log('end move ...');
            }
            that._x = this.attrs.x;
            that._y = this.attrs.y;
            that._menuTool.rebuild();
        });
    },

    /**
     * 选中状态
     */
    selected: function() {
        "use strict";
        ShapeBox.unSelectAll();
        this.onSelected();
        this._scaleTool.rebuild();
        this._menuTool.rebuild();
    },

    /**
     * 取消选中
     */
    unselected: function() {
        "use strict";
        this._scaleTool.destroy();
        this._menuTool.destroy();
    },

    setType: function(type) {
        "use strict";
        this._type = type;
    },

    getType: function() {
        "use strict";
        return this._type;
    },

    getElement: function() {
        "use strict";
        return this._element;
    },

    /**
     * 外界销毁实例，只需要调用这个方法即可
     */
    destroy: function() {

        "use strict";

        this._element.remove();
        this._element = null;

        if (this._$ui) {
            this._$ui.remove();
            this._$ui = null;
        }

        this._type = '';

        this._scaleTool.destroy();
        this._scaleTool = null;

        this._menuTool.destroy();
        this._menuTool = null;

    }

});

module.exports = ShapeBox;



},{"./config.js":8,"./menuTool.js":10,"./scaleTool.js":11}],13:[function(require,module,exports){
/**
 * @file
 * @author jinguangguo
 * @date 2015/11/19
 */

var ShapeBox = require('./shapeBox.js');

var CONFIG = require('./config.js');

/**
 *
 * @param option
 * @property option.text 文本
 * @property option.fontFamily 文本字体
 * @property option.fontSize 文本大小
 * @property option.fontColor 文本颜色
 * @property option.x 坐标x
 * @property option.y 坐标y
 * @constructor
 */
var TextShapeBox = function(option) {
    "use strict";

    this._option = option;

    this._paper = option.paper;

    this._text = option.text;
    this._fontFamily = option.fontFamily || TextShapeBox.DEFAULT_FONT_FAMILY;
    this._fontSize = option.fontSize || TextShapeBox.DEFAULT_FONT_SIZE;
    this._fontColor = option.fontColor || TextShapeBox.DEFAULT_FONT_COLOR;
    this._x = option.x || this._paper.width / 2;
    this._y = option.y || this._paper.height / 4;

    this._element = this._paper.text(this._x, this._y, this._text).attr({
        'text': this._text,
        'font-size': this._fontSize,
        'font-family': this._fontFamily,
        'fill': this._fontColor,
        'text-anchor': 'middle'
    });

    // this._$virtualDom
    // this._width
    // this._height
    this._setVirtualDom();

    this._childInit();
};

TextShapeBox.DEFAULT_FONT_FAMILY = 'Arial';
TextShapeBox.DEFAULT_FONT_SIZE = 54;
TextShapeBox.DEFAULT_FONT_COLOR = '#000';

TextShapeBox.Type_Dom = 1;
TextShapeBox.Type_Svg = 2;

TextShapeBox.TYPE = ShapeBox.Type_Text;
TextShapeBox.prototype = new ShapeBox(ShapeBox.Type_Text);

$.extend(TextShapeBox.prototype, {

    constructor: TextShapeBox,

    _childInit: function(option) {
        "use strict";
        this.init();
    },

    /**
     * 创建虚拟DOM
     * @returns {*|jQuery}
     * @private
     */
    _createVirtualDom: function() {
        "use strict";
        var attrs = this._element.attrs;
        return $('<div class="virtual-dom">' + attrs.text + '</div>').css({
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: -999999,
            fontFamily: attrs['font-family'],
            fontSize: +attrs['font-size'],
            fontWeight: attrs['font-weight'],
            visibility: 'hidden',
            lineHeight: 1
        }).appendTo(this._paper.canvas.parentNode);
    },

    /**
     * 获取高度和高度所设置的虚拟DOM
     * @private
     */
    _setVirtualDom: function() {
        "use strict";
        if (this._$virtualDom) {
            this._$virtualDom.remove();
        }

        this._$virtualDom = this._createVirtualDom();

        this._width = this._$virtualDom.width();
        this._height = this._$virtualDom.height();

        if (CONFIG.DEBUG === true) {
            console.log('this._width:' + this._width);
            console.log('this._height:' + this._height);
        }

        this._element.attr({
            width: this._width,
            height: this._height
        });
    },

    /**
     * 重构
     * @private
     */
    rebuild: function() {
        "use strict";
        this._setVirtualDom();
    },

    focus: function() {
        "use strict";
        this.selected();
    },

    onDrag: function(newX, newY) {
        "use strict";
    },

    onSelected: function() {
        "use strict";
        this.rebuild();
    }

});

module.exports = TextShapeBox;

},{"./config.js":8,"./shapeBox.js":12}],14:[function(require,module,exports){
/**
 * @file
 * @author jinguangguo
 * @date 2015/11/14
 */

var PaperManager = require('../paperManager/paperManager');
var Canvas2Image = require('../paperManager/Canvas2Image');

var artDialog = require('../dialog/dialog');

var SaveAsDialog = require('../saveAsDialog/saveAsDialog');

// 左侧的题材库组件
var Pic = React.createClass({displayName: "Pic",

    // 缓存变量
    cache: {
        $module: null,
        nodeCanvas: $('<canvas id="canvas"></canvas>')[0]
    },

    // 初始化
    getInitialState: function() {
        return {

        };
    },

    clear: function() {
        "use strict";
        PaperManager.clear();
    },

    preview: function() {
        "use strict";
        var that = this;
        var dialog = artDialog({
            title: '预览',
            width: PaperManager.getPaper().width,
            height: PaperManager.getPaper().height,
            content: this.cache.nodeCanvas,
            onshow: function() {
                PaperManager.toCanvas(that.cache.nodeCanvas);
            },
            okValue: '另存为',
            ok: function() {
                this.remove();
                that.saveAs();
            },
            cancelValue: '取消',
            cancel: function() {

            }
        });
        dialog.showModal();
    },

    saveAs: function() {
        "use strict";
        var that = this;
        // var saveAsDialog = new SaveAsDialog().render();
        var dialog = artDialog({
            title: '另存为',
            align: 'left',
            content: React.findDOMNode(this.refs.SaveAsDialogContainer).innerHTML,
            onshow: function() {
                PaperManager.toCanvas(that.cache.nodeCanvas);
            },
            okValue: '确定',
            ok: function() {
                //var name = this.$content.find('.j-image-name').val();
                var type = this.$content.find('.j-image-type').val();
                Canvas2Image.saveAsImage(that.cache.nodeCanvas, PaperManager.getPaper().width, PaperManager.getPaper().height, type);
            },
            cancelValue: '取消',
            cancel: function() {

            }
        });
        dialog.show();
    },

    componentDidMount: function() {
        "use strict";
        var $module = $(React.findDOMNode(this.refs.module));
        this.cache.$module = $module;
        var $paper = $module.find('.pic-paper');

        PaperManager.createPaper({
            container: $paper,
            width: $paper.width(),
            height: $paper.height()
        });

        PaperManager.loadImage({
            imgPath: '../static/img/demo11.jpg',
            imgWidth: 510,
            imgHeight: 682
        });
    },

    upload: function() {
        "use strict";
        artDialog({
            title: '提示',
            content: '待调试...',
            okValue: '确定'
        }).show();
    },

    saveToServer: function() {
        "use strict";
        artDialog({
            title: '提示',
            content: '待调试...',
            okValue: '确定'
        }).show();
    },

    render: function() {
        "use strict";
        return (
            React.createElement("div", {className: "module-pic", ref: "module"}, 
                React.createElement("div", {className: "pic-paper"}), 
                React.createElement("div", {className: "module-buttons"}, 
                    React.createElement("button", {className: "ui teal basic button", onClick: this.upload}, "上传"), 
                    React.createElement("button", {className: "ui orange basic button", onClick: this.preview}, "预览"), 
                    React.createElement("button", {className: "ui olive basic button", onClick: this.saveAs}, "另存为图片"), 
                    React.createElement("button", {className: "ui green basic button", onClick: this.clear}, "清空")
                    /*
                     <button className="ui teal basic button">Teal</button>
                     <button className="ui blue basic button">Blue</button>
                     <button className="ui violet basic button">Violet</button>
                     <button className="ui purple basic button">Purple</button>
                     <button className="ui pink basic button">Pink</button>
                     <button className="ui brown basic button">Brown</button>
                     <button className="ui grey basic button">Grey</button>
                     <button className="ui black basic button">Black</button>
                     */
                ), 
                React.createElement("div", {ref: "SaveAsDialogContainer", style: {display: 'none'}}, 
                    React.createElement(SaveAsDialog, null)
                )
            )
        );
    }
});

module.exports = Pic;


},{"../dialog/dialog":3,"../paperManager/Canvas2Image":6,"../paperManager/paperManager":7,"../saveAsDialog/saveAsDialog":15}],15:[function(require,module,exports){
/**
 * @file
 * @author jinguangguo
 * @date 2015/11/17
 */

var SaveAsDialog = React.createClass({displayName: "SaveAsDialog",

    getInitialState: function() {
        return {

        };
    },

    render: function() {
        "use strict";
        return (
            React.createElement("div", {className: "widget-savead-dialog"}, 
                React.createElement("p", {className: "name"}, 
                    React.createElement("babel", null, "请输入存储名称："), 
                    React.createElement("input", {type: "text", name: "name", className: "j-image-name"})
                ), 
                React.createElement("p", {className: "select"}, 
                    React.createElement("babel", null, "请选择存储格式："), 
                    React.createElement("select", {className: "j-image-type"}, 
                        React.createElement("option", {value: "png", selected: true}, "png"), 
                        React.createElement("option", {value: "jpeg"}, "jpeg"), 
                        React.createElement("option", {value: "bmp"}, "bmp")
                    )
                ), 
                React.createElement("div", {className: "content"}, "另存为对话框的内容")
            )
        );
    }
});

module.exports = SaveAsDialog;

},{}],16:[function(require,module,exports){
/**
 * @file
 * @author jinguangguo
 * @date 2015/11/14
 */

var TEXTS = [
    {
        txt: '开学季新装备'
    },
    {
        txt: '精品课程大促销'
    }
];

var ShowText = React.createClass({displayName: "ShowText",
    render: function() {
        "use strict";
        var items = [];
        _.forEach(TEXTS, function(text, index) {
            items.push(
                React.createElement("li", {className: "item"}, 
                    React.createElement("a", {href: "javascript:;", title: text.txt, className: "item-link"}, 
                        text.txt
                    )
                )
            );
        });
        return (
            React.createElement("ul", {className: "widget-show-text"}, 
                items
            )
        );
    }
});

module.exports = ShowText;

},{}]},{},[1])