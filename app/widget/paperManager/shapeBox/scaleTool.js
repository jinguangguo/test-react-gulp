/**
 * @file
 * @author jinguangguo
 * @date 2015/11/20
 */

var CONFIG = require('./config');

var ScaleTool = function(element, shapeBox) {
    "use strict";
    this._element = element;
    this._shapeBox = shapeBox;
    this._rt = null;    // 小矩形框
    this._srt = null;   // 选中框
    this._init();
};

ScaleTool.singleton = null;

ScaleTool.obtain = function() {
    "use strict";
    if (!ScaleTool.singleton) {
        ScaleTool.singleton = new ScaleTool();
    }
    return ScaleTool.singleton;
};

ScaleTool.RECT_WH = 20;
ScaleTool.RECT_PADDING = 5;

$.extend(ScaleTool.prototype, {

    _init: function() {
        "use strict";
    },

    /**
     * 校正小矩形的位置
     * @private
     */
    _resetRectPosition: function() {
        "use strict";
        var rectPosition;
        if (this._rt) {
            rectPosition = this._getRectPosition();
            this._rt.attr({
                x: rectPosition.x,
                y: rectPosition.y
            });
        }
    },

    /**
     * 矫正选中框的位置
     * @private
     */
    _resetSelectRectPosition: function() {
        "use strict";
        var rectPosition;
        if (this._srt) {
            rectPosition = this._getSelectRectAttrs();
            this._srt.attr({
                x: rectPosition.x,
                y: rectPosition.y,
                width: rectPosition.width,
                height: rectPosition.height
            });
        }
    },

    /**
     * 入口：改变工具位置
     */
    resetPosition: function() {
        "use strict";
        this._resetRectPosition();
        this._resetSelectRectPosition();
    },

    /**
     * 获取拖拽框的位置
     * @returns {{x: *, y: *}}
     * @private
     */
    _getRectPosition: function() {
        "use strict";
        var attrs = this._element.attrs;
        var result = {};
        var ShapeBoxSuper = this._shapeBox.super;

        switch (this._shapeBox._type) {
            case ShapeBoxSuper.Type_Text:
                result = {
                    x: attrs.x + attrs.width / 2,
                    y: attrs.y + attrs.height / 2
                };
                break;
            case ShapeBoxSuper.Type_Image:
            default:
                result = {
                    x: attrs.x + attrs.width,
                    y: attrs.y + attrs.height
                };
        }

        if (CONFIG.DEBUG === true) {
            console.log('[_getRectPosition][' + this._shapeBox._type + ']' + JSON.stringify(result));
        }

        return result;
    },

    /**
     * 获取选中框的位置
     * @returns {{x: number, y: number, width: *, height: *}}
     * @private
     */
    _getSelectRectAttrs: function() {
        "use strict";
        var attrs = this._element.attrs;
        var result = {};

        var ShapeBoxSuper = this._shapeBox.super;

        switch (this._shapeBox._type) {
            case ShapeBoxSuper.Type_Text:
                result = {
                    x: attrs.x - attrs.width / 2 - ScaleTool.RECT_PADDING,
                    y: attrs.y - attrs.height / 2 - ScaleTool.RECT_PADDING,
                    width: attrs.width + ScaleTool.RECT_PADDING * 2,
                    height: attrs.height + ScaleTool.RECT_PADDING * 2
                };
                break;
            case ShapeBoxSuper.Type_Image:
            default:
                result = {
                    x: attrs.x - ScaleTool.RECT_PADDING,
                    y: attrs.y - ScaleTool.RECT_PADDING,
                    width: attrs.width + ScaleTool.RECT_PADDING * 2,
                    height: attrs.height + ScaleTool.RECT_PADDING * 2
                };
        }
        if (CONFIG.DEBUG === true) {
            console.log('[_getSelectRectAttrs][' + this._shapeBox._type + ']' + JSON.stringify(result));
        }

        return result;
    },

    _setSelectRect: function() {
        "use strict";
        var selectRectAttrs = this._getSelectRectAttrs();
        this._srt = this._shapeBox._paper.rect(selectRectAttrs.x, selectRectAttrs.y, selectRectAttrs.width, selectRectAttrs.height).attr({
            'fill': 'none',
            'stroke': '#000',
            'stroke-opacity': 0.3,
            'stroke-width': 1,
            'cursor': 'default'
        });
    },

    _bindDrag: function() {
        "use strict";

        var that = this;

        var _startTransformX = 0;   // 始终存储已经移动了的距离
        var _startTransformY = 0;   // 始终存储已经移动了的距离
        var _dx = 0;
        var _dy = 0;

        var getHeightByWidth = (function(that) {
            var attrs = that._element.attrs;
            var percentage = attrs.width / attrs.height;
            return function(width) {
                return width / percentage;
            };
        })(this);

        that._rt.drag(function(dx, dy, x, y, event) {

            var rectInstance = this;

            function doLog() {
                var newX = _startTransformX + dx;
                var newY = _startTransformY + dy;
                if (CONFIG.DEBUG) {
                    console.log('x:' + x + ', y:' + y);
                    console.log('dx:' + dx + ', dy:' + dy);
                    console.log('[move] newX:' + newX + ', newY:' + newY);
                }
            }

            // OK
            //function setRectPosition() {
            //    //rectInstance.transform('t' + (rectInstance.data('_startTransformX') + dx) + ','
            //    //    + (rectInstance.data('_startTransformY') + dy));
            //    var rectPosition = that._getRectPosition();
            //    rectInstance.attr({
            //        x: rectPosition.x,
            //        y: rectPosition.y
            //    });
            //}

            // OK
            function setElementSize() {
                var newWidth = rectInstance.data('initElementWidth') + dx;
                var newHeight = getHeightByWidth(newWidth);

                that._element.attr({
                    width: newWidth,
                    height: newHeight
                });
            }

            setElementSize();
            that.resetPosition();

        }, function(x, y, event) {
            if (CONFIG.DEBUG) {
                console.log('start move ...');
            }
            var attrs = that._element.attrs;

            this.data('_startTransformX', _startTransformX + _dx);
            this.data('_startTransformY', _startTransformY + _dy);

            this.data('initElementWidth', attrs.width);
            this.data('initElementHeight', attrs.height);

            // 销毁菜单栏
            that._shapeBox._menuTool.destroy();

        }, function(x, y, event) {
            if (CONFIG.DEBUG) {
                console.log('end move ...');
            }
            // 执行下面两个方法
            // 1.重新设置文本框的大小
            // 2.重新设置小矩阵和选中框
            that._shapeBox.selected();
        });
    },

    _bindDragOfText: function() {
        "use strict";
        var that = this;

        var _startTransformX = 0;   // 始终存储已经移动了的距离
        var _startTransformY = 0;   // 始终存储已经移动了的距离
        var _dx = 0;
        var _dy = 0;

        that._rt.drag(function(dx, dy, x, y, event) {

            var rectInstance = this;

            function doLog() {
                if (CONFIG.DEBUG) {
                    console.log('dx:' + dx + ', dy:' + dy);
                }
            }

            doLog();

            // OK
            function setElementSize() {
                var resultD;
                //if (Math.abs(dx) >= Math.abs(dy)) {
                //    resultD = dx;
                //} else {
                //    resultD = dy;
                //}

                resultD = dx;

                // 以横坐标为基准进行自体的放大与缩小
                that._element.attr({
                    'font-size': rectInstance.data('initFontSize') + resultD
                });
                if (CONFIG.DEBUG === true) {
                    console.log('that._element.attrs:' + JSON.stringify(that._element.attrs));
                }
            }

            setElementSize();

            // 拖动过程中，对选中框和小矩阵的位置进行调整
            that.resetPosition();

        }, function(x, y, event) {
            if (CONFIG.DEBUG === true) {
                console.log('start move ...');
            }
            // 隐藏小矩阵和选中矿
            that.hide();
            // 销毁菜单栏
            that._shapeBox._menuTool.destroy();
            var attrs = that._element.attrs;
            this.data('initFontSize', attrs['font-size']);
        }, function(x, y, event) {
            if (CONFIG.DEBUG === true) {
                console.log('end move ...');
            }
            // 执行下面两个方法
            // 1.重新设置文本框的大小
            // 2.重新设置小矩阵和选中框
            that._shapeBox.selected();
        });
    },

    rebuild: function() {
        "use strict";

        this.destroy();

        var rectPosition = this._getRectPosition();

        var bottomRight = {
            x: rectPosition.x,
            y: rectPosition.y
        };

        this._setSelectRect();

        this._rt = this._shapeBox._paper.rect(bottomRight.x, bottomRight.y, ScaleTool.RECT_WH, ScaleTool.RECT_WH).attr({
            cursor: 'nwse-resize',
            fill: '#fff',
            stroke: '#16ab39'
        });

        var ShapeBoxSuper = this._shapeBox.super;
        switch (this._shapeBox._type) {
            case ShapeBoxSuper.Type_Text:
                this._bindDragOfText();
                break;
            case ShapeBoxSuper.Type_Image:
            default:
                this._bindDrag();
        }

    },

    hide: function() {
        "use strict";
        this._rt.attr({
            opacity: 0
        });
        this._srt.attr({
            opacity: 0
        });
    },

    destroy: function() {
        "use strict";
        if (this._rt) {
            this._rt.remove();
            this._rt = null;
        }
        if (this._srt) {
            this._srt.remove();
            this._srt = null;
        }
    }

});

module.exports = ScaleTool;