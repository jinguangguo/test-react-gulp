/**
 * @file
 * @author jinguangguo
 * @date 2015/11/14
 */

var _private = {

    // 画布对象
    paper: null,

    centerX: 0,

    centerY: 0,

    _addStroke: function(element) {
        "use strict";
        /**
         strokestring
         stroke colour
         stroke-dasharraystring
         [“”, “-”, “.”, “-.”, “-..”, “. ”, “- ”, “--”, “- .”, “--.”, “--..”]
         stroke-linecapstring
         [“butt”, “square”, “round”]
         stroke-linejoinstring
         [“bevel”, “round”, “miter”]
         stroke-miterlimitnumber

         stroke-opacitynumber

         stroke-widthnumber
         stroke width in pixels, default is '1'
         */
        element.attr({
            stroke: '#ccc',
            'stroke-dasharraystring': '- ',
            'stroke-widthnumber': 1
        });
    },

    _removeStroke: function(element) {
        "use strict";
        element.attr({
            'stroke-widthnumber': 0
        });
    },

    _bindHover: function(element) {
        "use strict";
        var that = this;
        //element.hover(function() {
        //    that._addStroke(this);
        //}, function () {
        //    that._removeStroke(this);
        //});
    },

    _bindDrag: function(element) {
        "use strict";
        element
            .drag(function(dx, dy, x, y, event) {
                console.log('x:' + x + ', y:' + y);
                console.log('dx:' + dx + ', dy:' + dy);

                var startX = this.data('startX');
                var startY = this.data('startY');

                var newX = startX + dx;
                var newY = startY + dy;
                console.log('[move] newX:' + newX + ', newY:' + newY);
                this.attr({
                    x: newX,
                    y: newY
                });
            }, function(x, y, event) {
                console.log('start move ...');
                // 开始移动，记录移动的开始坐标
                this.data('startX', this.attrs.x);
                this.data('startY', this.attrs.y);
            }, function(x, y, event) {
                console.log('end move ...');
            });
    },

    bind: function(element) {
        "use strict";
        this._bindDrag(element);
        this._bindHover(element);
    },

    addImage: function(imgPath, imgWidth, imgHeight, paperWidth, paperHeight) {
        "use strict";
        var imagePosition = getPositionOfImage();
        var image = this.paper.image(imgPath, imagePosition.left, imagePosition.top, imgWidth, imgHeight);
        _private.bind(image);
        function getPositionOfImage() {
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
    },

    /**
     * 设置公共属性
     */
    initSet: function() {
        "use strict";
        //var that = this;
        //this.paper.set().push(
        //    this.paper.rect(30, 30, 25, 25, 5).attr({
        //        fill: 'red'
        //    }),
        //    this.paper.rect(80, 30, 25, 25, 5).attr({
        //        fill: 'red'
        //    })
        //);
        //this.paper.forEach(function(element) {
        //    that.bind(element);
        //});
    },

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

    init: function(option) {
        "use strict";
        this.paper = Raphael(option.container, option.width, option.height);
        this._setCenterPosition(option.width, option.height);
        this.addImage(option.imgPath, option.imgWidth, option.imgHeight, option.width, option.height);
        this.initSet();
    }
};

function getImageOffset() {
    "use strict";

}

var _public = {
    /**
     * 基于container画图
     * @param option.container
     * @param option.width
     * @param option.height
     * @param option.imgPath
     * @param option.imgWidth
     * @param option.imgHeight
     */
    createPaper: function(option) {
        "use strict";
        _private.init(option);
    },
    /**
     * @param option
     */
    addText: (function() {
        "use strict";
        var DEFAULT_SIZE = 54;
        return function(text, style) {
            var text = _private.paper
                .text(_private.centerX, _private.centerY, text)
                .attr({
                    'font-size': DEFAULT_SIZE,
                    'font-family': style
                });
            _private.bind(text);
        };
    })(),
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
    }
};

module.exports = _public;


