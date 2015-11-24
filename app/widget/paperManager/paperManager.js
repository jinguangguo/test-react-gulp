/**
 * @file
 * @author jinguangguo
 * @date 2015/11/14
 */

var TextShapeBox = require('./shapeBox/textShapeBox');

var ImageShapeBox = require('./shapeBox/imageShapeBox');

var paper = null;

var shapeBoxArray = [];

function unSelectAll() {
    "use strict";
    $.map(shapeBoxArray, function(instance, index) {
        instance.unselected();
    });
}

var _public = {
    /**
     * 基于container画图
     * @param option.container
     * @param option.width
     * @param option.height
     */
    createPaper: function(option) {
        "use strict";
        paper = Raphael(option.container[0], option.width, option.height);
        window.paper = paper;
        $(paper.canvas).click(function() {
            unSelectAll();
        });
    },

    loadImage: function(option) {
        "use strict";
        var imageShapeBox = new ImageShapeBox({
            paper: paper,
            path: option.imgPath,
            width: option.imgWidth,
            height: option.imgHeight
        });
        shapeBoxArray.push(imageShapeBox);
    },

    /**
     * @param option
     */
    addText: function(text, style) {
        var textShapeBox = new TextShapeBox({
            paper: paper,
            text: text,
            fontFamily: style
        });
        textShapeBox.selected();
        shapeBoxArray.push(textShapeBox);
    },

    /**
     * 获取画布
     * @returns {paper}
     */
    getPaper: function() {
        "use strict";
        return paper;
    },

    /**
     * 清空画布，移除dom对象
     */
    clear: function() {
        "use strict";
        $.map(shapeBoxArray, function(instance, index) {
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
        unSelectAll();
        // 2. 进行转换成canvas
        canvg(canvasDom, paper.canvas.outerHTML);
    },

    /**
     * 另存为
     */
    saveAs: function() {
        "use strict";

    }
};

module.exports = _public;


