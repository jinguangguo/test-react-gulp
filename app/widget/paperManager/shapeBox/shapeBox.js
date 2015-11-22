/**
 * @file 形状类的超类
 * @author jinguangguo
 * @date 2015/11/18
 */

var ScaleTool = require('./scaleTool.js');

var MenuTool = require('./menuTool.js');

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

ShapeBox.prototype = {

    constructor: ShapeBox,

    super: ShapeBox,

    init: function() {
        "use strict";
        this._element.attr({
            title: '双击可编辑'
        });
        this._bindDrag();
        this._bindHover();
        this._bindClick();
        this._scaleTool = new ScaleTool(this._element, this);
        this._menuTool = new MenuTool(this._element, this);
        ShapeBox.boxCount++;
    },

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

    _bindPaper: function() {
        "use strict";
        // 失去选中状态

    },

    _bindHover: function() {
        "use strict";
        //var that = this;
        //this._element.hover(function() {
        //    that._$ui.addClass('shape--hover');
        //}, function() {
        //    that._$ui.removeClass('shape--hover');
        //});
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
        this.onSelected();
        this._scaleTool.rebuild();
        this._menuTool.rebuild();
    },

    unselected: function() {
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
                that.onDrag(newX, newY);
                // 改变_scaleTool的位置
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

};

module.exports = ShapeBox;

