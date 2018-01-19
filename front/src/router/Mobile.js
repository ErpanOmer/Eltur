import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Mobile/Index'
import Article from '@/components/Mobile/Article/Index'
import Member from '@/components/Mobile/Member/Index'
import Consult from '@/components/Mobile/Consult/Index'
Vue.use(Router)
export default new Router({
  mode: 'history', //   后端支持可开
  routes: [
    { path: '/', name: 'Index', component: Index },
    { path: '/Member', name: 'Member', component: Member },
    { path: '/Consult', name: 'Consult', component: Consult },
    { path: '/Article', name: 'Article', component: Article }
  ]
})
