<script>
  var Validate = {}
  Validate.install = function (Vue, options) {
    Vue.prototype.$isEmptyParam = function (param) {
      if (param === undefined || param === '' || param === null) {
        return true
      } else {
        return false
      }
    }
    Vue.prototype.$checkLength = function (value, min, max) {
      min = typeof min !== 'undefined' ? min : 0
      if (value.length < parseInt(min)) {
        return '最少需要' + min + '个字符'
      }

      if (typeof min !== 'undefined') {
        if (value.length > parseInt(max)) {
          return '最多可以输入' + max + '个字符'
        }
      }

      return false
    }
    Vue.prototype.$checkMobileFormat = function (mobile) {
      return (/^1\d{10}$/.test(mobile))
    }
    Vue.prototype.$isEmail = function (str) {
      let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      return reg.test(str)
    }
    Vue.prototype.$isWechat = function () {
      var ua = window.navigator.userAgent.toLowerCase()
      return ua.indexOf('micromessenger') !== -1
    }
    Vue.prototype.$isBankCard = function (num) {
      var pattern = /^([1-9]{1})(\d{14}|\d{18})$/
      return pattern.test(num)
    }
  }
  module.exports = Validate
</script>
