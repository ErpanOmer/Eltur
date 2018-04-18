import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_production')
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), name: 'Login', hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'home',
    children: [{
      path: 'home',
      component: _import('home/Index'),
      name: 'home',
      meta: { title: '主页', icon: 'home', noCache: true }
    }]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/Publish',
    name: 'article',
    meta: { title: '文章管理', icon: 'example' },
    children: [
      {
        path: 'Publish',
        name: 'Publish',
        component: _import('article/Publish'),
        meta: { title: '发布文章', icon: 'form' }
      },
      {
        path: 'ArticleList',
        name: 'ArticleList',
        component: _import('article/ArticleList'),
        meta: { title: '文章列表', icon: 'table' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'issue',
    children: [{
      path: 'issue',
      component: _import('issue/Index'),
      name: 'issue',
      meta: { title: '咨询管理', icon: 'home', noCache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'comment',
    children: [{
      path: 'comment',
      component: _import('comment/Index'),
      name: 'comment',
      meta: { title: '评论管理', icon: 'home', noCache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'user',
    children: [{
      path: 'user',
      component: _import('user/Index'),
      name: 'user',
      meta: { title: '用户管理', icon: 'home', noCache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'swiper',
    children: [{
      path: 'swiper',
      component: _import('swiper/Index'),
      name: 'swiper',
      meta: { title: '轮播图管理', icon: 'home', noCache: true }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
export default new Router({
  mode: 'history', //   后端支持可开
  base: '/admin',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
