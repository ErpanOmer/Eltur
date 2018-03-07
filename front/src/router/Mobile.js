import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Mobile/Index'
import Article from '@/components/Mobile/Article/Index'
import Member from '@/components/Mobile/Member/Index'
import Consult from '@/components/Mobile/Consult/Index'
import Login from '@/components/Mobile/Login'
import Register from '@/components/Mobile/Register'
import PersonalData from '@/components/Mobile/Member/PersonalData'
import Textarea from '@/components/Mobile/Member/Textarea'
import Process from '@/components/Mobile/Consult/Process'
import Lawyer from '@/components/Mobile/Consult/Lawyer'
Vue.use(Router)
export default new Router({
  mode: 'history', //   后端支持可开
  base: 'index/',
  routes: [
    { path: '/', name: 'Index', component: Index },
    { path: '/Member', name: 'Member', component: Member },
    { path: '/Consult', name: 'Consult', component: Consult },
    { path: '/Article', name: 'Article', component: Article },
    { path: '/Login', name: 'Login', component: Login },
    { path: '/PersonalData', name: 'PersonalData', component: PersonalData },
    { path: '/Register', name: 'Register', component: Register },
    { path: '/Textarea', name: 'Textarea', component: Textarea },
    { path: '/Process', name: 'Process', component: Process },
    { path: '/Lawyer', name: 'Lawyer', component: Lawyer }
  ]
})
