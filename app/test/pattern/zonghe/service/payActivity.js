/**
 * @file 支付服务-活动-预留
 * @author jinguangguo(jinguangguof@baidu.com)
 * @date 2015/4/20
 */

var $ = require('base:widget/libs/jquerypacket.js');
/**
 * 子类-活动支付-预留
 * @param config
 *
 * @class
 * @extends PayBase
 */
var PayActivity = function(config) {

};

/**
 * 覆盖继承自父类的方法
 */
$.extend(PayActivity.prototype, {
    buildForm: function() {
        var form = [
            '<form target="' + PayActivity.ACTION_MODE + '" method="get" action="' + PayActivity.API_ACTION_PAY + '" id="' + this.formId + '" style="display:none;">',
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
    }
});
/**
 * 子类的方法集
 */
$.extend(PayActivity.prototype, {
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
                Toast.obtain.useToast({
                    toastMode: Toast.obtain.MODE_LOADING,
                    msg: "网络错误，请稍候重试",
                    sticky: false,
                    closeType: false
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

module.exports = PayActivity;