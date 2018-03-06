<template>
  <div id="personal-data">
    <group title="个人资料">
        <cell>
          <span slot="after-title" @click="modifyName()">{{paherden}}</span>
          <img slot="default" width="45" @click="update()" style="display:block;margin-right:5px;" src="../../../assets/businessman.png"/>
        </cell>
      <input type="file" ref="cover" style="display:none;" @change="coco($event)">
        <popup-radio title="性别" :options="options" v-model="option" placeholder="请选择性别"></popup-radio>
        <datetime title="生日" v-model="time">
        </datetime>
        <x-address title="地址设置" v-model="value3" raw-value :list="addressData">
        </x-address>
      </group>
      <group>
        <cell title="个人说明" is-link @click.native="show5 = true"></cell>
      </group>
      <popup v-model="show5" :hide-on-blur="true">
        <div class="popup2">
          <group>
            <x-textarea :max="120" placeholder="介绍自己" :show-counter="true" :height="120" :rows="4"></x-textarea>
          </group>
          <div style="float:right;margin:10px;">
            <x-button mini type="primary">保存</x-button>
          </div>
        </div>
      </popup>
        <box gap="30px 10px">
          <x-button type="warn">退出账号</x-button>
        </box>
      <confirm v-model="show"
      show-input
      ref="confirm5"
      title="修改用户名"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
     </confirm>
    </div>
  </template>
  <script>
  import { XTextarea, Popup, XSwitch, PopupRadio, Datetime, XButton, Box, XAddress, Cell, Confirm, Group, ChinaAddressV4Data } from 'vux'
  export default {
    components: {
      XTextarea,
      Popup,
      XSwitch,
      PopupRadio,
      Datetime,
      XButton,
      Box,
      XAddress,
      Confirm,
      Group,
      Cell
    },
    data () {
      return {
        show: false,
        show5: false,
        option: '',
        options: [{
          key: 'A',
          value: '男'
        }, {
          key: 'B',
          value: '女'
        }],
        paherden: 'paherden',
        value3: ['广东省', '中山市', '--'],
        addressData: ChinaAddressV4Data,
        showAddress: false,
        time: '2000-01-01'
      }
    },
    methods: {
      coco: function (e) {
        console.log(e.target.files)
      },
      modifyName: function () {
        this.show = true
      },
      update: function () {
        this.$refs.cover.click()
        this.$refs.cover.click()
      },
      click: function () {
        console.log('on click')
      },
      onCancel () {
        console.log('on cancel')
      },
      onConfirm (msg) {
        console.log('on confirm')
        if (msg) {
          alert(msg)
        }
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      onShow5 () {
        this.$refs.confirm.setInputValue('default')
      },
      onConfirm5 (value) {
        this.$refs.confirm.setInputValue('')
        this.$vux.toast.text('input value: ' + value)
      },
      logHide (str) {
        console.log('on-hide', str)
      },
      logShow (str) {
        console.log('on-show')
      }
    }
  }
  </script>
<style lang="less" scoped>
.popup2 {
  padding-bottom:15px;
  height:400px;
}
</style>
