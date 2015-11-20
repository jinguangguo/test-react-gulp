/**
 * @file
 * @author jinguangguo
 * @date 2015/11/20
 */

/**
 * 图片
 * @param option
 * @property option.element 图片路径
 * @property option.x
 * @property option.y
 * @property option.width 宽度
 * @property option.height 高度
 * @constructor
 */
var DraggerTool = function(option) {
    "use strict";

    this._element = option.element;

    this._$ui = $('<div class="handleBox" style="display: none;">' +
        '<a class="handle handle-tl" href="#" title="Resize this element"></a>' +
        '<a class="handle handle-tr" title="Resize this element"></a>' +
        '<a class="handle handle-br" href="#" title="Resize this element"></a>' +
        '<a class="handle handle-bl" href="#" title="Resize this element"></a>' +
        '</div>');

    this._init();

};

$.extend(DraggerTool.prototype, {

    _init: function() {
        "use strict";
        this._bind();
    },

    _bind: function() {
        "use strict";

        var $handle = this._$ui.find('.handle');

        $handle.on('mousedown', function(event) {
            console.log('[handle] mousedown');
        });

        $handle.on('mousemove', function() {
            console.log('[handle] mousemove');
        });

        $handle.on('mouseup', function() {
            console.log('[handle] mouseup');
        });
    },

    _toScale: function() {
        "use strict";

    },

    getUi: function() {
        "use strict";
        return this._$ui;
    },

    show: function() {
        "use strict";
        this._$ui.show();
    },

    hide: function() {
        "use strict";
        this._$ui.hide();
    }

});

module.exports = DraggerTool;