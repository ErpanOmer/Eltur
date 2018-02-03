import Vue from 'vue'
import Vuex from 'vuex'
const self = Vue.prototype
Vue.use(Vuex)
const Store = new Vuex.Store({
  state: {
    isLoading: false,
    memberInfo: {}    //  用户信息
  },
  getters: {
    isLoading: state => state.isLoading,
    memberInfo: state => state.memberInfo
  },
  mutations: {},
  actions: {
    memberInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        Vue.http.get(self.$configs.apiURL + self.$configs.api.memberInfo)
        .then(res => {}, res => {
          if (res.code === 520 && res.success) {
            state.memberInfo = res.data
            state.isLoading = true
            resolve(state.memberInfo)
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
