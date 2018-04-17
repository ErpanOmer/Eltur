<template>
  <div id="consult-detail">
    <div class="consult-list">
      <div class="top clearfix">
        <flexbox :gutter="0" justify="center" align="center" style="text-align:center;">
          <flexbox-item>
            <img v-if="item.cover" :src="item.cover" width="75px">
            <img v-else src="../../../assets/businessman.png" width="50px" alt="">
            <p v-text="item.name"></p>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="consult-text" v-text="item.question"></div>
      <p class="bottom">
        <span v-text="itemList[item.category]"></span>
        <span v-text="$formatTime(item.createdTime)" style="float:right;"></span>
      </p>
    </div>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem } from 'vux'
export default {
  components: {
    Flexbox, FlexboxItem
  },
  data: () => ({
    item: {},
    itemList: ['推荐', '婚姻家庭', '交通事故', '劳动用工', '治安刑事', '医疗事故', '房产土地', '责权责务', '合同纠纷', '征地拆迁']
  }),
  mounted () {
    const id = this.$route.query.id
    if (this.$isEmptyParam(id)) {
      this.$vux.toast.text('非法操作')
      this.$router.go(-1)
      return
    }
    this.$nextTick(() => {
      this.getDetail(id)
    })
  },
  methods: {
    getDetail: function (id) {
      this.$getData(this.$configs.api.issue, `/${id}`, response => {
        this.item = response
      })
    }
  }
}
</script>
<style lang="scss">
#consult-detail {
  .consult-list {
    box-sizing: border-box;
    padding: 15px 10px;
    background-color: #fff;
    margin-bottom: 10px;
    font-size: 14px;
    color: #444;
    position: relative;
    .top {
      text-align: center;
      p {
        color: #ffa050;
        margin: 5px 20px;
      }
      img {
        border-radius: 50%;
      }
    }
    .success {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 12px;
      box-sizing: border-box;
      padding-right: 5px;
      height: 30px;
      width: 60px;
      text-align: right;
      line-height: 25px;
      background-color: #ffa500;
      color: #fff;
      border-bottom-left-radius: 90%;
    }
    .bottom {
      font-size: 14px;
      color: #ffa050;
      padding: 0 5px;
    }
    .consult-text {
      margin: 15px 0;
      display: -webkit-box;
      overflow: hidden;
      color: #666;
      background-color: #f5f5f5;
      box-sizing: border-box;
      padding:5px 10px;
      border-radius: 5px;
    }
  }
}
</style>
