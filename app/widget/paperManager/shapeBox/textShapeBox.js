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