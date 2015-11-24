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