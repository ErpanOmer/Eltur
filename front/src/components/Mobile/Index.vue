<template>
  <div id="index">
    <div class="swiper">
      <swiper loop auto :list="img_list" :aspect-ratio="100/195"></swiper>
    </div>
    <group>
      <cell is-link @click.native="$router.push({ name: 'QuickConsultation' })">
        <img slot="icon" width="40px" src="../../assets/info.png" alt="">
        <span slot="title" style="margin-left:10px;font-size:15px;">快速咨询<badge text="限时免费" style="margin:0 0 2px 10px;"></badge></span>
      </cell>
    </group>
    <group>
      <div slot="default" class="title">
        <span style="display:inline-block;"></span>
        <span>最新推荐</span>
      </div>
    </group>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
      <transition-group name="list-complete" tag="div">
        <div class="list list-complete-item" v-for="item in list" @click="$router.push({ name: 'ArticleDetail', query: { id: item.id }})" :key="item.id">
          <flexbox :gutter="0">
            <flexbox-item :span="3/12">
              <div class="cover" :style="'background:url(' + item.cover + ') center center no-repeat;background-size: cover;'"></div>
            </flexbox-item>
            <flexbox-item :span="9/12">
              <div class="tit">
                <p class="name" v-text="item.title"></p>
              </div>
              <p class="info">
                <span slot="icon" class="icon iconfont icon-linedesign-14" v-text="`${item.pageViews}人看过`"></span>
                <!-- <span slot="icon" class="icon iconfont icon-linedesign-01" style="margin-left:20px;">4555</span> -->
                <span style="float:right;font-size:13px;" v-text="$formatTime(item.createdTime)"></span>
              </p>
            </flexbox-item>
          </flexbox>
        </div>
      </transition-group>
    </div>
    <Divider v-if="noMore" style="margin-top: 5px;font-size: 14px;">没有更多了</Divider>
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import Tabbar from '@/components/Public/Tabbar'
import { Swiper, Cell, Group, Radio, Badge, Flexbox, FlexboxItem, Divider } from 'vux'
export default {
  components: {
    Tabbar, Swiper, Cell, Group, Radio, Badge, Flexbox, FlexboxItem, Divider
  },
  data: () => ({
    list: [],
    noMore: false,
    isEmpty: false,
    page: 1,
    pageSize: 20,
    img_list: []
  }),
  mounted () {
    this.getSwiper()
    this.getData()
  },
  methods: {
    loadMore: function () {
      if (this.list.length === 0) {
        return
      }
      if (this.noMore) {
        return
      }
      this.busy = true
      setTimeout(() => {
        this.getData()
        this.busy = false
      }, 1500)
    },
    getSwiper: function () {
      this.$getData(this.$configs.api.swiper, '/5addfa73fe04b53170f7fe42', response => {
        const list = response.list
        list.forEach(item => {
          this.img_list.push({ img: item.src })
        })
      })
    },
    getData: function () {
      this.$getData(this.$configs.api.article, `?page=${this.page}&pageSize=${this.pageSize}`, response => {
        const list = response.list
        if (JSON.stringify(list) === '[]') {
          if (this.list.length === 0) {
            this.isEmpty = true
            return
          } else {
            this.noMore = true
            return
          }
        } else {
          this.list = this.list.concat(list)
          this.page++
        }
      })
    }
  }
}
</script>
<style media="screen">
  #index .swiper {
    background: #C3A768;
  }
  #index .title {
    font-size: 14px;
    box-sizing: border-box;
    padding: 10px;
  }
  #index .title span:first-child {
    float: left;
    width: 5px;
    height: 20px;
    background-color: #f90;
    border-radius: 5px;
    vertical-align: middle;
  }
  #index .title span:last-child {
    margin-left: 10px;
  }
  #index .list {
    box-sizing: border-box;
    padding: 0 10px;
    background-color: #fff;
    font-size: 14px;
  }
  #index .list .vux-flexbox {
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 8px 0;
  }
  #index .list .vux-flexbox .cover {
    height: 75px;
    border-radius: 5px;
  }
  #index .list .vux-flexbox .tit {
    color: #333;
    float: left;
    position: relative;
  }
  #index .list .vux-flexbox .vux-flexbox-item:last-child {
    height: 75px;
    position: relative;
    box-sizing: border-box;
    padding-left: 12.5px;
  }
  #index .list .vux-flexbox .tit .name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  #index .list .vux-flexbox .vux-flexbox-item .info {
    position: absolute;
    width: calc(100% - 15px);
    color:#999;
    bottom: 0;
    height: 22px;
    line-height: 22px;
    box-sizing: border-box;
    padding:0 5px 0 0;
  }
  #index .list .vux-flexbox .vux-flexbox-item .info .iconfont {
    font-size: 13px;
  }
  #index .list .vux-flexbox .vux-flexbox-item .info .iconfont:before {
    margin-right: 5px;
    font-size: 16px;
    vertical-align: middle;
  }
</style>
