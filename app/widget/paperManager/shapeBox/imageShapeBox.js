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

    this._paper = option.paper;

    this._path = option.path;
    this._width = option.width;
    this._height = option.height;

    var position = getPositionOfImage(this._width, this._height, this._paper.width, this._paper.height);
    this._x = option.x || position.left;
    this._y = option.y || position.top;

    this._element = this._paper.image(this._path, this._x, this._y, this._width, this._height);

    this.setDraggerTool(this._element);

    this._$ui = $('<div class="shape shape-image"></div>').css({
        position: 'absolute',
        left: this._x - 2,
        top: this._y - 1,
        zIndex: 1,
        width: this._width,
        height: this._height,
        boxSizing: 'content-box'
    }).append(this._draggerTool.getUi());

    this._childInit();
};

// 居中显示图片
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

var F = function() {};
F.prototype = ShapeBox.prototype;
ImageShapeBox.prototype = new F();

$.extend(ImageShapeBox.prototype, {

    _childInit: function(option) {
        "use strict";
        this.init();
    },

    getUI: function() {
        "use strict";
        return this._$ui;
    }

});

module.exports = ImageShapeBox;