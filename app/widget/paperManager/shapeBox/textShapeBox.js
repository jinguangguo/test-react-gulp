/**
 * @file
 * @author jinguangguo
 * @date 2015/11/19
 */

var ShapeBox = require('./shapeBox.js');

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

    this._paper = option.paper;

    this._text = option.text;
    this._fontFamily = option.fontFamily || TextShapeBox.DEFAULT_FONT_FAMILY;
    this._fontSize = option.fontSize || TextShapeBox.DEFAULT_FONT_SIZE;
    this._fontColor = option.fontColor || TextShapeBox.DEFAULT_FONT_COLOR;
    this._x = option.x || this._paper.width / 2;
    this._y = option.y || this._paper.height / 4;

    this._element = this._paper.text(this._x, this._y, this._text).attr({
        'font-size': this._fontSize,
        'font-family': this._fontFamily,
        'fill': this._fontColor,
        'text-anchor': 'middle'
    });

    // this._draggerTool
    this.setDraggerTool();

    // this._$virtualDom
    // this._width
    // this._height
    this._setVirtualDom();

    // this._$ui
    this._setUI();

    this._init();
};

TextShapeBox.DEFAULT_FONT_FAMILY = 'Arial';
TextShapeBox.DEFAULT_FONT_SIZE = 54;
TextShapeBox.DEFAULT_FONT_COLOR = '#000';

TextShapeBox.Type_Dom = 1;
TextShapeBox.Type_Svg = 2;

var F = function() {};
F.prototype = ShapeBox.prototype;
TextShapeBox.prototype = new F();

$.extend(TextShapeBox.prototype, {

    _init: function(option) {
        "use strict";
        this._bind();
    },

    /**
     * 设置字体文本DOM框
     * @private
     */
    _setUI: function() {
        "use strict";

        var that = this;
        var _$ui = null;

        if (this._$ui) {
            _$ui = this._$ui;
        } else {
            var html = [
                '<div class="shape shape-text">',
                    '<input type="text" class="input" style="opacity: 0.8; width: 100%;">',
                '</div>'
            ].join('');
            _$ui = $(html).append(this._draggerTool.getUi());
            _$ui.find('input[type="text"]').on('blur', function() {
                that._element.show();
                console.log('blur ...');
                that._text = $(this).val();
                that._rebuild();
            });
            $(this._paper.canvas.parentNode).append(_$ui);
        }

        this._$ui = _$ui.css({
            position: 'absolute',
            top: this._y - this._height / 2 - 1,
            left: this._x - this._width /2 - 1,
            fontFamily: this._fontFamily,
            fontSize: this._fontSize,
            fontColor: this._fontColor,
            width: this._width,
            height: this._height,
            display: 'block',
            zIndex: 1
        });

        this._$ui.find('input[type="text"]').hide().val(this._text);
    },

    /**
     * 创建虚拟DOM
     * @returns {*|jQuery}
     * @private
     */
    _createVirtualDom: function() {
        "use strict";
        return $('<div class="virtual-dom">' +
                    '<span class="dom-text" style="display: inline-block;">' + this._text + '</span>' +
                    '<input class="dom-input" type="text" style="border: 1px solid #ccc;" value="' + this._text + '">' +
                '</div>').css({
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -999999,
            fontFamily: this._fontFamily,
            fontSize: this._fontSize,
            fontColor: this._fontColor,
            //visibility: 'hidden',
            lineHeight: 1
        }).appendTo($('body'));
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

        this._width = this._$virtualDom.find('.dom-text').width();
        this._height = this._$virtualDom.find('.dom-input').height();

        this._element.attr({
            text: this._text,
            width: this._width,
            height: this._height
        });
    },

    _rebuild: function() {
        "use strict";
        this._setVirtualDom();
        this._setUI();
    },

    _showUi: function() {
        "use strict";
        this._$ui.css({
            zIndex: 3
        }).show();
        this._$ui.find('input[type="text"]')
            .css({
                padding: 0,
                lineHeight: 1,
                border: '1px solid #ddd'
            })
            .val(this._text)
            .show()
            .select()
            .focus();
    },

    _bind: function() {
        "use strict";
        this._bindDrag();
        this._bindHover();
        this._bindClick();
    },

    getUI: function() {
        "use strict";
        return this._$ui;
    },

    toggle: function(type) {
        "use strict";
        var $text = this._$ui.find('.text');
        var $svg = this._$ui.find('svg');
        if (type === TextShapeBox.Type_Svg) {
            $text.hide();
            $svg.show();
        } else {
            $text.show();
            $svg.hide();
        }
    },

    _bindClick: function() {
        "use strict";
        var that = this;
        this._element.dblclick(function(event) {
            console.log('the element dbclick...');
            that._element.hide();
            that._showUi();
        });
    },

    _bindDrag: function() {
        "use strict";
        var that = this;

        this._element
            .drag(function(dx, dy, x, y, event) {
                event.stopPropagation();

                console.log('x:' + x + ', y:' + y);
                console.log('dx:' + dx + ', dy:' + dy);

                var startX = that._x;
                var startY = that._y;

                var newX = startX + dx;
                var newY = startY + dy;

                console.log('[move] newX:' + newX + ', newY:' + newY);

                this.attr({
                    x: newX,
                    y: newY
                });

                that._$ui.css({
                    left: newX - that._width / 2 - 1,
                    top: newY - that._height / 2 - 1
                });
            }, function(x, y, event) {
                console.log('start move ...');
            }, function(x, y, event) {
                console.log('end move ...');
                that._x = this.attrs.x;
                that._y = this.attrs.y;
            });
    }

});

module.exports = TextShapeBox;