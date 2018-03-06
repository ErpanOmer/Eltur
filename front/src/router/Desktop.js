import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Desktop/Index'
import Home from '@/components/Desktop/Home'
Vue.use(Router)
export default new Router({
  mode: 'history', //   后端支持可开
  base: 'index/',
  routes: [
    { path: '/', name: 'Index', component: Index },
    { path: '/Home', name: 'Home', component: Home }
  ]
})
