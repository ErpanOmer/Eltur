<template>
  <div id="quick-consultation">
    <step v-model="step" background-color='#fbf9fe' style="padding:0 10px;margin-bottom:25px;">
      <step-item title="选择类型"></step-item>
      <step-item title="描述问题"></step-item>
      <step-item title="开始咨询"></step-item>
    </step>
    <div v-show="show">
      <grid :cols="3" :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item :label="item.name" v-for="(item, index) in itemList" @on-item-click="onItemClick(index)" :key="index">
          <img slot="icon" :src="item.src">
        </grid-item>
      </grid>
    </div>
    <div v-show="!show">
      <group>
        <cell title="问题类型" is-link :value="itemList[selecetIndex].name" @click.native="show=true"></cell>
      </group>
      <group>
        <x-textarea :max="200" placeholder="你可以在输入框简单描述你的问题" v-model="question" :show-counter="true" :height="180" :rows="4"></x-textarea>
      </group>
      <div style="padding:30px 15px 15px;">
        <x-button type="primary" @click.native="submit()">提交问题</x-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Step, StepItem, Grid, GridItem, Group, Cell, XTextarea, XButton } from 'vux'
export default {
  components: {
    Step, StepItem, Grid, GridItem, Group, Cell, XTextarea, XButton
  },
  data: () => ({
    question: '',
    show: true,
    itemList: [
      { name: '交通事故', src: require('@/assets/icon/traffic.png') },
      { name: '婚姻家庭', src: require('@/assets/icon/marry.png') },
      { name: '公司工商', src: require('@/assets/icon/company.png') },
      { name: '房产土地', src: require('@/assets/icon/home.png') },
      { name: '合同纠纷', src: require('@/assets/icon/contract.png') },
      { name: '责权责务', src: require('@/assets/icon/right.png') },
      { name: '劳动用工', src: require('@/assets/icon/work.png') },
      { name: '治安刑事', src: require('@/assets/icon/police.png') },
      { name: '诉讼仲裁', src: require('@/assets/icon/litigation.png') },
      { name: '其它', src: require('@/assets/icon/more.png') }
    ],
    selecetIndex: 0,
    step: 0
  }),
  mounted () {
  },
  methods: {
    submit: function () {
      if (this.$isEmptyParam(this.question)) {
        this.$vux.toast.text('问题别留空')
        return false
      }
      const data = {
        question: this.question,
        type: this.selecetIndex
      }
      this.$postData(this.$configs.api.issue, { data }, res => {
        if (res) {
          this.$vux.toast.text('操作成功')
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        }
      })
    },
    onItemClick: function (value) {
      this.selecetIndex = value
      this.show = false
      this.step = 1
    }
  }
}
</script>
<style lang="scss">
  #quick-consultation {
    margin-top: 15px;
    .vux-step-item-head-process .vux-step-item-head-inner {
      background-color: #fb0;
      color: #fff;
      border:1px solid #fc0;
    }
    .vux-step-item-head-wait .vux-step-item-head-inner {
      border:1px solid #fc0;
      color: #fa0;
    }
    .weui-grid::after,
    .weui-grids::before {
      border: none;
    }
    .weui-icon-success-no-circle {
      color: #fc0;
    }
    .vux-step-item-head-finish .vux-step-item-head-inner {
      border:1px solid #fc0;
    }
    .vux-step-item-title{
      color: #fa0;
    }
    .vux-step-item-tail-process,
    .vux-step-item-tail-wait,
    .vux-step-item-tail-finish {
      background-color: #fc0;
    }
  }
</style>
