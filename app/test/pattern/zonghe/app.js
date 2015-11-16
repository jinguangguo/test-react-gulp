/**
 * @file
 * @author jinguangguo
 * @date 2015/11/16
 */

var payFactory = require('./payFactory');

var payVip = payFactory.createPayService(payFactory.Mode_Vip);

payVip.toPay({
    vipStartTime: '2015-9-10',
    isLogin: serverEnd.isLogin
});