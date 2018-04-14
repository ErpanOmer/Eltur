<template>
  <div id="consult">
    <group>
      <div slot="default" class="title">
        <span style="display:inline-block;"></span>
        <span>你可能感兴趣的问题</span>
      </div>
    </group>
    <div class="box">
      <swiper auto height="170px" direction="vertical" :interval="3000" :auto="true" :show-dots="false" :duration="1000">
        <swiper-item v-for="item in swiper" class="box-content" :key="item">
          <div class="child">
            <div class="user">
              <img v-if="item.cover" :src="item.cover" width="40px">
              <img v-else src="../../../assets/businessman.png" width="40px" alt="">
            </div>
            <p class="text">义务爱了 完成传奇世界H5-王者归来任务 获得20金币
            啊是零件冷镦机萨拉近段时间觉得时间多久啊是零件冷镦机萨拉近段时间觉得时间多久啊是零件冷镦机萨拉近段时间觉得时间多久啊是零件冷镦机萨拉近段时间觉得时间多久</p>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <group style="margin:10px 0;">
      <cell is-link @click.native="$router.push({ name: 'QuickConsultation' })">
        <img slot="icon" width="40px" src="../../../assets/info.png" alt="">
        <span slot="title" style="margin-left:10px;font-size:15px;">快速咨询<badge text="限时免费" style="margin:0 0 2px 10px;"></badge></span>
      </cell>
    </group>
    <group>
      <div slot="default" class="title">
        <span style="display:inline-block;"></span>
        <span>大家在问</span>
      </div>
    </group>
    <div class="consult-list" v-for="item in list">
      <div class="top clearfix">
        <img v-if="item.cover" :src="item.cover" width="40px">
        <img v-else src="../../../assets/businessman.png" width="40px" alt="">
        <p>name</p>
        <p><span style="color:#ffa050;font-size: 12px;" v-text="$formatTime(item.createdTime)"></span></p>
      </div>
      <div class="consult-text" v-text="item.question"></div>
      <div class="success" v-show="item.alreadyAnswered">已回答</div>
      <p class="bottom-icon clearfix" style="margin-top: 10px;">
        <span class="icon iconfont icon-zan" v-text="item.views"></span>
        <span class="icon iconfont icon-linedesign-14" v-text="item.fabulous"></span>
        <span style="float:left;margin:0;">问题类型：<span style="color:#ffa050;" v-text="itemList[item.category]"></span></span>
      </p>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import Tabbar from '@/components/Public/Tabbar'
import { Cell, Group, Swiper, SwiperItem, Badge } from 'vux'
export default {
  components: {
    Tabbar,
    Badge,
    Group,
    Cell,
    Swiper,
    SwiperItem
  },
  data: () => ({
    list: [],
    swiper: [],
    itemList: ['推荐', '婚姻家庭', '交通事故', '劳动用工', '治安刑事', '医疗事故', '房产土地', '责权责务', '合同纠纷', '征地拆迁']
  }),
  mounted () {
    //  do something after mounting vue instance
    this.$nextTick(() => {
      this.getList()
      this.getSwiper()
    })
  },
  methods: {
    getList: function () {
      this.$getData(this.$configs.api.issue, '', response => {
        this.list = response.list
      })
    },
    getSwiper: function () {
      this.$getData(this.$configs.api.issue, '', response => {
        this.swiper = response.list
      })
    }
  }
}
</script>
<style lang="scss">
  $box-sizing: border-box;
  #consult {
    .consult-list {
      box-sizing: $box-sizing;
      padding: 10px;
      background-color: #fff;
      margin-bottom: 10px;
      font-size: 14px;
      color: #444;
      position: relative;
      .top > *{
        float: left;
      }
      .top p {
        width: calc(100% - 52.5px);
        margin-left: 7.5px;
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
      .bottom-icon .iconfont {
        font-size: 14px;
        margin-left: 15px;
        float: right;
        color: #666;
        &:before {
          margin-right: 3px;
        }
      }
    }
    .consult-text {
      margin: 5px 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      color: #666;
      background-color: #f5f5f5;
      box-sizing: border-box;
      padding:5px 10px;
      border-radius: 5px;
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
    .box {
      background-color: #fff;
      font-size: 14px;
      box-sizing: border-box;
      padding:0 15px 10px;
      .box-content {
        box-sizing: border-box;
        padding: 10px 0;
        .child {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
          box-sizing: border-box;
          padding:5px 15px 15px;
          background-color: #444;
          border-radius: 12px;
          .user {
            height: 50px;
            text-align: center;
            box-sizing: border-box;
          }
          .text {
            overflow: hidden;
            color:#ddd;
          }
        }
      }
    }
    .weui-cells {
      margin-top: 0;
    }
  }
</style>
