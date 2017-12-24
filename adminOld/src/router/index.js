import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Article from '@/components/Article/Article'
import Reply from '@/components/Reply/Reply'
import Me from '@/components/Me/Me'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: '/admin',
  routes: [
    { path: '/', name: 'Index', component: Index },
    { path: '/Article', name: 'Article', component: Article },
    { path: '/Reply', name: 'Reply', component: Reply },
    { path: '/Me', name: 'Me', component: Me }
  ]
})
