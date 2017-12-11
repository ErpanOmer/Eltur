<script>
  let Util = {}
  Util.install = function (Vue, options) {
    Vue.prototype.$configs = {
      apiURL: 'http://www.eltur.cn',
      api: {
        index: '/index'
      }
    }
    //   通用日期函数
    //  type:1  返回  时：分：秒
    //  type:2  返回 年-月-日
    //  type:3  返回  年-月-日 时：分：秒
    Vue.prototype.$getTime = function (time, type = 3) {
      let TIME = new Date(time * 1000)
      let YEAR = TIME.getFullYear()
      let MONTH = TIME.getMonth() + 1 < 10 ? '0' + (TIME.getMonth() + 1) : TIME.getMonth() + 1
      let DAY = TIME.getDate() < 10 ? '0' + TIME.getDate() : TIME.getDate()
      let HOURS = TIME.getHours() < 10 ? '0' + TIME.getHours() : TIME.getHours()
      let MINUTES = TIME.getMinutes() < 10 ? '0' + TIME.getMinutes() : TIME.getMinutes()
      let SECONDS = TIME.getSeconds() < 10 ? '0' + TIME.getSeconds() : TIME.getSeconds()
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
    Vue.prototype.$delayShowLoading = function (time, text) {
      setTimeout(() => {
        this.$vux.loading.show({
          text: text
        })
      }, time)
    }
    Vue.prototype.$delayHideLoading = function (time) {
      setTimeout(() => {
        this.$vux.loading.hide()
      }, time)
    }
  }
  module.exports = Util
</script>
