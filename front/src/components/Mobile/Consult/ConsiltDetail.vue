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
    <group>
      <div slot="default" class="title">
        <span style="display:inline-block;"></span>
        <span>回答内容</span>
      </div>
    </group>
    <div class="answer-text" v-text="item.answerText"></div>
    <div class="fabulous">
      <transition name="fade" mode="out-in">
        <div class="back" v-if="!isUp" :key="isUp" @click="giveUp()"><img src="../../../assets/fabulous.png"></div>
        <div class="back down" v-else :key="isUp" @click="giveUp()"><img src="../../../assets/fabulous.png"></div>
      </transition>
      <p>3人攒过</p>
    </div>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, Group } from 'vux'
export default {
  components: {
    Flexbox, FlexboxItem, Group
  },
  data: () => ({
    item: {},
    itemList: ['推荐', '婚姻家庭', '交通事故', '劳动用工', '治安刑事', '医疗事故', '房产土地', '责权责务', '合同纠纷', '征地拆迁'],
    isUp: false
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
    giveUp: function () {
      this.isUp = !this.isUp
      this.$vux.toast.text('点赞成功')
    },
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
  .title {
    font-size: 14px;
    box-sizing: border-box;
    padding: 10px;
    > span:first-child {
      float: left;
      width: 5px;
      height: 20px;
      background-color: #f90;
      border-radius: 5px;
      vertical-align: middle;
    }
    > span:last-child {
      margin-left: 10px;
    }
  }
  .answer-text {
    box-sizing: border-box;
    padding: 15px 10px;
    background-color: #fff;
    font-size: 16px;
    color: #333;
  }
  .fabulous {
    box-sizing: border-box;
    padding: 20px;
    background-color: #fff;
    .back {
      width: 70px;
      height: 70px;
      background-color: #f90;
      border-radius: 50%;
      margin: 0 auto;
      box-sizing: border-box;
      padding-top: 18px;
      img {
        width: 40%;
        display: block;
        margin: 0 auto;
      }
    }
    .down {
      background-color: #ccc;
      padding-top: 23px;
      img {
        transform:rotateX(180deg);
      }
    }
    p {
      text-align: center;
      font-size: 12px;
      color: #999;
      margin: 20px;
    }
    .fabulous-list img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .vux-flexbox img {
      width: 70%;
      height: 70%;
      display: block;
      margin: 0 auto;
      border-radius: 50%;
    }
  }
}
</style>
