/**
 * @file 创建支付的工厂
 * @author jinguangguo(jinguangguof@baidu.com)
 * @date 2015/4/20
 */

var $ = require('base:widget/libs/jquerypacket.js'),
    PayVip = require("./service/payVip.js"),
    PayCapacity = require("./service/payCapacity.js"),
    PayActivity = require("./service/payActivity.js"),
    payUtil = require("./service/payUtil.js");

var payFactory = {};
payFactory.Mode_Vip = 1;
payFactory.Mode_Quota = 2;
payFactory.Mode_Activity = 3;
payFactory.createPayService = function(config) {
    var payService;
    if (!config.mode) {
        throw new Error('The mode of pay is must !');
    }
    if (!config.isLogin) {
        throw new Error('The isLogin of pay is must !');
    }
    if (config.isLogin === false) {
        payUtil.toLogin();
        return;
    }
    switch (config.mode) {
        case payFactory.Mode_Vip:
            if (config.isVip === undefined) {
                throw new Error('The isVip of config is must !');
            }
            if (!config.serverTime) {
                throw new Error('The serverTime of config is must !');
            }
            payService = new PayVip(config);
            break;
        case payFactory.Mode_Quota:
            payService = new PayCapacity(config);
            break;
        case payFactory.Mode_Activity:
            payService = new PayActivity(config);
            break;
        default:
            throw new Error('The mode of pay is empty ! Please check the mode !');
    }
    return payService;
};

module.exports = payFactory;