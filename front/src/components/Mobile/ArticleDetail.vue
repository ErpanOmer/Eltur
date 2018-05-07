<template>
  <div id="article-detail">
    <div class="main">
      <p class="tit" v-text="detail.title"></p>
      <p class="time">
        <span v-text="$formatTime(detail.createdTime)"></span>
        <span style="margin-left:10px;" v-text="$isEmptyParam(detail.author) ? '来源: ' + detail.source : '作者 ' + detail.author"></span>
        <span style="float:right;color:#f90;" v-text="itemList[detail.category]"></span>
      </p>
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
      <transition-group name="list-complete">
        <div class="comment-list clearfix list-complete-item" v-for="item in detail.comments" :key="item.createdTime">
            <div class="cover">
              <img width="100%" :src="item.cover" alt="">
            </div>
            <div class="right">
              <div class="head">
                <p v-text="item.name"></p>
                <p style="color: #999;font-size: 12px;" v-text="$formatTime(item.createdTime)"></p>
              </div>
              <div class="content" style="color:#000;" v-text="item.text"></div>
            </div>
        </div>
      </transition-group>
    </div>
    <Divider style="margin-top: 5px;font-size: 14px;" v-text="`${commentsLength >= 1 ? '没有更多评论了' : '暂时没人评论'}`"></Divider>
    <div class="write-comment clearfix">
      <div class="left" @click="show=true">
        <span slot="icon" class="icon iconfont icon-write"></span>
        <span style="margin-left:5px;">我来评论</span>
      </div>
      <div class="right clearfix">
        <flexbox :gutter="0">
          <flexbox-item>
            <span class="icon iconfont icon-linedesign-01" style="font-size: 23px;"><badge v-show="commentsLength >= 1" :text="commentsLength"></badge></span>
          </flexbox-item>
          <flexbox-item>
            <span class="icon iconfont icon-ziyuan"></span>
          </flexbox-item>
          <flexbox-item>
            <span class="icon iconfont icon-fenxiang"></span>
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
import { Flexbox, FlexboxItem, Group, Badge, Popup, XTextarea, XButton, Divider } from 'vux'
export default {
  components: {
    Flexbox, FlexboxItem, Group, Badge, Popup, XTextarea, XButton, Divider
  },
  data: () => ({
    isUp: false,
    detail: {},
    show: false,
    comment: '',
    itemList: ['推荐', '婚姻家庭', '交通事故', '劳动用工', '治安刑事', '医疗事故', '房产土地', '责权责务', '合同纠纷', '征地拆迁'],
    commentsLength: 0,
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
      this.getDetail(id)
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Login') {
      if (!this.$isEmptyParam(this.comment)) {
        this.$store.commit('setPostCommet', this.comment)
      }
    } else {
      this.$store.commit('setPostCommet', '')
    }
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
        const recommend = localStorage.getItem('recommendList')
        if (recommend) {
          const list = JSON.parse(recommend)
          list.push({ category: this.detail.category })
          localStorage.setItem('recommendList', JSON.stringify(list))
        } else {
          localStorage.setItem('recommendList', JSON.stringify([{ category: this.detail.category }]))
        }
        this.$nextTick(() => {
          this.commentsLength = this.detail.comments.length
        })
        const comment = this.$store.getters.getPostComment
        if (!this.$isEmptyParam(comment)) {
          this.comment = comment
          this.show = true
        }
      })
    },
    submit: function () {
      this.$postData(this.$configs.api.comments, { text: this.comment, id: this.$route.query.id }, response => {
        if (response) {
          this.$store.dispatch('userInfo').then(response => {
            const data = {
              cover: response.avatar,
              name: response.name,
              text: this.comment,
              createdTime: ~~(new Date().getTime() / 1000)
            }
            this.detail.comments.unshift(data)
            this.show = false
            this.$vux.toast.text('评论成功')
            this.commentsLength++
            this.$store.commit('setPostCommet', '')
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
  #article-detail {
    .main {
      box-sizing: border-box;
      padding: 10px;
      background-color: #fff;
      .tit {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .time {
        font-size: 12px;
        box-sizing: border-box;
        padding-bottom: 10px;
        color: #999;
        border-bottom: 1px solid #e8e8e8;
      }
      .cover {
        margin: 10px 0;
        height: 180px;
        border-radius: 5px;
      }
      .text {
        box-sizing: border-box;
        padding-top: 10px;
        font-size: 16px;
        line-height: 1.8;
        color: #333;
        p {
          margin-bottom: 10px;
          &:first-child {
            margin: 0;
          }
        }
        img {
          max-width: 100%;
        }
      }
      .fabulous {
        box-sizing: border-box;
        padding-top: 20px;
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
    .tc {
      text-align: center;
    }
    .title {
      font-size: 14px;
      box-sizing: border-box;
      padding: 10px;
      span {
        &:first-child {
          float: left;
          width: 5px;
          height: 20px;
          background-color: #f90;
          border-radius: 5px;
          vertical-align: middle;
        }
        &:last-child {
          margin-left: 10px;
        }
      }
    }
    .comment {
      box-sizing: border-box;
      padding: 0 10px;
      font-size: 14px;
      color: #444;
      background-color: #fff;
      .comment-list {
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        padding: 7.5px 0;
        .cover {
          width: 41px;
          height: 41px;
          float: left;
          border-radius: 12px;
          overflow: hidden;
        }
        .right {
          float: left;
          width: calc(100% - 60px);
          margin-left: 10px;
          .content {
            margin: 2.5px 0;
          }
        }
      }
    }
    .write-comment {
      position: fixed;
      bottom: 0;
      height: 48px;
      width: 100%;
      box-sizing: border-box;
      padding: 5px 10px;
      background-color: #fff;
      border-top: 1px solid #eee;
      .left {
        float: left;
        width: 55%;
        box-sizing: border-box;
        margin-top: 2.5px;
        line-height: 30px;
        background-color: #eee;
        border-radius: 12px;
        font-size: 13px;
        color: #aaa;
        padding-left: 15px;
      }
      .right {
        float: right;
        width: 45%;
        box-sizing: border-box;
        margin-top: 2.5px;
        line-height: 30px;
        color: #f90;
        padding-left: 15px;
        .iconfont {
          font-size: 20px;
        }
        .vux-flexbox-item {
          text-align: center;
        }
        .vux-badge {
          margin-bottom: 10px;
          margin-left: -5px;
        }
      }
    }
    .comment-popup {
      box-sizing: border-box;
      padding:0 10px;
      height:200px;
    }
  }
</style>
