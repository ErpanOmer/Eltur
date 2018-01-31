<template>
  <div id="Personal">
    <group>
      <cell>
        <span slot="after-title" @click="modifyName()">{{paherden}}</span>
        <img slot="default" width="45" @click="update()" style="display:block;margin-right:5px;" src="../../../assets/businessman.png"/>
      </cell>
    </group>
    <input type="file" ref="cover" style="display:none;" @change="coco($event)">
    <group>
      <actionsheet v-model="show1" :menus="menus1" @on-click-menu="click()" show-cancel>
      </actionsheet>
    </group>
    <group>
      <x-address title="地址设置" v-model="value3" raw-value :list="addressData">
      </x-address>
    </group>
    <confirm v-model="show"
    show-input
    ref="confirm5"
    title="修改姓名"
    @on-cancel="onCancel"
    @on-confirm="onConfirm"
    @on-show="onShow"
    @on-hide="onHide">
   </confirm>
  </div>
</template>
<script>
import { Actionsheet, XAddress, Cell, Confirm, Group, XSwitch, ChinaAddressV4Data } from 'vux'
export default {
  components: {
    Actionsheet,
    XAddress,
    Confirm,
    Group,
    XSwitch,
    Cell
  },
  data () {
    return {
      show: false,
      show1: false,
      paherden: 'paherden',
      value3: ['广东省', '中山市', '--'],
      addressData: ChinaAddressV4Data,
      showAddress: false,
      menus1: {
        menu1: '男',
        menu2: '女'
      }
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
