<template>
  <div id="article-detail">
    <div class="main">
      <p class="tit" v-text="detail.title"></p>
      <p class="time"><span v-text="$formatTime(detail.createdTime)"></span><span style="float:right;" v-text="$isEmptyParam(detail.author) ? '来源: ' + detail.source : '作者 ' + detail.author"></span></p>
      <!-- <div class="cover" :style="'background:url(' + detail.cover + ') center center no-repeat;background-size: cover;'"></div> -->
      <div class="text" v-html="detail.content">
      </div>
      <div class="fabulous">
        <transition name="fade" mode="out-in">
          <div class="back" v-if="!isUp" :key="isUp" @click="giveUp()"><img src="../../assets/fabulous.png"></div>
          <div class="back down" v-else :key="isUp" @click="giveUp()"><img src="../../assets/fabulous.png"></div>
        </transition>
        <p>{{detail.fabulous}}人攒过</p>
        <!-- <flexbox :gutter="0">
          <flexbox-item>
            <img src="../../assets/businessman.png" alt="">
          </flexbox-item>
          <flexbox-item>
            <img src="../../assets/businessman.png" alt="">
          </flexbox-item>
          <flexbox-item>
            <img src="../../assets/businessman.png" alt="">
          </flexbox-item>
          <flexbox-item>
            <img src="../../assets/businessman.png" alt="">
          </flexbox-item>
          <flexbox-item>
            <img src="../../assets/businessman.png" alt="">
          </flexbox-item>
        </flexbox> -->
      </div>
    </div>
    <group>
      <div slot="default" class="title">
        <span style="display:inline-block;"></span>
        <span>最新评论</span>
      </div>
    </group>
    <div class="comment">
      <div class="comment-list clearfix" v-for="item in 10">
          <div class="cover">
            <img width="100%" src="../../assets/businessman.png" alt="">
          </div>
          <div class="right">
            <div class="head">
              <p>name</p>
              <p style="color: #999;font-size: 12px;">58分钟之前</p>
            </div>
            <div class="content" style="color:#000;">
              就到家啊时间多久啊是几点结束了咯啊啊啊急急急就到家啊时间多久啊是几点结束了咯啊啊啊急急急
              就到家啊时间多久啊是几点结束了咯啊啊啊急急急
              就到家啊时间多久啊是几点结束了咯啊啊啊急急急
              就到家啊时间多久啊是几点结束了咯啊啊啊急急急
            </div>
          </div>
      </div>
    </div>
    <div class="write-comment clearfix">
      <div class="left" @click="show=true">
        <span slot="icon" class="icon iconfont icon-write"></span>
        <span style="margin-left:5px;">我来评论</span>
      </div>
      <div class="right clearfix">
        <flexbox :gutter="0">
          <flexbox-item>
            <span class="icon iconfont icon-linedesign-01" style="font-size: 23px;"><badge text="2"></badge></span>
          </flexbox-item>
          <flexbox-item>
            <span class="icon iconfont icon-fenxiang"></span>
          </flexbox-item>
          <flexbox-item>
            <span class="icon iconfont icon-ziyuan"></span>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
    <popup v-model="show" :hide-on-blur="true">
      <div class="comment-popup">
        <group>
          <x-textarea :max="100" placeholder="评论内容" v-model="comment" :show-counter="true" :height="100" :rows="4"></x-textarea>
        </group>
        <x-button mini style="float:right;margin-top:15px;" type="primary" @click.native="submit()">提交</x-button>
        <x-button mini style="float:left;margin-top:15px;" type="warn" @click.native="show=false">取消</x-button>
      </div>
    </popup>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, Group, Badge, Popup, XTextarea, XButton } from 'vux'
