/**
 * @file
 * @author jinguangguo
 * @date 2015/11/20
 */

var ScaleTool = function(element) {
    "use strict";
    this._element = element;
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

ScaleTool.RECT_WH = 8;
ScaleTool.RECT_WH_HALF = ScaleTool.RECT_WH / 2;

$.extend(ScaleTool.prototype, {

    _init: function() {
        "use strict";
    },

    /**
     * 校正四个小矩形的位置
     * @private
     */
    _resetPosition: function() {
        "use strict";
        var rects = this._rects;

        var topLeftRect = rects[0];
    },

    build: function() {
        "use strict";
        var that = this;

        // 画矩形

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

        this._rects.drag(function(dx, dy, x, y, event) {
            console.log('x:' + x + ', y:' + y);
            console.log('dx:' + dx + ', dy:' + dy);

            var startX = this.data('startX');
            var startY = this.data('startY');
            var elementWidth = this.data('elementWidth');
            var elementHeight = this.data('elementHeight');

            var newX = startX + dx;
            var newY = startY + dy;

            console.log('[move] newX:' + newX + ', newY:' + newY);
            this.attr({
                x: newX,
                y: newY
            });

            that._element.attr({
                width: elementWidth + dx,
                height: elementHeight + dy
            });

        }, function(x, y, event) {
            console.log('start move ...');
            this.data('startX', x);
            this.data('startY', y);
            this.data('elementWidth', that._element.attrs.width);
            this.data('elementHeight', that._element.attrs.height);
        }, function(x, y, event) {
            console.log('end move ...');
        });
    },

    destroy: function() {
        "use strict";
        this._circles.remove();
    }

});

module.exports = ScaleTool;