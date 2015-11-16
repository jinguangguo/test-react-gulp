/**
 * @file 支付服务的工具方集
 * @author jinguangguo(jinguangguof@baidu.com)
 * @date 2015/4/21
 */
var $ = require('base:widget/libs/jquerypacket.js'),
    Context = require('disk-system:widget/context/context.js');

var _pub = {
    /**
     * 创建businuss ID，供支付表单使用
     * @returns {string}
     */
    creatBid: function() {
        return new Date().getTime() + '' + Math.round(Math.random()*9999);
    },
    /**
     * 格式化时间
     * @param t
     * @param isFull
     * @returns {string}
     */
    timeFormat: function (t, isFull) {
        var time = new Date(parseFloat(t) * 1000);
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
        if (!!+isFull) {
            return time.getFullYear() + "-"
                + (String(month).length < 2 ? "0" + month : month) + "-"
                + (String(date).length < 2 ? "0" + date : date) + " "
                + (String(hour).length < 2 ? "0" + hour : hour) + ":"
                + (String(minute).length < 2 ? "0" + minute : minute) + ":"
                + (String(second).length < 2 ? "0" + second : second);
        } else {
            return time.getFullYear() + "-"
                + (String(month).length < 2 ? "0" + month : month) + "-"
                + (String(date).length < 2 ? "0" + date : date) ;
        }
    },
    /**
     * 登录
     * @return  {undefined}
     * @private
     */
    toLogin: function () {
        var tip = Context.instanceForSystem.ui.tip({
            mode: 'loading',
            msg: "请稍候..."
        });
        require.async("disk-system:widget/system/uiService/passAPI/passAPI.js", function (script) {
            tip.hideTip();
            script.promise.done(function () {
                script.passAPI.PassportInit.netdiskLogin({
                    reload: true
                });
                script.passAPI.PassLoginDialog.onLoginSuccessCallback = function () {
                    script.passAPI.PassportInit.hide();
                };
            });
        });
    }
};

module.exports = _pub;