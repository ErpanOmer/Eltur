<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app',
  mounted () {
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: #f8f8f8;
}
</style>
<style>
body .weui-cells,
body .weui-toast__content,
body .router-link-active {
  font-size: 14px;
}
body .weui-btn {
  font-size: 15px;
}
body .weui-btn_mini {
  font-size: 13px;
  min-width: 101px;
}
body .vux-tab .vux-tab-item.vux-tab-selected {
  color: #191718;
}
body .weui-btn_primary, body .vux-tab-ink-bar, body .weui-btn_primary:not(.weui-btn_disabled):active {
    background-color: #191718;
}
body .weui-btn_disabled.weui-btn_primary {
  background-color:#777;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
.list-complete-item {
  transition: all 1s;
}
.list-complete-enter {
  opacity: 0;
  transform: translateX(50px);
}
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