export default {
  components: {
    Flexbox, FlexboxItem, Group, Badge, Popup, XTextarea, XButton
  },
  data: () => ({
    isUp: false,
    detail: {},
    show: false,
    comment: '',
    img: 'http://thumb.niutuku.com/960x1/8f/b8/8fb8fb2623afa6336e2be205718f5f0e.jpg'
  }),
  mounted () {
    const id = this.$route.query.id
    if (this.$isEmptyParam(id)) {
      this.$vux.toast.text('非法操作')
      this.$router.go(-1)
      return
    } else {
      const FabulousList = localStorage.getItem('FabulousList')
      if (FabulousList) {
        const list = JSON.parse(FabulousList)
        this.isUp = list.some(item => {
          return item.id === id
        })
      }
      this.getDetail(this.$route.query.id)
    }
  },
  beforeRouteLeave (to, from, next) {
    const id = this.$route.query.id
    const FabulousList = localStorage.FabulousList
    if (this.isUp) {
      if (FabulousList) {
        const list = JSON.parse(FabulousList)
        const existence = list.some(item => {
          return item.id === id
        })
        if (!existence) {
          this.$postData(this.$configs.api.fabulous, { id, addNum: 1 }, response => {
            if (response) {
              list.push({id})
              localStorage.setItem('FabulousList', JSON.stringify(list))
            }
          })
        }
      } else {
        this.$postData(this.$configs.api.fabulous, { id, addNum: 1 }, response => {
          if (response) {
            localStorage.setItem('FabulousList', JSON.stringify([{id}]))
          }
        })
      }
    } else {
      if (FabulousList) {
        const list = JSON.parse(FabulousList)
        const existence = list.some(item => {
          return item.id === id
        })
        if (existence) {
          const index = list.findIndex(item => {
            return item.id === id
          })
          this.$postData(this.$configs.api.fabulous, { id, addNum: -1 }, response => {
            if (response) {
              list[index] = ''
              localStorage.setItem('FabulousList', JSON.stringify(list))
            }
          })
        }
      }
    }
    next()
  },
  methods: {
    giveUp: function () {
      this.isUp = !this.isUp
      if (this.isUp) {
        this.detail.fabulous++
        this.$vux.toast.text('点赞成功')
      } else {
        this.detail.fabulous--
      }
    },
    getDetail: function (id) {
      this.$getData(this.$configs.api.article, `/${id}`, response => {
        this.detail = response
      })
    },
    submit: function () {
    }
  }
}
</script>
<style media="screen">
  #article-detail .main {
    box-sizing: border-box;
    padding: 10px;
    background-color: #fff;
  }
  #article-detail .main .tit {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  #article-detail .main .time {
    font-size: 12px;
    box-sizing: border-box;
    padding-bottom: 10px;
    color: #999;
    border-bottom: 1px solid #e8e8e8;
  }
  #article-detail .main .cover {
    margin: 10px 0;
    height: 180px;
    border-radius: 5px;
  }
  #article-detail .main .text {
    box-sizing: border-box;
    padding-top: 10px;
    font-size: 16px;
    line-height: 1.8;
    color: #333;
  }
  #article-detail .main .text p {
    margin-bottom: 10px;
  }
  #article-detail .main .text p:first-child {
    margin: 0;
  }
  .tc {
    text-align: center;
  }
  #article-detail .main .text img {
    max-width: 100%;
  }
  #article-detail .main .fabulous {
    box-sizing: border-box;
    padding-top: 20px;
  }
  #article-detail .main .fabulous .back {
    width: 70px;
    height: 70px;
    background-color: #f90;
    border-radius: 50%;
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 18px;
  }
  #article-detail .main .fabulous .back img {
    width: 40%;
    display: block;
    margin: 0 auto;
  }
  #article-detail .main .fabulous .down {
    background-color: #ccc;
    padding-top: 23px;
  }
  #article-detail .main .fabulous .down img {
    transform:rotateX(180deg);
  }
  #article-detail .main .fabulous p {
    text-align: center;
    font-size: 12px;
    color: #999;
    margin: 20px;
  }
  #article-detail .main .fabulous .fabulous-list img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  #article-detail .main .fabulous .vux-flexbox img {
    width: 70%;
    height: 70%;
    display: block;
    margin: 0 auto;
    border-radius: 50%;
  }
  #article-detail .title {
    font-size: 14px;
    box-sizing: border-box;
    padding: 10px;
  }
  #article-detail .title span:first-child {
    float: left;
    width: 5px;
    height: 20px;
    background-color: #f90;
    border-radius: 5px;
    vertical-align: middle;
  }
  #article-detail .title span:last-child {
    margin-left: 10px;
  }
  #article-detail .comment {
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 14px;
    color: #444;
    background-color: #fff;
  }
  #article-detail .comment .comment-list {
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 7.5px 0;
  }
  #article-detail .comment .comment-list .cover {
    width: 41px;
    height: 41px;
    float: left;
    border-radius: 50%;
    overflow: hidden;
  }
  #article-detail .comment .comment-list .right {
    float: left;
    width: calc(100% - 60px);
    margin-left: 5px;
  }
  #article-detail .comment .comment-list .right .content {
    margin: 2.5px 0;
  }
  #article-detail .write-comment {
    position: fixed;
    bottom: 0;
    height: 48px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px;
    background-color: #fff;
    border-top: 1px solid #eee;
  }
  #article-detail .write-comment .left {
    float: left;
    width: 60%;
    box-sizing: border-box;
    margin-top: 2.5px;
    line-height: 30px;
    background-color: #eee;
    border-radius: 12px;
    font-size: 13px;
    color: #aaa;
    padding-left: 15px;
  }
  #article-detail .write-comment .right {
    float: right;
    width: 40%;
    box-sizing: border-box;
    margin-top: 2.5px;
    line-height: 30px;
    color: #f90;
    padding-left: 15px;
  }
  #article-detail .write-comment .right .iconfont {
    font-size: 20px;
  }
  #article-detail .write-comment .right .vux-flexbox-item {
    text-align: center;
  }
  #article-detail .write-comment .right .vux-badge-single {
    margin-bottom: 10px;
    margin-left: -5px;
  }
  #article-detail .comment-popup {
    box-sizing: border-box;
    padding:0 10px;
    height:200px;
  }
</style>
