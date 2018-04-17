import Vue from 'vue'
import Router from 'vue-router'
const Index = resolve => require(['@/components/Mobile/Index'], resolve)
const Article = resolve => require(['@/components/Mobile/Article/Index'], resolve)
const Member = resolve => require(['@/components/Mobile/Member/Index'], resolve)
const Consult = resolve => require(['@/components/Mobile/Consult/Index'], resolve)
const Login = resolve => require(['@/components/Mobile/Login'], resolve)
const Register = resolve => require(['@/components/Mobile/Register'], resolve)
const PersonalData = resolve => require(['@/components/Mobile/Member/PersonalData'], resolve)
const Textarea = resolve => require(['@/components/Mobile/Member/Textarea'], resolve)
const ArticleDetail = resolve => require(['@/components/Mobile/ArticleDetail'], resolve)
const QuickConsultation = resolve => require(['@/components/Mobile/QuickConsultation'], resolve)
const ConsiltDetail = resolve => require(['@/components/Mobile/Consult/ConsiltDetail'], resolve)
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
    { path: '/ArticleDetail', name: 'ArticleDetail', component: ArticleDetail },
    { path: '/QuickConsultation', name: 'QuickConsultation', component: QuickConsultation },
    { path: '/ConsiltDetail', name: 'ConsiltDetail', component: ConsiltDetail }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
