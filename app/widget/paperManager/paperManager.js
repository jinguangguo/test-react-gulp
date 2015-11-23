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

    shapeArray: [],

    /**
     * 设置文本的出现位置的坐标
     * @param width
     * @param height
     * @private
     */
    _setCenterPosition: function(width, height) {
        "use strict";
        this.centerX = width / 2;
        this.centerY = height / 4;
    },

    _bindPaper: function() {
        "use strict";
        //$(this.paper.canvas).click(function(event) {
        //    $.map(_private.shapeArray, function(shape, index) {
        //        console.log('all blur ...');
        //        if (shape._element.isPointInside(event.pageX, event.pageY) === true) {
        //
        //        } else {
        //            shape.blur();
        //        }
        //    });
        //});
    }
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
        _private._bindPaper();
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
        _private.shapeArray.push(imageShapeBox);
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
        _private.shapeArray.push(textShapeBox);
        return textShapeBox;
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
        _private.paper.clear();
    },

    /**
     * 预览
     * @param canvasDom
     */
    toCanvas: function(canvasDom) {
        "use strict";
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


