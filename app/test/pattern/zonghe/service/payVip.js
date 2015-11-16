/**
 * @file 支付服务-会员
 * @author jinguangguo(jinguangguof@baidu.com)
 * @date 2015/4/20
 */

var $ = require('base:widget/libs/jquerypacket.js'),
    PayBase = require("./payBase.js"),
    payUtil = require("./payUtil.js"),
    Context = require('disk-system:widget/context/context.js');

/**
 * 子类-会员支付
 * @param config
 *
 * example 1
 *  new PayVip({
 *      mode: ,
 *      isLogin: ,
 *      productName: ,  // 可选
 *      formId: ,   // 可选
 *      isVip: ,
 *      vipStartTime: , // 会员开始日期
 *      dqStateCode: ,  // 可选
 *  });
 *
 * @class
 * @extends PayBase
 */
var PayVip = function(config) {
    this.$form = null;
    this.serverTime = config.serverTime;
    this.isVip = config.isVip;
    if (config.dqStateCode) {
        this.dqStateCode = config.dqStateCode;
    } else {
        this.dqStateCode = '';
    }
    this.vipStartTime = config.vipStartTime;
    if (config.addFormItems) {
        this.addFormItems = config.addFormItems;
    }

    this.formId = config.formId || PayVip.DEFAULT_FORM_ID;
    this.productName = config.productName || PayVip.DEFAULT_PRODUCT_NAME;
    this.init();
};
PayVip.LOG_CODE_IS_VIP = '99_109_139';
PayVip.LOG_CODE_IS_NO_VIP = '99_100_138';
PayVip.API_ACTION_PAY = '/rest/2.0/membership/product';
PayVip.ACTION_MODE = '_target';
PayVip.DEFAULT_FORM_ID = 'payVipForm';
PayVip.PACKAGE_LIST = [
    {
        "product_name": "vip1_1m",
        "product_id": "13216777582222349574"
    },
    {
        "product_name": "vip1_3m",
        "product_id": "7322772448495138379"
    },
    {
        "product_name": "vip1_6m",
        "product_id": "7349836666708701604"
    },
    {
        "product_name": "vip1_1y",
        "product_id": "145433372644027012"
    }
];
PayVip.DEFAULT_PRODUCT_NAME = PayVip.PACKAGE_LIST[2].product_name;
PayVip.prototype = new PayBase();
/**
 * 覆盖继承自父类的方法
 */
$.extend(PayVip.prototype, {
    buildForm: function() {
        var form = [
            '<form target="' + PayVip.ACTION_MODE + '" method="get" action="' + PayVip.API_ACTION_PAY + '" id="' + this.formId + '" style="display:none;">',
                '<input name="method"/>',
                '<input name="product_name"/>',
                '<input name="start"/>',
                '<input name="business_no"/>',
                '<input name="buy_way"/>',
                '<input name="sign"/>',
                '<input name="dqStatCode"/>',
            '</form>'
        ];
        this.$form = $(form.join(''));
        $('body').append(this.$form);
    }
});
/**
 * 子类的方法集
 */
$.extend(PayVip.prototype, {
    init: function() {
        // var that = this;
        // 如果是VIP用户，那么要进行续费操作
        // 需要获取当前vip产品的到期时间
        // 因为vipStartTime参数，是注入进来的，所以不需要调用接口
        /*if (this.isVip) {
            this.fetchUserInfo(function(currentVipInfo) {
                that.vipStartTime = currentVipInfo.currentVipEndTime;
            });
        } else {
            this.vipStartTime = this.serverTime;
        }*/
        if ($('#' + this.formId).get(0)) {
            $('#' + this.formId).remove();
        }
        this.buildForm();
        this.setFormItemsFromConfig();
        this.setFormItems();
    },
    /**
     * 创建完form之后，设置表单项
     */
    setFormItems: function() {
        // 一些默认的内容
        this.setFormItem('method', 'purchase');
        this.setFormItem('business_no', payUtil.creatBid());
        this.setFormItem('sign', '');
        // 以下是变化内容
        this.setFormItem('product_name', this.productName);
        this.setFormItem('start', this.vipStartTime);
        this.setFormItem('buy_way', this.isVip ? 1 : 0);
        this.setFormItem('dqStatCode', this.dqStateCode ? this.dqStateCode : '');
    },
    setFormItemsFromConfig: function() {
        if (this.addFormItems) {
            for (var o in this.addFormItems) {
                this.$form.append('<input name="'+ o +'" value="'+ this.addFormItems[o] +'" />');
            }
        }
    },
    /**
     * 获取用户的会员信心
     * @param onSuccessCallback
     */
    fetchUserInfo: function(onSuccessCallback) {
        this.ajaxUserInfo(onSuccessCallback);
    },
    /**
     * 获取用户信息
     * @param callback
     */
    ajaxUserInfo: function (onSuccessCallback) {
        var _this = this;
        $.ajax({
            url: '/rest/2.0/membership/user?method=query',
            type: "GET",
            timeout: 10000,
            cache: false,
            async: false,
            dataType: 'JSON',
            success: function (data) {
                _this.doVipDuration(data.product_infos, onSuccessCallback);
            },
            error: function () {
                Context.instanceForSystem.ui.tip({
                    mode: 'caution',
                    msg: '网络错误，请稍候重试'
                });
            }
        });
    },
    /**
     * 获取用户的基本会员信息之后，重新设定会员有效期时间
     * @param userData
     * @param onSuccessCallback
     */
    doVipDuration: function (userData, onSuccessCallback) {
        var entity,
            vipProducts = [],
            list = userData;
        for (var i = 0; i < list.length; i++) {
            entity = list[i];
            if (/vip1/gi.test(entity.product_name)) {
                vipProducts.push(entity);
            }
        }
        if (vipProducts.length != 0) {
            var start_time = parseFloat(vipProducts[0].start_time);
            var end_time = parseFloat(vipProducts[0].end_time);
        }
        for (var j = 0; j < vipProducts.length; j++) {
            start_time = parseFloat(vipProducts[j].start_time) > start_time ? start_time : parseFloat(vipProducts[j].start_time);
            end_time = parseFloat(vipProducts[j].end_time) < end_time ? end_time : parseFloat(vipProducts[j].end_time);
        }
        // 如果页面需要对会员用户的有效期进行显示的话，使用这个回调函数
        if (onSuccessCallback && typeof onSuccessCallback === 'function') {
            onSuccessCallback({
                currentVipStartTime: start_time,
                currentVipEndTime: end_time
            });
        }
    }
});

module.exports = PayVip;