<template>
  <div id="login">
    <tab>
      <tab-item selected @on-item-click="onItemClick">验证码登陆</tab-item>
      <tab-item @on-item-click="onItemClick">密码登陆</tab-item>
    </tab>
    <div class="logo">
      <p>Eltur</p>
    </div>
    <div>
    <group v-show="itemIndex === 0" label-width="80px" label-align="left">
      <x-input title="手机号码" mask="999 9999 9999" placeholder="请输入手机号码"  v-model="mobile" :max="13" keyboard="number"></x-input>
      <x-input title="验证码" type="text" placeholder="请输入验证码" v-model="code" :min="4" :max="6" style="padding: 5.44px 15px;">
        <x-button slot="right" type="primary" ref="on" @click.native="requestCode()" :disabled="sended" required mini>{{ sended ? second + ' 秒后重发' : '发送验证码' }}</x-button>
      </x-input>
    </group>
    <group v-show="itemIndex === 1" label-width="80px" label-align="left">
      <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" mask="999 9999 9999" v-model="mobile" keyboard="number" :max="13"></x-input>
      <x-input title="登录密码" name="password" placeholder="4-12个字符" type="password" v-model="password" :min="4" :max="12"></x-input>
    </group>
    <div style="padding:25px 15px;">
      <x-button type="primary" @click.native="submit">登录</x-button>
      <div style="padding-top:10px;">
        <flexbox>
          <flexbox-item style="font-size:14px;color:#666;">忘记密码</flexbox-item>
          <flexbox-item style="text-align:right;font-size:14px;color:#666;" @click.native="$router.push({ name: 'Register'})">快速注册</flexbox-item>
        </flexbox>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { Group, XInput, XButton, Flexbox, FlexboxItem, Divider, Tab, TabItem } from 'vux'
export default {
  data: function () {
    return {
      mobile: '',
      password: '',
      code: null,
      sended: false,
      itemIndex: 0,
      second: 60
    }
  },
  mounted () {
  },
  methods: {
    onItemClick: function (index) {
      this.itemIndex = index
    },
    requestCode: function () {
      if (this.$isEmptyParam(this.mobile)) {
        this.$vux.toast.text('请输入手机号')
        return false
      }
      if (!this.$checkMobileFormat(this.mobile.replace(/\s/g, ''))) {
        this.$vux.toast.text('请正确输入手机号')
        return false
      }
      this.$postData(this.$configs.api.sms, { mobile: this.mobile.replace(/\s/g, '') }, response => {
        if (response) {
          this.sended = !this.sended
          this.countDown()
          this.$vux.toast.text('发送成功')
        }
      })
    },
    countDown: function () {
      setInterval(() => {
        if (this.second < 1) {
          this.sended = false
          this.second = 60
          return
        }
        this.second--
      }, 1000)
    },
    submit: function submit () {
      const currentRoutePath = localStorage.getItem('currentRoutePath')
      const data = {}
      if (this.$isEmptyParam(this.mobile)) {
        this.$vux.toast.text('请输入手机号')
        return false
      }
      if (!this.$checkMobileFormat(this.mobile.replace(/\s/g, ''))) {
        this.$vux.toast.text('请正确输入手机号')
        return false
      }
      if (this.itemIndex === 0) {
        if (this.$isEmptyParam(this.code)) {
          this.$vux.toast.text('请输入验证码')
          return false
        }
        data.code = this.code
        data.status = 1
      } else if (this.itemIndex === 1) {
        if (this.$isEmptyParam(this.password)) {
          this.$vux.toast.text('请输入密码')
          return false
        }
        if (this.password.length > 12 || this.password.length < 4) {
          this.$vux.toast.text('请输入4-12位密码')
          return false
        }
        data.password = this.password
        data.status = 2
      }
      data.mobile = this.mobile.replace(/\s/g, '')
      this.$postData(this.$configs.api.login, data, response => {
        if (response) {
          localStorage.token = response.token
          this.$vux.toast.text('登陆成功')
          if (!this.$isEmptyParam(currentRoutePath)) {
            setTimeout(() => {
              this.$router.replace(currentRoutePath)
            }, 1500)
          } else {
            setTimeout(() => {
              this.$router.replace({ name: 'Index' })
            }, 1500)
          }
        }
      })
    }
  },
  components: {
    Group,
    XInput,
    XButton,
    Flexbox,
    FlexboxItem,
    Divider,
    Tab,
    TabItem
  }
}
</script>
<style>
  #login .logo p {
    font-size: 30px;
    margin: 2em auto;
    text-align: center;
    color: #191718;
    font-weight: 500;
  }
</style>
