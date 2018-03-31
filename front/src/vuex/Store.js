import Vue from 'vue'
import Vuex from 'vuex'
const self = Vue.prototype
Vue.use(Vuex)
const Store = new Vuex.Store({
  state: {
    isLoading: false,
    userInfo: {}, // 用户信息
    postComment: '',
    itemIndex: 0
  },
  getters: {
    isLoading: state => state.isLoading,
    userInfo: state => state.userInfo,
    getPostComment: state => state.postComment,
    getItemIndex: state => state.itemIndex
  },
  mutations: {
    setPostCommet (state, commet) {
      state.postComment = commet
    },
    setItemIndex (state, index) {
      state.itemIndex = index
    }
  },
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
