import Vue from 'vue'
import Vuex from 'vuex'
const self = Vue.prototype
Vue.use(Vuex)
const Store = new Vuex.Store({
  state: {
    isLoading: false,
    userInfo: {} // 用户信息
  },
  getters: {
    isLoading: state => state.isLoading,
    userInfo: state => state.userInfo
  },
  mutations: {},
  actions: {
    userInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        Vue.http.get(self.$configs.apiURL + self.$configs.api.userInfo).then(res => {}, res => {
          if (res.code === 520 && res.success) {
            state.userInfo = res.data
            state.isLoading = true
            resolve(state.userInfo)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
})
//  输出
export default Store
