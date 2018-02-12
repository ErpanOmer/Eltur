<template>
  <div id="personal-data">
    <group-title slot="title">个人资料
      <span class="spinner" v-show="progress"><spinner size="20px" type="android"></spinner><span style="margin-right:5px;">{{per}}</span></span>
    </group-title>
      <group>
        <cell style="padding: 2.5px 15px;">
          <span class="name" v-if="userInfo.name" slot="after-title" @click="show = true" v-text="userInfo.name"></span>
          <span class="name" v-else slot="after-title" @click="show = true" v-text="userInfo.mobile"></span>
          <img v-if="$isEmptyParam(userInfo.avatar)" @click="avatar()" slot="default" width="45" height="45" style="display:block;margin-right:5px;" src="../../../assets/businessman.png"/>
          <img v-else slot="default" width="45" height="45" @click="avatar()" style="display:block;margin-right:5px;" :src="userInfo.avatar"/>
        </cell>
        <popup-picker title="性别" :data="sexList" v-model="sex" @on-hide="modifySex"></popup-picker>
        <datetime title="生日" v-model="time = userInfo.birthday" :min-year="1970" :max-year="2010" default-selected-value="1990-01-01" value-text-align="right" @on-confirm="modifyBirthday"></datetime>
        <x-address title="地址设置" v-model="address" @on-hide="modifyAddress" :raw-value="true" :list="addressData"></x-address>
        <cell title="个性签名" is-link @click.native="signatureShow = true" :value="signature=userInfo.signature"></cell>
      </group>
      <popup v-model="signatureShow" :hide-on-blur="true">
        <div class="personal-popup">
          <group>
            <x-textarea :max="50" placeholder="个性签名" v-model="signature=userInfo.signature" :show-counter="true" :height="60" :rows="4"></x-textarea>
          </group>
          <x-button mini style="float:right;margin-top:15px;" type="primary" @click.native="submit()">提交</x-button>
        </div>
      </popup>
      <box gap="35px 10px">
        <x-button type="warn">退出账号</x-button>
      </box>
      <div v-transfer-dom class="modifay-name">
        <x-dialog v-model="show" @on-show="setInputFocus" class="dialog-demo">
          <div class="box">
            <p>修改姓名</p>
            <div class="input-box" @touchstart.prevent="setInputFocus">
              <input v-model="name = userInfo.name" type="text" maxlength="15" autofocus ref="input"></input>
            </div>
          </div>
          <x-button type="primary" class="right" @click.native="modifyName()">确认</x-button>
          <x-button type="primary" class="left" @click.native="show = false">取消</x-button>
        </x-dialog>
      </div>
      <button id="pick-avatar" style="display:none;" ref="button">Select An image</button>
      <avatar-cropper
        @uploaded="handleUploaded"
        @uploading="handleUploading"
        trigger="#pick-avatar"
        upload-form-name="file"
        :upload-headers="headers"
        upload-url="http://www.eltur.cn/application/upload">
      </avatar-cropper>
    </div>
  </template>
  <script>
  import AvatarCropper from 'vue-avatar-cropper'
  import { XTextarea, Value2nameFilter as value2name, Popup, PopupPicker, Spinner, XSwitch, GroupTitle, Datetime, XButton, Box, XAddress, Cell, Group, ChinaAddressV4Data, XDialog, TransferDomDirective as TransferDom } from 'vux'
  export default {
    components: {
      XTextarea, Popup, XDialog, XSwitch, Datetime, XButton, Box, XAddress, Group, Cell, AvatarCropper, GroupTitle, Spinner, PopupPicker
    },
    directives: {
      TransferDom
    },
    watch: {
      show (val) {
        if (val) {
          setTimeout(() => {
            if (this.$refs.input) {
              this.setInputFocus()
            }
          }, 300)
        }
      }
    },
    computed: {
      userInfo: function () {
        return this.$store.getters.userInfo
      },
      headers: function () {
        return { token: localStorage.token }
      }
    },
    data () {
      return {
        name: '',
        show: false,
        per: '',
        progress: false,
        sexList: [['男', '女', '保密']],
        sex: ['保密'],
        time: '',
        signatureShow: false,
        signature: '',
        address: ['广东省', '中山市', '--'],
        addressData: ChinaAddressV4Data
      }
    },
    mounted () {
      this.$store.dispatch('userInfo').then(response => {
        this.$set(this.sex, 0, this.sexList[0][response.sex])
        this.address = response.address.split(' ')
      })
    },
    methods: {
      modifyName: function () {
        if (this.$isEmptyParam(this.name)) {
          this.$vux.toast.text('姓名不能为空')
          return false
        }
        this.$putData(this.$configs.api.userInfo, { name: this.name }, response => {
          if (response) {
            this.$store.dispatch('userInfo')
            this.$vux.toast.text('修改成功')
            this.show = false
          }
        })
      },
      modifySex: function (value) {
        if (value) {
          const sex = this.sexList[0].findIndex(item => item === this.sex[0])
          this.$putData(this.$configs.api.userInfo, { sex }, response => {
            if (response) {
              this.$store.dispatch('userInfo')
              this.$vux.toast.text('修改成功')
              this.show = false
            }
          })
        }
      },
      modifyBirthday: function (value) {
        this.$nextTick(() => {
          const year = 1000 * 60 * 60 * 24 * 365
          const now = new Date()
          const birthday = new Date(this.time)
          const age = parseInt((now - birthday) / year)
          this.$putData(this.$configs.api.userInfo, { age, birthday: this.time }, response => {
            if (response) {
              this.$store.dispatch('userInfo')
              this.$vux.toast.text('修改成功')
            }
          })
        })
      },
      modifyAddress: function (value) {
        if (value) {
          this.$nextTick(() => {
            const address = value2name(this.address, ChinaAddressV4Data)
            this.$putData(this.$configs.api.userInfo, { address }, response => {
              if (response) {
                this.$store.dispatch('userInfo')
                this.$vux.toast.text('修改成功')
              }
            })
          })
        }
      },
      submit: function () {
        if (this.$isEmptyParam(this.signature)) {
          this.$vux.toast.text('签名不能留空')
          return false
        }
        this.$putData(this.$configs.api.userInfo, { signature: this.signature }, response => {
          if (response) {
            this.$store.dispatch('userInfo')
            this.$vux.toast.text('修改成功')
          }
        })
      },
      setInputFocus: function () {
        this.$refs.input.focus()
      },
      handleUploading: function (form, xhr) {
        const self = this
        this.progress = true
        xhr.upload.onprogress = function (e) {
          const loaded = e.loaded  //  已上传的大小
          const total = e.total  //   总大小
          self.per = Math.floor((loaded / total) * 100) + '%'  //   转换成百分比
        }
      },
      handleUploaded: function (response, form, xhr) {
        if (response.code === 520 && response.success) {
          this.$putData(this.$configs.api.userInfo, { avatar: response.url }, response => {
            if (response) {
              this.progress = false
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
<style lang="less" scoped>
.personal-popup {
  box-sizing: border-box;
  padding: 15px;
  padding-bottom:15px;
  height:400px;
}
</style>
<style media="screen">
  #personal-data .weui-cell:before, #personal-data .vux-cell-box:before{
    left: 0;
  }
  #personal-data.weui-cells:before {
    border: none;
  }
  #personal-data .name {
    display: block;
    width: 150px;
  }
  #personal-data .spinner {
    float: right;
    display: block;
    width: 60px;
    height: 22px;
    font-size: 12px;
    text-align: left;
  }
  #personal-data .spinner span{
    float: right;
  }
  #personal-data .vux-no-group-title {
    margin-top: 0;
  }
  body .modifay-name .weui-dialog {
    overflow: hidden;
    top: 40%;
  }
  body .modifay-name .weui-dialog .box {
    box-sizing:border-box;
    padding:0px 40px;
  }
  body .modifay-name .weui-dialog .box p {
    margin: 10px;
    font-size: 14px;
  }
  body .modifay-name .weui-dialog .input-box {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin: 10px 0 30px;
  }
  body .modifay-name .weui-dialog .input-box input{
    text-align: center;
    border: none;
    outline:none;
    height:50px;
    width: 100%;
    font-weight: bold;
    line-height: 50px;
    font-size: 18px;
  }
  body .modifay-name .weui-dialog .left, body .modifay-name .weui-dialog .right {
    width: 50%;
    float: right;
    border-radius: 0;
    font-size: 14px;
    line-height: 3;
    margin: 0;
  }
  body .modifay-name .weui-dialog .left {
    background-color: #fff;
    color: #999;
  }
</style>
