/**
 * @file
 * @author jinguangguo
 * @date 2015/11/14
 */

var TextShapeBox = require('./shapeBox/textShapeBox');

var ImageShapeBox = require('./shapeBox/imageShapeBox');

var _private = {

    // 画布对象
    paper: null,

    $dom: null,

    shapeBoxArray: []

};

var _public = {
    /**
     * 基于container画图
     * @param option.container
     * @param option.width
     * @param option.height
     */
    createPaper: function(option) {
        "use strict";
        window.paper = _private.paper = Raphael(option.container[0], option.width, option.height);
        _private.$dom = option.container;
    },

    loadImage: function(option) {
        "use strict";
        var imageShapeBox = new ImageShapeBox({
            paper: _private.paper,
            path: option.imgPath,
            width: option.imgWidth,
            height: option.imgHeight,
            $parent: _private.$dom
        });
        _private.shapeBoxArray.push(imageShapeBox);
    },

    /**
     * @param option
     */
    addText: function(text, style) {
        var textShapeBox = new TextShapeBox({
            paper: _private.paper,
            text: text,
            fontFamily: style
        });
        _private.shapeBoxArray.push(textShapeBox);
    },

    /**
     * 获取画布
     * @returns {paper}
     */
    getPaper: function() {
        "use strict";
        return _private.paper;
    },

    /**
     * 清空画布，移除dom对象
     */
    clear: function() {
        "use strict";
        $.map(_private.shapeBoxArray, function(instance, index) {
            instance.destroy();
        });
    },

    /**
     * 预览
     * @param canvasDom
     */
    toCanvas: function(canvasDom) {
        "use strict";
        // 1. 先清除选中状态
        $.map(_private.shapeBoxArray, function(instance, index) {
            instance.unselected();
        });
        // 2. 进行转换成canvas
        canvg(canvasDom, _private.paper.canvas.outerHTML);
    },

    /**
     * 另存为
     */
    saveAs: function() {
        "use strict";

    }
};

module.exports = _public;


