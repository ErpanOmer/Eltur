<template>
  <div id="member">
    <blur :blur-amount=3 :url="url">
      <div class="center">
        <img src="../../../assets/businessman.png">
        <p class="back"><span>登陆/注册</span></p>
      </div>
    </blur>
    <flexbox>
      <flexbox-item>
        <div class="flex-demo">
          <img src="../../../assets/question.png" alt="">
          <p>我的咨询</p>
        </div>
      </flexbox-item>
      <flexbox-item style="margin:0;">
        <div class="flex-demo">
          <img src="../../../assets/collection.png" alt="">
          <p>我的收藏</p>
        </div>
      </flexbox-item>
    </flexbox>
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import Tabbar from '@/components/Public/Tabbar'
import { Flexbox, FlexboxItem, Blur } from 'vux'
import background from '@/assets/47.jpg'
export default {
  components: {
    Tabbar, Blur, Flexbox, FlexboxItem
  },
  data: () => ({
    msg: '个人中心',
    url: background
  })
}
</script>
<style media="screen">
#member .center {
  position: relative;
  text-align: center;
  padding-top: 25px;
  color: #fff;
  font-size: 18px;
}
#member .center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 7px solid rgba(255, 255, 255, .4);
}
#member .center .back {
  position: absolute;
  top:32px;
  left: 50%;
  font-size: 14px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, .4);
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  line-height: 120px;
}
#member .flex-demo {
  height: 100px;
  box-sizing: border-box;
  margin: 10px;
  font-size: 14px;
  padding-top: 5px;
  text-align: center;
  background-clip: border-box;
}
#member .flex-demo img {
  width: 50px;
}
</style>
