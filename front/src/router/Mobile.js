import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Mobile/Index'
import Home from '@/components/Mobile/Home'
Vue.use(Router)
export default new Router({
  mode: 'history', //   后端支持可开
  routes: [
    { path: '/', name: 'Index', component: Index },
    { path: '/Home', name: 'Home', component: Home }
  ]
})
