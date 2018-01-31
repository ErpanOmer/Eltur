<script>
  let Util = {}
  Util.install = function (Vue, options) {
    Vue.prototype.$configs = {
      apiURL: 'http://www.eltur.cn',
      api: {
        login: '/application/login',
        register: '/application/register',
        sms: '/eltur/sms',
        memberInfo: '/application/getInfo'
      }
    }
    //   通用日期函数
    //  type:1  返回  时：分：秒
    //  type:2  返回 年-月-日
    //  type:3  返回  年-月-日 时：分：秒
    Vue.prototype.$getTime = function (time, type = 3) {
      if (!time) {
        return
      }
      const TIME = new Date(time * 1000)
      const YEAR = TIME.getFullYear()
      const MONTH = TIME.getMonth() + 1 < 10 ? '0' + (TIME.getMonth() + 1) : TIME.getMonth() + 1
      const DAY = TIME.getDate() < 10 ? '0' + TIME.getDate() : TIME.getDate()
      const HOURS = TIME.getHours() < 10 ? '0' + TIME.getHours() : TIME.getHours()
      const MINUTES = TIME.getMinutes() < 10 ? '0' + TIME.getMinutes() : TIME.getMinutes()
      const SECONDS = TIME.getSeconds() < 10 ? '0' + TIME.getSeconds() : TIME.getSeconds()
      if (type === 1) {
        return HOURS + ':' + MINUTES + ':' + SECONDS
      }
      if (type === 2) {
        return YEAR + '-' + MONTH + '-' + DAY
      }
      if (type === 3) {
        return YEAR + '-' + MONTH + '-' + DAY + '  ' + HOURS + ':' + MINUTES + ':' + SECONDS
      }
    }
    //  这个函数的功能是 手机格式化输出
    //  第一个参数是11位手机号， 类型可以是字符串 & 数字， 必填
    //  第二个参数是  分割符  类型可以是任何一个字符 ， 默认值值是空格
    Vue.prototype.$setMobileFormat = function (mobile, delimiter = ' ') {
      if (!mobile) {
        return
      }
      let number = mobile.toString().split('')
      let start = number.slice(0, 3).join('')
      let middle = number.slice(3, 7).join('')
      let end = number.slice(7, 11).join('')
      return `${start + delimiter}${middle + delimiter}${end}`
    }
  }
  module.exports = Util
</script>
