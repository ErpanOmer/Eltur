<template>
  <div class="tabbar">
    <tabbar class="ages-tabbar" style="position: fixed;">
      <tabbar-item :selected="$route.name === 'Index'" @click.native="$router.push({ name: 'Index' })">
        <span slot="icon" class="icon iconfont icon-xinwen"></span>
        <span slot="label">新闻</span>
      </tabbar-item>
      <tabbar-item  :selected="$route.name === 'Article'" @click.native="$router.push({ name: 'Article' })">
        <span slot="icon" class="icon iconfont icon-icon9"></span>
        <span slot="label">文章</span>
      </tabbar-item>
      <tabbar-item  :selected="$route.name === 'Consult'" @click.native="$router.push({ name: 'Consult' })">
        <span slot="icon" class="icon iconfont icon-085shucezhongxin"></span>
        <span slot="label">咨询</span>
      </tabbar-item>
      <tabbar-item :selected="$route.name === 'Member'"  @click.native="$router.push({ name: 'Member' })">
        <span slot="icon" class="icon iconfont icon-me"></span>
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
  import {Tabbar, TabbarItem} from 'vux'
  export default {
    components: {
      Tabbar,
      TabbarItem
    },
    data: function () {
      return {
      }
    }
  }
</script>

<style lang="less">
  .tabbar{
    line-height: 1.6;
  }
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on
  .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color: #c3a768 !important;
    height: 10px;
  }

  .tabbar .weui-tabbar__item {
    background: #191718;
    padding: 2px 0 3px;
  }
  .weui-tabbar__label{
    padding-top: 3px;
  }

  .ages-tabbar .iconfont {
    font-size: 24px;
    position: relative;
  }
</style>
