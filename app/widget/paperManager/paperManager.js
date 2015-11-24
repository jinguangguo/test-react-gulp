/**
 * @file
 * @author jinguangguo
 * @date 2015/11/14
 */

var TextShapeBox = require('./shapeBox/textShapeBox');

var ImageShapeBox = require('./shapeBox/imageShapeBox');

var ShapeBox = require('./shapeBox/shapeBox');

var CONFIG = require('./shapeBox/config');

var _public = {
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
        new ImageShapeBox({
            paper: this._paper,
            path: option.imgPath,
            width: option.imgWidth,
            height: option.imgHeight
        });
    },

    /**
     * @param option
     */
    addText: function(text, style) {
        var textShapeBox = new TextShapeBox({
            paper: this._paper,
            text: text,
            fontFamily: style
        });
        textShapeBox.selected();
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

module.exports = _public;


