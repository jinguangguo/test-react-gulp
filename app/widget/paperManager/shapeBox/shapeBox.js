/**
 * @file 形状类的超类
 * @author jinguangguo
 * @date 2015/11/18
 */

var ScaleTool = require('./scaleTool.js');

var ShapeBox = function() {
    "use strict";
    // must be override
    this._element = null;
    // must be override
    this._$ui = null;
};

// 生成的对象数量
ShapeBox.boxCount = 0;

ShapeBox.prototype = {

    constructor: ShapeBox,

    init: function() {
        "use strict";
        ShapeBox.boxCount++;
        this._bindDrag();
        this._bindHover();
        this._bindClick();
        this._scaleTool = new ScaleTool(this._element, this);
    },

    _bindPaper: function() {
        "use strict";
        // 失去选中状态

    },

    _bindHover: function() {
        "use strict";
        var that = this;
        this._element.hover(function() {
            that._$ui.addClass('shape--hover');
        }, function() {
            that._$ui.removeClass('shape--hover');
        });
    },

    /**
     * TODO 选中
     */
    _bindClick: function() {
        "use strict";
        // TODO 出现toolbar和draggerTool
        var that = this;
        this._element.dblclick(function(event) {
            event.stopPropagation();
            console.log('the element dbclick...');
            that.selected();
        });
    },

    selected: function() {
        "use strict";
        this._scaleTool.create();
    },

    blur: function() {
        "use strict";

    },

    /**
     * 拖拽
     * @private
     */
    _bindDrag: function() {
        "use strict";
        var that = this;
        this._element
            .drag(function(dx, dy, x, y, event) {
                console.log('x:' + x + ', y:' + y);
                console.log('dx:' + dx + ', dy:' + dy);

                var startX = that._x;
                var startY = that._y;

                var newX = startX + dx;
                var newY = startY + dy;
                console.log('[move] newX:' + newX + ', newY:' + newY);
                this.attr({
                    x: newX,
                    y: newY
                });
                that._$ui.css({
                    left: newX - 2,
                    top: newY - 1
                });

                // 改变小矩形的位置
                that._scaleTool.resetPosition();
            }, function(x, y, event) {
                console.log('start move ...');
            }, function(x, y, event) {
                console.log('end move ...');
                that._x = this.attrs.x;
                that._y = this.attrs.y;
            });
    },

    /**
     * TODO 呈现操作栏
     * @private
     */
    _showToolbar: function() {
        "use strict";

    },

    /**
     * @override
     */
    show: function() {
        "use strict";

    },

    getUI: function() {
        "use strict";

    }
};

module.exports = ShapeBox;

