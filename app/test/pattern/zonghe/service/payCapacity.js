/**
 * @file 支付服务-容量
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
 *  new PayCapacity({
 *      mode: ,
 *      isLogin: ,
 *      serverTime: ,
 *      productId: ,    // 可选
 *      formId: ,   // 可选
 *      isVip: ,
 *      quotaStartTime: , // 会员开始日期
 *      dqStateCode: ,  // 可选
 *      buyWay: // 可选。叠加：PayCapacity.MODE_BUY_WAY_COMPOSITION；续费：PayCapacity.MODE_BUY_WAY_RENEW
 *  });
 *
 * @class
 * @extends PayBase
 */
var PayCapacity = function(config) {
    this.$form = null;
    this.serverTime = config.serverTime;
    this.isVip = config.isVip;
    this.quotaStartTime = config.quotaStartTime;
    this.formId = config.formId || PayCapacity.DEFAULT_FORM_ID;
    this.productId = config.productId || PayCapacity.DEFAULT_PRODUCT_ID;
    this.buyWay = config.buyWay || PayCapacity.MODE_BUY_WAY_DEFAULT;
    if (config.dqStateCode) {
        this.dqStateCode = config.dqStateCode;
    } else {
        this.dqStateCode = '';
    }
    this.init();
};
PayCapacity.API_ACTION_PAY = '/rest/2.0/membership/product';
PayCapacity.ACTION_MODE = '_target';
PayCapacity.DEFAULT_FORM_ID = 'payQuotaForm';
PayCapacity.MODE_BUY_WAY_RENEW = 1; // 续费
PayCapacity.MODE_BUY_WAY_COMPOSITION = 2; // 叠加
PayCapacity.MODE_BUY_WAY_DEFAULT = PayCapacity.MODE_BUY_WAY_RENEW;
PayCapacity.PACKAGE_LIST = [
    {
        "product_name": "15GB",
        "product_id": "4880050357179372399"
    },
    {
        "product_name": "30GB",
        "product_id": "13566730592746897967"
    },
    {
        "product_name": "50GB",
        "product_id": "1669981989677457522"
    },
    {
        "product_name": "100GB",
        "product_id": "17280046393110397375"
    }
];
PayCapacity.DEFAULT_PRODUCT_ID = PayCapacity.PACKAGE_LIST[2].product_id;
PayCapacity.prototype = new PayBase();
/**
 * 覆盖继承自父类的方法
 */
$.extend(PayCapacity.prototype, {
    buildForm: function() {
        var form = [
            '<form target="' + PayCapacity.ACTION_MODE + '" method="get" action="' + PayCapacity.API_ACTION_PAY + '" id="' + this.formId + '" style="display:none;">',
                '<input name="method">',
                '<input name="business_no">',
                '<input name="sign">',

                '<input name="product_id">',
                '<input name="start">',
                '<input name="buy_way">',
                '<input name="dqStatCode">',
                '<input name="pay_way">',
                '<input name="vcode_str">',
            '</form>'
        ];
        this.$form = $(form.join(''));
        $('body').append(this.$form);
    }
});
/**
 * 子类的方法集
 */
$.extend(PayCapacity.prototype, {
    init: function() {
        var that = this;
        // 需要获取当前用户是否购买过容量产品
        // 好计算容量产品的开始时间
        /*this.ajaxCurrenUserQouta(function(currentQuotaInfo) {
            that.quotaStartTime = currentQuotaInfo.currentQuotaStartTime;
        });*/
        /*if (this.isVip) {
            this.ajaxCurrenUserQouta(function(currentQuotaInfo) {
                that.quotaStartTime = currentQuotaInfo.currentQuotaStartTime;
            });
        } else {
            this.quotaStartTime = this.serverTime;
        }*/
        if ($('#' + this.formId).get(0)) {
            $('#' + this.formId).remove();
        }
        this.buildForm();
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
        this.setFormItem('product_id', this.productId);
        this.setFormItem('start', this.quotaStartTime);
        this.setFormItem('buy_way', this.buyWay);
        this.setFormItem('dqStatCode', this.dqStateCode);
    },
    /**
     * 获取当前容量
     * @private
     */
    ajaxCurrenUserQouta: function() {
        var that = this;
        $.ajax({
            url: '/api/quota',
            type: "GET",
            timeout: 10000,
            cache: true,
            async: false,
            dataType: "JSON",
            success: function (data) {
                that.checkUserProduct(data);
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
     * 检测用户是否买过容量产品
     * @param userData
     * @param onSuccessCallback
     */
    checkUserProduct: (function() {
        /**
         * 对用户购买的容量产品进行排序
         */
        var getLastQuotaTimeByProducts = function(productInfos) {
            var lastQuotaTime = 0,
                productInfo;
            for (var i = 0, len = productInfos.length; i < len; i++) {
                productInfo = productInfos[i];
                if (productInfo.end_time > lastQuotaTime) {
                    lastQuotaTime = productInfo.end_time;
                }
            }
            return lastQuotaTime;
        };
        return function(userData, onSuccessCallback) {
            var productInfos = userData.product_infos;
            var currentQuotaProducts = [];
            var currentQuotaStartTime;
            // 遍历所有的产品ID
            for (var i = 0; i < PayCapacity.PACKAGE_LIST.length; i++) {
                var product_id = PayCapacity.PACKAGE_LIST[i].product_id;
                // 遍历当前用户的产品，如果服务器当前时间>产品的到期时间，跳过
                for (var j = 0; j < productInfos.length; j++) {
                    if (userData.currenttime > productInfos[j].end_time) {
                        continue;
                    }
                    // 这个是没有过期的产品
                    if (product_id == productInfos[j].product_id) {
                        currentQuotaProducts.push(userData.product_infos[j]);
                    }
                }
            }
            var lastQuotaTime = getLastQuotaTimeByProducts(currentQuotaProducts);
            if (onSuccessCallback && typeof onSuccessCallback === 'function') {
                onSuccessCallback({
                    currentQuotaStartTime: lastQuotaTime
                });
            }
        };
    })()
});

module.exports = PayCapacity;