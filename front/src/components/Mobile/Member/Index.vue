<template>
  <div id="member">
    <blur :blur-amount=3 :url="url">
      <div class="center" @click="$router.replace({ name: 'Login' })">
        <img src="../../../assets/businessman.png">
        <p class="back"><span>登陆/注册</span></p>
      </div>
    </blur>
    <card>
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <div class="flex-demo">
            <div style="width: 32.5px;">
              <img src="../../../assets/question.png" alt="">
            </div>
            <p style="margin-top: 7.5px;">我的问题</p>
          </div>
        </div>
        <div class="vux-1px-r">
          <div class="flex-demo">
            <div style="width: 30px;padding-top: 5px;">
              <img src="../../../assets/reply.png" alt=""/>
            </div>
            <p style="margin-top: 10px;">我的评论</p>
          </div>
        </div>
        <div class="vux-1px-r">
          <div class="flex-demo">
            <div style="width: 40px;">
              <img src="../../../assets/collection.png" alt="">
            </div>
            <p>我的收藏</p>
          </div>
        </div>
      </div>
    </card>
    <group>
      <cell title="个人资料" is-link :link="{ name: 'PersonalData' }">
        <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../../../assets/men.png"/>
      </cell>
      <cell title="反馈建议" is-link :link="{ name: 'Textarea'}">
        <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../../../assets/me.png"/>
      </cell>
      <!-- <cell title="关于我们" is-link>
        <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../../../assets/us.png"/>
      </cell> -->
    </group>
    <group>
      <cell title="设置" is-link>
        <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../../../assets/setting.png"/>
      </cell>
    </group>
    <input type="file" @change="upload()">
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import Tabbar from '@/components/Public/Tabbar'
import { Flexbox, FlexboxItem, Blur, Card, Cell, Group } from 'vux'
import background from '@/assets/47.jpg'
export default {
  components: {
    Tabbar, Blur, Flexbox, FlexboxItem, Card, Cell, Group
  },
  data: () => ({
    msg: '个人中心',
    url: background
  }),
  mounted () {
    this.$nextTick(() => {
      if (this.$isEmptyParam(localStorage.token)) {
        return false
      } else {
        this.$getData(this.$configs.api.memberInfo, '', response => {
          console.log(response)
        })
      }
    })
  }
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
  font-size: 14px;
  padding-top: 5px;
  text-align: center;
  background-clip: border-box;
}
#member .flex-demo div{
  margin: 0 auto;
}
#member .flex-demo img {
  width: 100%;
}
</style>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.card-demo-flex {
  display: flex;
}
.card-demo-flex > div {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #636363;
  }
.card-demo-content01 {
  padding: 10px 0;
}
</style>
