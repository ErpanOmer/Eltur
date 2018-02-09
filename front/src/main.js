import './assets/font_510396_ficuxwam50zfr/iconfont.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
// get $http
import VueResource from 'vue-resource'
//  vuex
import store from './vuex/Store.js'
//   数据有关方法
import Data from '@/util/Data'
// 表单验证
import Validate from '@/util/Validate'
// 引入Util 以及api
import Util from '@/util/Util'
//   滚动条插件
import infiniteScroll from 'vue-infinite-scroll'
// metaInfo
import metaInfo from 'vue-meta'
// toast
import { ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux'
import Loading from '@/util/Loading'
import VueProgress from '@/util/vue-progress'
FastClick.attach(document.body)
Vue.use(VueResource)
Vue.use(store)
Vue.use(Data)
Vue.use(Validate)
Vue.use(Util)
Vue.use(infiniteScroll)
Vue.use(metaInfo)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(VueProgress)
Vue.use(LoadingPlugin)
Vue.use(Loading, {
  container: '#app'
})
Vue.config.productionTip = false

/* =========================拦截器============================== */
// 请求拦截器
Vue.http.interceptors.push((request, next) => {
  const token = localStorage.getItem('token')
  if (!Vue.prototype.$isEmptyParam(token)) {
    request.headers.set('token', token)
  }
  next((response) => {
    const responseData = response.data
    if (responseData.code === 0 && !responseData.success) {
      localStorage.currentRoutePath = router.history.current.path
      router.replace({ name: 'Login' })
      return false
    } else if (responseData.code === 8888 && !responseData.success) {
      Vue.$vux.toast.text(responseData.message)
      return false
    } else if (responseData.code === 520 && responseData.success) {
      return responseData
    } else {
      Vue.$vux.toast.show({
        text: '网络繁忙，请您稍后重试',
        type: 'cancel'
      })
      return false
    }
  })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  metaInfo: {
    title: 'Eltur', // set a title
    titleTemplate: '%s', // title is now "My Example App - Yay!"
    meta: [
      // { charset: 'utf-8' },
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'},
      {name: 'apple-mobile-web-app-capable', content: 'yes'},
      {name: 'apple-mobile-web-app-status-bar-style', content: 'black'},
      {name: 'format-detection', content: 'telephone=no'},
      {name: 'format-detection', content: 'email=no'}
    ],
    htmlAttrs: {
      lang: 'zh',
      amp: undefined // "amp" has no value
    }
  },
  router,
  store,
  template: '<App/>',
  components: { App }
})
