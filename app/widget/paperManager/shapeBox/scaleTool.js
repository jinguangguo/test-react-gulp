/**
 * @file
 * @author jinguangguo
 * @date 2015/11/20
 */

var ScaleTool = function(element, shapeBox) {
    "use strict";
    this._element = element;
    this._shapeBox = shapeBox;
    this._rects = null;
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

ScaleTool.RECT_WH = 10;
ScaleTool.RECT_WH_HALF = ScaleTool.RECT_WH / 2;

$.extend(ScaleTool.prototype, {

    _init: function() {
        "use strict";
    },

    /**
     * 校正小矩形的位置
     * @private
     */
    resetPosition: function() {
        "use strict";
        // 根据元素位置
        var rectPosition = this._getRectPosition();

        this._rt.attr({
            x: rectPosition.x,
            y: rectPosition.y
        });
    },

    _getRectPosition: function() {
        "use strict";
        var attrs = this._element.attrs;
        return {
            x: attrs.x + attrs.width - ScaleTool.RECT_WH_HALF,
            y: attrs.y + attrs.height - ScaleTool.RECT_WH_HALF
        }
    },

    create: function() {
        "use strict";
        var that = this;

        var rectPosition = this._getRectPosition();

        var bottomRight = {
            x: rectPosition.x,
            y: rectPosition.y
        };

        this._rt = paper.rect(bottomRight.x, bottomRight.y, ScaleTool.RECT_WH, ScaleTool.RECT_WH).attr({
            cursor: 'nwse-resize',
            fill: '#fff',
            stroke: '#16ab39',
            'fill-opacity': 0.5
        });

        (function(that) {

            var _startTransformX = 0;   // 始终存储已经移动了的距离
            var _startTransformY = 0;   // 始终存储已经移动了的距离
            var _dx = 0;
            var _dy = 0;

            that._rt.drag(function(dx, dy, x, y, event) {

                var rectInstance = this;

                function doLog() {
                    console.log('x:' + x + ', y:' + y);
                    console.log('dx:' + dx + ', dy:' + dy);
                    var newX = _startTransformX + dx;
                    var newY = _startTransformY + dy;
                    console.log('[move] newX:' + newX + ', newY:' + newY);
                }

                // OK
                function setRectPosition() {
                    //rectInstance.transform('t' + (rectInstance.data('_startTransformX') + dx) + ','
                    //    + (rectInstance.data('_startTransformY') + dy));
                    var rectPosition = that._getRectPosition();
                    rectInstance.attr({
                        x: rectPosition.x,
                        y: rectPosition.y
                    });
                }

                // OK
                function setElementSize() {
                    that._element.attr({
                        width: rectInstance.data('initElementWidth') + dx,
                        height: rectInstance.data('initElementHeight') + dy
                    });
                }

                setElementSize();
                setRectPosition();

            }, function(x, y, event) {
                console.log('start move ...');

                var attrs = that._element.attrs;

                this.data('_startTransformX', _startTransformX + _dx);
                this.data('_startTransformY', _startTransformY + _dy);

                this.data('initElementWidth', attrs.width);
                this.data('initElementHeight', attrs.height);

            }, function(x, y, event) {
                console.log('end move ...');

                that._shapeBox.getUI().css({
                    width: that._element.attrs.width,
                    height: that._element.attrs.height
                });
            });
        })(this);


        // 元素拖动
        //(function(scaleToolInstance) {
        //    var startTransformX = 0,
        //        startTransformY = 0;
        //
        //    // 移动距离
        //    var _initDx = 0,
        //        _initDy = 0;
        //
        //    scaleToolInstance._rt.drag(function(dx, dy, x, y, event) {
        //        console.log('x:' + x + ', y:' + y);
        //        console.log('dx:' + dx + ', dy:' + dy);
        //
        //        var startX = this.data('startX');
        //        var startY = this.data('startY');
        //
        //        var elementWidth = this.data('elementWidth');
        //        var elementHeight = this.data('elementHeight');
        //
        //        var newX = that._startTransformX + dx;
        //        var newY = that._startTransformY + dy;
        //
        //        that._dx = dx;
        //        that._dy = dy;
        //
        //        console.log('[move] newX:' + newX + ', newY:' + newY);
        //        this.transform('t' + (that._startTransformX + dx) + ',' + (that._startTransformY + dy));
        //
        //
        //        var elementAttrs = that._element.attrs;
        //
        //        function setElementSize() {
        //            that._element.attr({
        //                width: elementAttrs.width + _initDx + dx,
        //                height: elementAttrs.height + _initDy + dy
        //            });
        //        }
        //
        //        function setRectPosition() {
        //
        //        }
        //
        //        setElementSize();
        //
        //    }, function(x, y, event) {
        //        console.log('start move ...');
        //
        //        // 存储该元素的移动距离即可
        //        var elementAttrs = that._element.attrs;
        //
        //        that._startTransformX = that._startTransformX + that._dx;
        //        that._startTransformY = that._startTransformY + that._dy;
        //        this.data('elementWidth', that._element.attrs.width);
        //        this.data('elementHeight', that._element.attrs.height);
        //    }, function(x, y, event) {
        //        console.log('end move ...');
        //        var elementAttrs = that._element.attrs;
        //        that._shapeBox.getUI().css({
        //            width: elementAttrs.width,
        //            height: elementAttrs.height
        //        });
        //    });
        //})(this);

    },

    build: function() {
        "use strict";
        var that = this;

        // 画矩形
        // TODO

        // 画圆圈
        var topLeft = {
                x: this._element.attrs.x - ScaleTool.RECT_WH_HALF,
                y: this._element.attrs.y - ScaleTool.RECT_WH_HALF
            },
            topRight = {
                x: this._element.attrs.x + this._element.attrs.width - ScaleTool.RECT_WH_HALF,
                y: this._element.attrs.y - ScaleTool.RECT_WH_HALF
            },
            bottomRight = {
                x: this._element.attrs.x + this._element.attrs.width - ScaleTool.RECT_WH_HALF,
                y: this._element.attrs.y + this._element.attrs.height - ScaleTool.RECT_WH_HALF
            },
            bottomLeft = {
                x: this._element.attrs.x - ScaleTool.RECT_WH_HALF,
                y: this._element.attrs.y + this._element.attrs.height - ScaleTool.RECT_WH_HALF
            };

        var paper = this._element.paper;

        paper.setStart();

        paper.rect(topLeft.x, topLeft.y, ScaleTool.RECT_WH, ScaleTool.RECT_WH).attr({
            cursor: 'nwse-resize'
        });
        paper.rect(topRight.x, topRight.y, ScaleTool.RECT_WH, ScaleTool.RECT_WH).attr({
            cursor: 'nesw-resize'
        });
        paper.rect(bottomRight.x, bottomRight.y, ScaleTool.RECT_WH, ScaleTool.RECT_WH).attr({
            cursor: 'nwse-resize'
        });
        paper.rect(bottomLeft.x, bottomLeft.y, ScaleTool.RECT_WH, ScaleTool.RECT_WH).attr({
            cursor: 'nesw-resize'
        });

        this._rects = paper.setFinish();

        this._rects.attr({
            fill: '#fff',
            stroke: '#16ab39',
            'fill-opacity': 0.5
        });

        this._startTransformX = 0;
        this._startTransformY = 0;

        this._dx = 0;
        this._dy = 0;

        this._rects.drag(function(dx, dy, x, y, event) {
            console.log('x:' + x + ', y:' + y);
            console.log('dx:' + dx + ', dy:' + dy);

            var startX = this.data('startX');
            var startY = this.data('startY');

            var elementWidth = this.data('elementWidth');
            var elementHeight = this.data('elementHeight');

            var newX = that._startTransformX + dx;
            var newY = that._startTransformY + dy;

            that._dx = dx;
            that._dy = dy;

            console.log('[move] newX:' + newX + ', newY:' + newY);
            this.transform('t' + (that._startTransformX + dx) + ',' + (that._startTransformY + dy));

            that._element.attr({
                width: elementWidth + dx,
                height: elementHeight + dy
            });

        }, function(x, y, event) {
            console.log('start move ...');
            that._startTransformX = that._startTransformX + that._dx;
            that._startTransformY = that._startTransformY + that._dy;
            this.data('elementWidth', that._element.attrs.width);
            this.data('elementHeight', that._element.attrs.height);
        }, function(x, y, event) {
            console.log('end move ...');
            //var matrixObj = that._rects[0].matrix.split();
            //that._transformX = matrixObj.scalex;
            //that._transformY = matrixObj.scaley;
            that._shapeBox.getUI().css({
                width: that._element.attrs.width,
                height: that._element.attrs.height
            });
        });
    },

    destroy: function() {
        "use strict";
        this._circles.remove();
    }

});

module.exports = ScaleTool;