<template>
  <div id="article">
    <tab>
      <tab-item v-for="(item, index) in itemList" :key="index" :selected="index === 0" v-text="item.name"></tab-item>
    </tab>
    <scroller lock-y :scrollbar-x="false" height="150px" style="background-color:#fff;">
      <div class="box">
        <div class="box-item" v-for="item in 5" :style="'background:url(' + img + ') center center no-repeat;background-size: cover;'"></div>
      </div>
    </scroller>
    <group>
      <div slot="default" class="title">
        <span style="display:inline-block;"></span>
        <span>使用工具</span>
      </div>
    </group>
    <group>
      <div slot="default" class="title">
        <span style="display:inline-block;"></span>
        <span>最新推荐</span>
      </div>
    </group>
    <div class="list" v-for="item in 5" @click="$router.push({ name: 'ArticleDetail' })">
      <flexbox :gutter="0">
        <flexbox-item :span="3/12">
          <div class="cover" :style="'background:url(' + img + ') center center no-repeat;background-size: cover;'"></div>
        </flexbox-item>
        <flexbox-item :span="9/12">
          <div class="tit">
            <p class="name">倒萨的教案设计大奖教上的杰卡斯经典就爱上了角度来讲案设计的骄傲的记录</p>
          </div>
          <p class="info">
            <span slot="icon" class="icon iconfont icon-linedesign-14">4555</span>
            <span slot="icon" class="icon iconfont icon-linedesign-01" style="margin-left:20px;">4555</span>
            <span style="float:right;font-size:13px;">刚刚</span>
          </p>
        </flexbox-item>
      </flexbox>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import { Tab, TabItem, Flexbox, FlexboxItem, Scroller, Group } from 'vux'
import Tabbar from '@/components/Public/Tabbar'
export default {
  components: {
    Tabbar, Tab, TabItem, Flexbox, FlexboxItem, Scroller, Group
  },
  data () {
    return {
      img: 'http://thumb.niutuku.com/960x1/8f/b8/8fb8fb2623afa6336e2be205718f5f0e.jpg',
      itemList: [
        { name: '推荐', src: require('@/assets/icon/more.png') },
        { name: '交通事故', src: require('@/assets/icon/traffic.png') },
        { name: '婚姻家庭', src: require('@/assets/icon/marry.png') },
        { name: '公司工商', src: require('@/assets/icon/company.png') },
        { name: '房产土地', src: require('@/assets/icon/home.png') },
        { name: '合同纠纷', src: require('@/assets/icon/contract.png') },
        { name: '责权责务', src: require('@/assets/icon/right.png') },
        { name: '劳动用工', src: require('@/assets/icon/work.png') },
        { name: '治安刑事', src: require('@/assets/icon/police.png') },
        { name: '诉讼仲裁', src: require('@/assets/icon/litigation.png') }
      ]
    }
  }
}
</script>
<style media="screen">
#article .list {
  box-sizing: border-box;
  padding: 0 10px;
  background-color: #fff;
  font-size: 14px;
}
#article .list .vux-flexbox {
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  padding: 8px 0;
}
#article .list .vux-flexbox .cover {
  height: 75px;
  border-radius: 5px;
}
#article .list .vux-flexbox .tit {
  color: #333;
  float: left;
  position: relative;
}
#article .list .vux-flexbox .vux-flexbox-item:last-child {
  height: 75px;
  position: relative;
  box-sizing: border-box;
  padding-left: 12.5px;
}
#article .list .vux-flexbox .tit .name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
#article .list .vux-flexbox .vux-flexbox-item .info {
  position: absolute;
  width: calc(100% - 15px);
  color:#999;
  bottom: 0;
  height: 22px;
  line-height: 22px;
  box-sizing: border-box;
  padding:0 10px 0 0;
}
#article .list .vux-flexbox .vux-flexbox-item .info .iconfont {
  font-size: 13px;
}
#article .list .vux-flexbox .vux-flexbox-item .info .iconfont:before {
  margin-right: 5px;
  font-size: 16px;
  vertical-align: middle;
}
#article .box {
  padding:10px;
  background-color: #fff;
  height: 100px;
  position: relative;
  width: 1060px;
}
#article .box-item {
  width: 200px;
  height: 125px;
  border-radius: 12px;
  box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.1);
  background-color: #ccc;
  display:inline-block;
  margin-left: 15px;
  float: left;
  text-align: center;
  line-height: 100px;
}
#article .box-item:first-child {
  margin-left: 0;
}
#article .title {
  font-size: 14px;
  box-sizing: border-box;
  padding: 10px;
}
#article .title span:first-child {
  float: left;
  width: 5px;
  height: 20px;
  background-color: #f90;
  border-radius: 5px;
  vertical-align: middle;
}
#article .title span:last-child {
  margin-left: 10px;
}
#article .weui-cells {
  margin-top: 0;
}
</style>
