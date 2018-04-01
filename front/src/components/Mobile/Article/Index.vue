<template>
  <div id="article">
    <tab>
      <tab-item v-for="(item, index) in itemList" :key="index" :selected="itemIndex === index" v-text="item" @on-item-click="onItemClick"></tab-item>
    </tab>
    <scroller lock-y :scrollbar-x="false" height="150px" style="background-color:#fff;" v-show="itemIndex === 0">
      <div class="box">
        <div class="box-item" v-for="item in recommend" :style="'background:url(' + item.cover + ') center center no-repeat;background-size: cover;'"  @click="$router.push({ name: 'ArticleDetail', query: { id: item.id }})" :key="item.id">
          <div class="transparent"><span v-text="item.title"></span></div>
        </div>
      </div>
    </scroller>
    <group v-show="itemIndex === 0">
      <div slot="default" class="title">
        <span style="display:inline-block;"></span>
        <span>使用工具</span>
      </div>
    </group>
    <div class="tools" v-show="itemIndex === 0">
      <flexbox :gutter="0" style="margin-bottom:25px;">
        <flexbox-item>
          <div class="left" style="float:left;">
            <span slot="icon" class="icon iconfont icon-icon" style="font-size:32px;"></span>
          </div>
          <div class="right" style="float:left;">
            <p style="color:#333;font-size:15px;">利息</p>
            <p>分段计算</p>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="left" style="float:left;">
            <span slot="icon" class="icon iconfont icon-renwuyanchizhong" style="font-size:38px;"></span>
          </div>
          <div class="right" style="float:left;">
            <p style="color:#333;font-size:15px;">延迟利息</p>
            <p>分类计算</p>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="left" style="float:left;">
            <span slot="icon" class="icon iconfont icon-50"></span>
          </div>
          <div class="right" style="float:left;">
            <p style="color:#333;font-size:15px;">个税</p>
            <p>工资薪金</p>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0">
        <flexbox-item>
          <div class="left" style="float:left;">
            <span slot="icon" class="icon iconfont icon-leibieguanli" style="font-size: 26px;"></span>
          </div>
          <div class="right" style="float:left;">
            <p style="color:#333;font-size:15px;">个税</p>
            <p>其它项目</p>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="left" style="float:left;">
            <span slot="icon" class="icon iconfont icon-msnui-report-complain"></span>
          </div>
          <div class="right" style="float:left;">
            <p style="color:#333;font-size:15px;">诉讼费</p>
            <p>案件申请</p>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="left" style="float:left;">
            <span slot="icon" class="icon iconfont icon-zhucaishenqing" style="font-size: 26px;"></span>
          </div>
          <div class="right" style="float:left;">
            <p style="color:#333;font-size:15px;">诉讼费</p>
            <p>案件受理</p>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <group v-show="itemIndex === 0">
      <div slot="default" class="title">
        <span style="display:inline-block;"></span>
        <span>阅读排行</span>
      </div>
    </group>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
      <transition-group name="list-complete">
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
      <Divider v-if="noMore" style="margin-top: 5px;font-size: 14px;">没有更多了</Divider>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import { Tab, TabItem, Flexbox, FlexboxItem, Scroller, Group, Grid, GridItem, Divider } from 'vux'
import Tabbar from '@/components/Public/Tabbar'
export default {
  components: {
    Tabbar, Tab, TabItem, Flexbox, FlexboxItem, Scroller, Group, Grid, GridItem, Divider
  },
  data () {
    return {
      list: [],
      useTools: [],
      recommend: [],
      page: 1,
      pageSize: 20,
      isEmpty: false,
      noMore: false,
      img: 'http://thumb.niutuku.com/960x1/8f/b8/8fb8fb2623afa6336e2be205718f5f0e.jpg',
      itemList: ['推荐', '婚姻家庭', '交通事故', '劳动用工', '治安刑事', '医疗事故', '房产土地', '责权责务', '合同纠纷', '征地拆迁'],
      itemIndex: 0
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'ArticleDetail') {
      this.$store.commit('setItemIndex', this.itemIndex)
    } else {
      this.$store.commit('setItemIndex', 0)
    }
    next()
  },
  mounted () {
    const itemIndex = this.$store.getters.getItemIndex
    this.itemIndex = itemIndex
    if (itemIndex === 0) {
      this.weekSort()
    } else {
      this.getList()
    }
  },
  methods: {
    loadMore: function () {
      if (this.list.length === 0 || this.itemIndex === 0) {
        return
      }
      if (this.noMore) {
        return
      }
      this.busy = true
      setTimeout(() => {
        this.getList()
        this.busy = false
      }, 1500)
    },
    onItemClick: function (index) {
      this.itemIndex = index
      this.list = []
      this.page = 1
      this.noMore = this.isEmpty = false
      this.$nextTick(() => {
        if (index === 0) {
          this.weekSort()
        } else {
          this.getList()
        }
      })
    },
    weekSort: function () {
      this.$getData(this.$configs.api.readingRankings, `?page=1&pageSize=10&sort=pageViews&order=-1`, response => {
        this.list = response.list
      })
      const recommend = localStorage.getItem('recommendList')
      if (recommend) {
        const list = JSON.parse(recommend)
        const obj = {}
        list.forEach((item, index) => {
          if (obj[item.category]) {
            obj[item.category]++
          } else {
            obj[item.category] = 1
          }
        })
        const sortList = []
        for (let variable in obj) {
          if (obj.hasOwnProperty(variable)) {
            sortList.push({ [variable]: obj[variable] })
          }
        }
        let max = sortList[0]
        sortList.forEach(item => {
          const maxKey = Object.keys(max)
          const itemKey = Object.keys(item)
          if (item[itemKey] > max[maxKey]) {
            max = item
          }
        })
        this.$getData(this.$configs.api.readingRankings, `?page=1&pageSize=5&key=category&value=${Object.keys(max)[0]}&type=eq&sort=pageViews&order=-1`, response => {
          this.recommend = response.list
        })
      } else {
        this.$getData(this.$configs.api.readingRankings, `?page=1&pageSize=5&sort=fabulous&order=-1`, response => {
          this.recommend = response.list
        })
      }
    },
    getList: function () {
      const url = `?page=${this.page}&pageSize=${this.pageSize}&key=category&value=${this.itemIndex}&type=eq`
      this.$getData(this.$configs.api.article, url, response => {
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
  overflow: hidden;
}
#article .box .transparent {
  width: 200px;
  height: 125px;
  box-sizing: border-box;
  padding: 20px;
  display: table-cell;
  vertical-align: middle;
  background-color: rgba(7,17,27,.4);
  color: #fff;
}
#article .box .transparent span {
    max-height: 48px;
    overflow: hidden;
    display: block;
    font-size: 15px;
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
#article .tools {
  background-color: #fff;
  font-size: 12px;
  box-sizing: border-box;
  padding:15px 10px;
  color: #aaa;
}
#article .tools .left {
  width: 40%;
  text-align: center;
  height: 45px;
  line-height: 43px;
}
#article .tools .left .iconfont {
  font-size: 30px;
  color: #f90;
}
</style>
