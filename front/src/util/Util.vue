<script>
  let Util = {}
  Util.install = function (Vue, options) {
    Vue.prototype.$configs = {
      apiURL: 'http://api.eltur.cn',
      api: {
        login: '/application/login',
        a: '/application/a',
        sms: '/eltur/sms',
        userInfo: '/application/userInfo',
        article: '/application/Article',
        readingRankings: '/application/readingRankings',
        fabulous: '/application/Fabulous',
        comments: '/application/Comments',
        issue: '/application/issue',
        swiper: '/application/swiper'
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
    Vue.prototype.$formatTime = function (time) {
      let result = ''
      let minute = 1000 * 60
      let hour = minute * 60
      let day = hour * 24
      let month = day * 30
      let now = new Date().getTime()
      let diffValue = now - time * 1000
      if (diffValue < 0) {
        return
      }
      let monthC = diffValue / month
      let weekC = diffValue / (7 * day)
      let dayC = diffValue / day
      let hourC = diffValue / hour
      let minC = diffValue / minute
      if (monthC >= 1) {
        result = '' + parseInt(monthC) + '月前'
      } else if (weekC >= 1) {
        result = '' + parseInt(weekC) + '周前'
      } else if (dayC >= 1) {
        result = '' + parseInt(dayC) + '天前'
      } else if (hourC >= 1) {
        result = '' + parseInt(hourC) + '小时前'
      } else if (minC >= 1) {
        result = '' + parseInt(minC) + '分钟前'
      } else {
        result = '刚刚'
      }
      return result
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
