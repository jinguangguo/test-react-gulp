/**
 * @file
 * @author jinguangguo
 * @date 2015/11/21
 */

var artDialog = require('../../dialog/dialog');

var CONFIG = require('./config');

var MenuTool = function(element, shapeBox) {
    "use strict";
    this._element = element;
    this._shapeBox = shapeBox;
    this._$ui = null;
    this._x = null;
    this._y = null;
    this._init();
};

MenuTool.SHOW_SHIFT_X = 5;
MenuTool.SHOW_SHIFT_Y = 50;

MenuTool.COPY_SHIFT_X = 30;
MenuTool.COPY_SHIFT_Y = 30;

MenuTool.singleton = null;

MenuTool.obtain = function() {
    "use strict";
    if (!MenuTool.singleton) {
        MenuTool.singleton = new MenuTool();
    }
    return MenuTool.singleton;
};

$.extend(MenuTool.prototype, {

    _init: function() {
        "use strict";
    },

    _setUi: function() {
        "use strict";
        var html = [
            '<div class="paper-menu paper-menu-'+ this._shapeBox._type +'">',
                '<ul class="menu-list">',

                    // 以下是文本功能
                    '<li class="item item-text">',
                        '<a href="javascript:;" id="fontFamily">字体</a>',
                    '</li>',

                    '<li class="item item-text" id="fontSize">',
                        '<a href="javascript:;">大小</a>',
                    '</li>',

                    '<li class="item item-text" id="fontColor">',
                        '<a href="javascript:;">颜色</a>',
                    '</li>',

                    '<li class="item item-text" id="fontBold">',
                        '<a href="javascript:;">加粗</a>',
                    '</li>',

                    // 以下是通用功能
                    '<li class="item">',
                        '<a href="javascript:;" id="copy">复制</a>',
                    '</li>',

                    '<li class="item">',
                        '<a href="javascript:;" id="remove">删除</a>',
                    '</li>',

                    '<li class="item">',
                        '<a href="javascript:;" id="link">超链接</a>',
                    '</li>',

                    '<li class="item">',
                        '<a href="javascript:;" id="opacity">透明度</a>',
                    '</li>',
                '</ul>',
            '</div>'
        ].join('');
        this._$ui = $(html);
    },

    _bind: function() {
        "use strict";

        var that = this;

        // 删除 - ok
        this._$ui.find('#remove').click(function() {
            that._shapeBox.destroy();
        });

        // 复制 - ok
        this._$ui.find('#copy').click(function() {
            var constructor = that._shapeBox.constructor;
            var newOption = $.extend({}, that._shapeBox._option);
            var attrs = that._element.attrs;
            var ShapeBoxSuper = that._shapeBox.super;
            switch (that._shapeBox._type) {
                case ShapeBoxSuper.Type_Text:
                    newOption.text = attrs.text;
                    newOption.fontFamily = attrs['font-family'];
                    newOption.fontSize = attrs['font-size'];
                    break;
                case ShapeBoxSuper.Type_Image:
                default:
                    newOption.width = attrs.width;
                    newOption.height = attrs.height;
            }
            newOption.x = attrs.x + MenuTool.COPY_SHIFT_X;
            newOption.y = attrs.y + MenuTool.COPY_SHIFT_Y;
            var instance = new constructor(newOption);
        });

        // 超链接
        this._$ui.find('#link').click(function() {
            var dialog = artDialog({
                title: '提示',
                content: '<div class="module-link">' +
                            '<label class="link-label">' +
                                '请输入超链接地址：' +
                                '<input type="text" class="j-link" value="http://">' +
                            '</label>' +
                        '</div>',
                ok: function() {
                    var link = this.$content.find('.j-link').val();
                    that._element.attr({
                        href: link,
                        target: '_blank'
                    });
                }
            });
            dialog.showModal();
        });

        // 透明度
        this._$ui.find('#opacity').click(function() {
            var dialog = artDialog({
                title: '提示',
                content: '<div class="module-opacity">' +
                '<label class="link-label">' +
                '选择透明度：' +
                '<select class="j-opacity">' +
                '<option value="0.1">10</option>' +
                '<option value="0.2">20</option>' +
                '<option value="0.3">30</option>' +
                '<option value="0.4">40</option>' +
                '<option value="0.5">50</option>' +
                '<option value="0.6">60</option>' +
                '<option value="0.7">70</option>' +
                '<option value="0.8">80</option>' +
                '<option value="0.9">90</option>' +
                '<option value="1" selected>100</option>' +
                '</select>' +
                '</label>' +
                '</div>',
                ok: function() {
                    var opacity = this.$content.find('.j-opacity').val();
                    that._element.attr({
                        opacity: opacity
                    });
                }
            });
            dialog.showModal();
        });

        // 设置文本属性
        this._$ui.find('#fontFamily, #fontSize, #fontColor, #fontBold').click(function() {

            function getFontListHtml() {
                var FONT_LIST = CONFIG.FONTS;
                var resultArray = [];
                $.map(FONT_LIST, function(font, index) {
                    resultArray.push('<option value="' + font.style + '">' + font.name + '</option>');
                });
                return [
                    '<select class="j-font-family">',
                    resultArray.join(''),
                    '</select>'
                ].join('');
            }

            var attrs = that._element.attrs;

            var dialog = artDialog({
                title: '提示',
                content:
                    '<div class="module-font">' +
                        '<p class="row">' +
                            getFontListHtml() +
                        '</p>' +
                        '<p class="row">' +
                            '<label class="link-label">' +
                                '请输入文字大小：' +
                                '<input type="text" class="j-size" value="' + attrs['font-size'] + '">' +
                            '</label>' +
                        '</p>' +
                        '<p class="row">' +
                            '选择颜色：' +
                            '<select class="j-color">' +
                                '<option value="red">red</option>' +
                                '<option value="purple">purple</option>' +
                                '<option value="orange" selected>orange</option>' +
                            '</select>' +
                        '</p>' +
                        '<p class="row">' +
                            '是否加粗：' +
                            '<select class="j-bold">' +
                                '<option value="bold">是</option>' +
                                '<option value="normal">否</option>' +
                            '</select>' +
                        '</p>' +
                    '</div>',
                ok: function() {
                    var fontFamily = this.$content.find('.j-font-family').val();
                    var fontSize = this.$content.find('.j-size').val();
                    var fontColor = this.$content.find('.j-color').val();
                    var fontBold = this.$content.find('.j-bold').val();
                    that._element.attr({
                        'font-family': fontFamily,
                        'font-size': fontSize,
                        'fill': fontColor,
                        'font-weight': fontBold
                    });
                }
            });
            dialog.showModal();
        });

    },

    /**
     * 获取menu的位置
     * @private
     */
    _setMenuPosition: function() {
        "use strict";
        var attrs = this._element.attrs;
        this._x = attrs.x - MenuTool.SHOW_SHIFT_X;
        this._y = attrs.y - MenuTool.SHOW_SHIFT_Y;
    },

    _setMenuPositionOfText: function() {
        "use strict";
        var attrs = this._element.attrs;
        this._x = attrs.x - MenuTool.SHOW_SHIFT_X;
        this._y = attrs.y - MenuTool.SHOW_SHIFT_Y;
    },

    _showMenu: function() {
        "use strict";
        this._setUi();
        this._bind();
        this._showUi();
    },

    _showUi: function() {
        "use strict";
        this._$ui.css({
            left: this._x,
            top: this._y,
            zIndex: 3
        });
        $(this._element.paper.canvas.parentNode).append(this._$ui);
    },

    _doText: function() {
        "use strict";
        this._setMenuPositionOfText();
        this._showMenu();
    },

    _doImage: function() {
        "use strict";
        this._setMenuPosition();
        this._showMenu();
    },

    rebuild: function() {
        "use strict";

        this.destroy();

        var that = this;

        var ShapeBoxSuper = this._shapeBox.super;
        switch (this._shapeBox._type) {
            case ShapeBoxSuper.Type_Text:
                this._doText();
                break;
            case ShapeBoxSuper.Type_Image:
            default:
                this._doImage();
        }
    },

    destroy: function() {
        "use strict";
        if (this._$ui) {
            this._$ui.remove();
            this._$ui = null;
        }
    }

});

module.exports = MenuTool;