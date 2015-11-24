/**
 * @file 形状类的超类
 * @author jinguangguo
 * @date 2015/11/18
 */

var ScaleTool = require('./scaleTool.js');

var MenuTool = require('./menuTool.js');

var CONFIG = require('./config.js');

var ShapeBox = function(type) {
    "use strict";
    // must be override
    this._element = null;
    // must be override
    this._$ui = null;
    this._type = type;
    this._scaleTool = null;
    this._menuTool = null;
};

ShapeBox.Type_Text = 'TEXT';
ShapeBox.Type_Image = 'IMAGE';

// 生成的对象数量
ShapeBox.boxCount = 0;

$.extend(ShapeBox.prototype, {
    /**
     * @override
     */
    onSelected: function() {
        "use strict";
    },

    /**
     * @override
     */
    onDrag: function(newX, newY) {
        "use strict";
    },

    /**
     * @override
     */
    onUnselected: function() {
        "use strict";

    },

    /**
     * @override
     */
    onShow: function() {
        "use strict";

    }
});

$.extend(ShapeBox.prototype, {

    constructor: ShapeBox,

    super: ShapeBox,

    init: function() {
        "use strict";
        this._element.attr({
            title: '双击可编辑'
        });
        this._bind();
        this._scaleTool = new ScaleTool(this._element, this);
        this._menuTool = new MenuTool(this._element, this);
        ShapeBox.boxCount++;
    },

    _bind: function() {
        "use strict";

        var that = this;

        // 选中
        this._element.dblclick(function(event) {
            event.stopPropagation();
            that.selected();
        });

        // 拖拽
        this._element.drag(function(dx, dy, x, y, event) {
            var startX = that._x;
            var startY = that._y;
            var newX = startX + dx;
            var newY = startY + dy;
            if (CONFIG.DEBUG === true) {
                console.log('x:' + x + ', y:' + y);
                console.log('dx:' + dx + ', dy:' + dy);
                console.log('[move] newX:' + newX + ', newY:' + newY);
            }
            this.attr({
                x: newX,
                y: newY
            });
            that.onDrag(newX, newY);
            // 改变_scaleTool的位置
            that._scaleTool.resetPosition();
        }, function(x, y, event) {
            if (CONFIG.DEBUG === true) {
                console.log('start move ...');
            }
            that._menuTool.destroy();
        }, function(x, y, event) {
            if (CONFIG.DEBUG === true) {
                console.log('end move ...');
            }
            that._x = this.attrs.x;
            that._y = this.attrs.y;
            that._menuTool.rebuild();
        });
    },

    /**
     * 选中状态
     */
    selected: function() {
        "use strict";
        this.onSelected();
        this._scaleTool.rebuild();
        this._menuTool.rebuild();
    },

    unselected: function() {
        "use strict";

    },

    setType: function(type) {
        "use strict";
        this._type = type;
    },

    getType: function() {
        "use strict";
        return this._type;
    },

    destroy: function() {

        "use strict";

        this._element.remove();
        this._element = null;

        if (this._$ui) {
            this._$ui.remove();
            this._$ui = null;
        }

        this._type = '';

        this._scaleTool.destroy();
        this._scaleTool = null;

        this._menuTool.destroy();
        this._menuTool = null;
    }

});

module.exports = ShapeBox;

