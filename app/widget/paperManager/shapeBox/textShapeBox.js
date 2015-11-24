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

    this._option = option;

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

    // this._$virtualDom
    // this._width
    // this._height
    this._setVirtualDom();

    this._$ui = null;

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
            _$ui = $([
                '<div class="paper-shape paper-shape-text">',
                    '<input class="input" style="opacity: 0.8; width: 100%;">',
                '</div>'
            ].join(''));
            _$ui.find('.input').on('blur', function() {
                that._element.show();
                that._text = $(this).val();
                that._rebuild();
                that._hideUi();
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
            display: 'none',
            zIndex: 1
        });

        this._$ui.val(this._text);
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
                    '<input class="dom-input" type="text" value="' + this._text + '">' +
                '</div>').css({
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: -999999,
            fontFamily: this._fontFamily,
            fontSize: this._fontSize,
            fontColor: this._fontColor,
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
        this._scaleTool.rebuild();
    },

    _hideUi: function() {
        "use strict";
        this._$ui.css({
            zIndex: 1
        }).hide();
    },

    _showUi: function() {
        "use strict";
        this._$ui.css({
                zIndex: 3
            })
            .show()
            .find('input[type="text"]')
            .val(this._text)
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

    focus: function() {
        "use strict";
        this.selected();
    },

    onSelected: function() {
        "use strict";
        this._element.hide();
        this._rebuild();
        this._showUi();
    },

    /**
     * 当矩形框在移动时
     */
    onRectMove: function(dx, dy) {
        "use strict";
        // TODO 改变字体大小
    },

    onDrag: function(newX, newY) {
        "use strict";
    }

});

module.exports = TextShapeBox;