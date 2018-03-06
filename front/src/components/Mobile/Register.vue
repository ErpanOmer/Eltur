<template>
  <div id="courier-register">
    <div class="logo">
      <p>Eltur</p>
    </div>
    <group label-width="80px">
      <x-input title="手机号码" mask="999 9999 9999" placeholder="输入手机号" v-model="mobile" :max="13" keyboard="number"></x-input>
      <x-input title="验证码" type="text" placeholder="输入验证码" v-model="code" :min="4" :max="6" style="padding: 5.44px 15px;">
        <x-button slot="right" type="primary" ref="on" @click.native="requestCode()" :disabled="sended" mini>{{ sended ? second + ' 秒后重发' : '发送验证码' }}</x-button>
      </x-input>
      <x-input title="登录密码" type="password" placeholder="密码4-12位" v-model="password"  :max="12"></x-input>
      <x-input title="重复密码" v-model="password2" type="password" placeholder="密码4-12位" :max="12"></x-input>
    </group>
    <div style="padding:30px 15px 15px;">
      <x-button type="primary" @click.native="submit()">注册</x-button>
    </div>
  </div>
</template>
<script>
import { XButton, XInput, Group, Cell, CheckIcon } from 'vux'
export default {
  name: '',
  data: () => ({
    mobile: '',
    code: '',
    second: 60,
    sended: false,  //  是否发送验证码
    agree: true,
    password: '',
    password2: '',
    appName: ''
  }),
  components: {
    XButton, XInput, Group, Cell, CheckIcon
  },
  mounted () {
  },
  methods: {
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
    submit: function () {
      if (this.$isEmptyParam(this.mobile)) {
        this.$vux.toast.text('请输入手机号')
        return false
      }
      if (!this.$checkMobileFormat(this.mobile.replace(/\s/g, ''))) {
        this.$vux.toast.text('请正确输入手机号')
        return false
      }
      if (this.$isEmptyParam(this.code)) {
        this.$vux.toast.text('请输入验证码')
        return false
      }
      if (this.$isEmptyParam(this.password)) {
        this.$vux.toast.text('请输入密码')
        return false
      }
      if (this.$isEmptyParam(this.password2)) {
        this.$vux.toast.text('请输入确认密码')
        return false
      }
      if (this.password !== this.password2) {
        this.$vux.toast.text('两次密码不一致')
        return false
      }
      let data = {}
      data.mobile = this.mobile.replace(/\s/g, '')
      data.code = this.code
      data.password = this.password2
      this.$postData(this.$configs.api.register, data, response => {
        if (response) {
          const currentRoutePath = localStorage.getItem('currentRoutePath')
          this.$postData(this.$configs.api.login, { mobile: data.mobile, password: data.password, status: 2 }, response => {
            localStorage.token = response.token
            this.$vux.toast.text('注册成功')
            if (!this.$isEmptyParam(currentRoutePath)) {
              setTimeout(() => {
                this.$router.push(currentRoutePath)
              }, 1500)
            } else {
              setTimeout(() => {
                this.$router.push({ name: 'Index' })
              }, 1500)
            }
          })
        }
      })
    }
  }
}
</script>
<style media="screen">
/*  注册页面  */
 #courier-register > .small {
   height: 25px;
   width: auto;
   text-align: center;
   font-size:14px;
 }
#courier-register > p {
  color: rgb(61,149,255);
  text-align: center;
  font-size:14px;
}
#courier-register .weui-btn_mini {
  font-size: 13px;
  min-width: 101px;
}
#courier-register .logo p {
  font-size: 30px;
  margin: 2em auto;
  text-align: center;
  color: #191718;
  font-weight: 500;
}
</style>
