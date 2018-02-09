<template>
  <div id="member">
    <blur :blur-amount=3 :url="url">
      <div v-if="isLoading" class="center" @click="avatar()">
        <img v-if="$isEmptyParam(userInfo.avatar)" src="../../../assets/businessman.png">
        <img v-else :src="userInfo.avatar">
        <p class="back" v-show="show"><span>{{per}}</span></p>
      </div>
      <div v-else class="center" @click="$router.replace({ name: 'Login' })">
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
    <Tabbar></Tabbar>
    <button id="pick-avatar" style="display:none;" ref="button">Select An image</button>
    <avatar-cropper
      @uploaded="handleUploaded"
      @uploading="handleUploading"
      trigger="#pick-avatar"
      upload-form-name="file"
      :upload-headers="headers"
      upload-url="http://www.eltur.cn/application/upload">
    </avatar-cropper>
    <progress-bar v-show="show" type="circle" ref="line" :options="options"></progress-bar>
  </div>
</template>
<script>
import Tabbar from '@/components/Public/Tabbar'
import AvatarCropper from 'vue-avatar-cropper'
import { Flexbox, FlexboxItem, Blur, Card, Cell, Group } from 'vux'
import background from '@/assets/47.jpg'
export default {
  components: {
    Tabbar, Blur, Flexbox, FlexboxItem, Card, Cell, Group, AvatarCropper
  },
  data: () => ({
    msg: '个人中心',
    url: background,
    show: false,
    per: null,
    options: {
      color: 'rgba(255, 255, 255, .9)',
      strokeWidth: 7,
      trailWidth: 7,
      trailColor: 'rgba(255, 255, 255, .1)',
      svgStyle: {
        position: 'absolute',
        top: '25px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '-1',
        display: 'block',
        width: '115px',
        height: '115px'
      }
    }
  }),
  computed: {
    isLoading: function () {
      return this.$store.getters.isLoading
    },
    userInfo: function () {
      return this.$store.getters.userInfo
    },
    headers: function () {
      return { token: localStorage.token }
    }
  },
  mounted () {
    if (this.$isEmptyParam(localStorage.token)) {
      return false
    } else {
      this.$store.dispatch('userInfo')
    }
  },
  methods: {
    handleUploading: function (form, xhr) {
      this.show = true
      const self = this
      xhr.upload.onprogress = function (e) {
        const loaded = e.loaded  //  已上传的大小
        const total = e.total  //   总大小
        self.per = Math.floor((loaded / total) * 100) + '%'  //   转换成百分比
        self.$refs.line.animate((loaded / total))
      }
    },
    handleUploaded: function (response, form, xhr) {
      console.log(form)
      this.show = false
      if (response.code === 520 && response.success) {
        this.$putData(this.$configs.api.userInfo, { avatar: response.url }, response => {
          if (response) {
            //  更新数据
            this.$store.dispatch('userInfo')
            this.$vux.toast.text('上传成功')
          }
        })
      } else {
        this.$vux.toast.text('上传失败')
      }
    },
    avatar: function () {
      this.$refs.button.click()
    }
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
