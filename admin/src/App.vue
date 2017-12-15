<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
<style>
  body {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #f8f8f8;
    font-family:'UKIJTuzTom';
    font-weight: normal;
  }
  #app {
    margin-bottom: 53px;
  }
  #app .weui-cells {
    font-size: 14px;
  }
  #app .weui-cells .weui-cell:before {
    left: 0;
  }
  body .weui-check__label:before {
    left: 0;
  }
  body .v-transfer-dom {
    font-size: 14px;
  }
  #app .weui-cells__title {
    margin: 0.77em 0;
  }
  #app .weui-btn {
    font-size: 15px;
    border-radius: 3px;
  }
</style>
