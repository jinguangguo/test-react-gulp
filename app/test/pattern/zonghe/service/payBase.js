/**
 * @file 支付服务的父类
 * @author jinguangguo(jinguangguof@baidu.com)
 * @date 2015/4/20
 */

/**
 * 支付的父类
 * @class
 */
var PayBase = function() {

};
/**
 * 去支付
 */
PayBase.prototype.toPay = function() {
    if (this.$form) {
        if (window.console) {
            console.log(this.$form.serialize());
        }
        // this.$form.submit();
        $('#' + this.formId).submit();
    }
};
/**
 * 创建支付表单
 */
PayBase.prototype.buildForm = function() {
    throw new Error('The method "buildForm" must be inherited !');
};
/**
 * 给表单赋值
 * @param name
 * @param value
 */
PayBase.prototype.setFormItem = function(name, value) {
    if (this.$form) {
        this.$form.find('input[name="' + name + '"]').val(value);
    }
};

module.exports = PayBase;