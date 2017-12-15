<template>
  <div id="toolbar">
    <tabbar>
      <tabbar-item @click.native="$router.push({ name: 'Article' })" :class="$route.name === 'Article'? 'active':''">
        <span slot="icon" class="icon iconfont icon-fabu"></span>
        <span slot="label">تېما</span>
      </tabbar-item>
      <tabbar-item @click.native="$router.push({ name: 'Reply' })" :class="$route.name === 'Reply'? 'active':''">
        <span slot="icon" class="icon iconfont icon-weibiaoti11zhuanhuan"></span>
        <span slot="label">قايتۇرۇش</span>
      </tabbar-item>
      <tabbar-item @click.native="$router.push({ name: 'Me' })" :class="$route.name === 'Me'? 'active':''">
        <span slot="icon" class="icon iconfont icon-me"></span>
        <span slot="label">مەن</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  data: () => ({
  }),
  components: {
    Tabbar, TabbarItem
  }
}
</script>
<style media="screen">
/*  底部导航  */
#toolbar {
    position: fixed;
    width: 100%;
    height: 57px;
    bottom: 0;
}
#toolbar .weui-tabbar {
  position: fixed;
}
#toolbar .active .weui-tabbar__icon, #toolbar .active .weui-tabbar__label {
  color: #17cfff;
}
#toolbar .weui-tabbar .iconfont {
  font-size: 18px;
}
#toolbar .weui-tabbar .weui-tabbar__label {
  font-size: 14px;
}
</style>
