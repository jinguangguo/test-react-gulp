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

// 所有实例
ShapeBox.instances = [];

ShapeBox.unSelectAll = function() {
    "use strict";
    if (CONFIG.DEBUG === true) {
        console.log('ShapeBox.instances length:' + ShapeBox.instances.length);
    }
    $.map(ShapeBox.instances, function(shapeBox, index) {
        shapeBox.unselected();
    });
};

ShapeBox.add = function(instance) {
    "use strict";
    ShapeBox.instances.push(instance);
};

ShapeBox.remove = function(instance) {
    "use strict";
    $.map(ShapeBox.instances, function(shapeBox, index) {
        if (shapeBox === instance) {
            ShapeBox.instances.splice(index, 1);
        }
    });
};

ShapeBox.clear = function() {
    "use strict";
    $.map(ShapeBox.instances, function(shapeBox, index) {
        shapeBox.destroy();
    });
    ShapeBox.instances = [];
};

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
        this._bind();
        this._scaleTool = new ScaleTool(this._element, this);
        this._menuTool = new MenuTool(this._element, this);
        ShapeBox.boxCount++;
        ShapeBox.add(this);
    },

    _bind: function() {
        "use strict";

        var that = this;

        // 选中
        this._element.click(function(event) {
            event.stopPropagation();
            console.log('click...');
            that.selected();
        });

        this._element.touchstart(function(event) {
            event.stopPropagation();
            console.log('touchstart...');
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
            event.stopPropagation();
            if (CONFIG.DEBUG === true) {
                console.log('start move ...');
            }
            that._menuTool.destroy();
        }, function(event) {
            event.stopPropagation();
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
        ShapeBox.unSelectAll();
        this.onSelected();
        this._scaleTool.rebuild();
        this._menuTool.rebuild();
    },

    /**
     * 取消选中
     */
    unselected: function() {
        "use strict";
        this._scaleTool.destroy();
        this._menuTool.destroy();
    },

    setType: function(type) {
        "use strict";
        this._type = type;
    },

    getType: function() {
        "use strict";
        return this._type;
    },

    getElement: function() {
        "use strict";
        return this._element;
    },

    /**
     * 外界销毁实例，只需要调用这个方法即可
     */
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

