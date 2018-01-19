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
a {
  color: #000000;
}
.weui-btn_loading,.weui-btn_loading.weui-btn_primary,.weui-btn_primary,.weui-btn_primary:not(.weui-btn_disabled):active, #app .vux-tab-ink-bar{
  background-color: #c3a768;
}
.weui-dialog__btn_primary {
  color: #c3a768 !important;
}
.weui-btn_disabled.weui-btn_primary {
  background-color: #f2dfb5;
}
.weui-btn_primary:not(.weui-btn_disabled):visited {
  color: #999999;
}
.weui-btn_plain-primary {
  color: #c3a768;
  border: 1px solid #c3a768;
}
.weui-btn_plain-primary:not(.weui-btn_disabled):active {
  color: #ffffff;
  border: 1px solid #c3a768;
}
body .dp-header .dp-item.dp-right, body .dp-header .dp-item, #app .vux-tab .vux-tab-item.vux-tab-selected {
  color: #c3a768;
}
.weui-cells {
  font-size: 14px;
}
.weui-cell:before {
  left:0;
}
.vux-divider {
  font-size: 14px;
}
.weui-toast__content {
  font-size: 14px;
}
.weui-btn {
  font-size: 16px;
}
.weui-form-preview__btn {
  font-size: 14px;
}
i {
  top: 0;
  font-size: 14px;
}
.vux-number-selector {
  color: #c3a768;
}
.vux-number-selector svg {
  fill: #c3a768;
}
.weui-tabbar__icon > sup {
  top: -1px;
}
.vux-reddot:after{
  right: -5px;
  top:0px;
}
</style>

<style>
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
