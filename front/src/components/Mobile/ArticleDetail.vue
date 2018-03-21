<template>
  <div id="article-detail">
    <div class="main">
      <p class="tit">叫阿三顶顶结来得及拉数据</p>
      <p class="time"><span>11分钟前</span><span style="float:right;">Phantom</span></p>
      <div class="cover" :style="'background:url(' + img + ') center center no-repeat;background-size: cover;'"></div>
      <div class="text">
        的设计教案设计大家阿斯利康大家教案设计沙龙的教科书家啊啦啦啦啦啦啦啦啦啦啦啦啦
        的设计教案设计大家阿斯利康大家教案设计沙龙的教科书家啊啦啦啦啦啦啦啦啦啦啦啦啦
        的设计教案设计大家阿斯利康大家教案设计沙龙的教科书家啊啦啦啦啦啦啦啦啦啦啦啦啦
        的设计教案设计大家阿斯利康大家教案设计沙龙的教科书家啊啦啦啦啦啦啦啦啦啦啦啦啦
        的设计教案设计大家阿斯利康大家教案设计沙龙的教科书家啊啦啦啦啦啦啦啦啦啦啦啦啦
        的设计教案设计大家阿斯利康大家教案设计沙龙的教科书家啊啦啦啦啦啦啦啦啦啦啦啦啦
        的设计教案设计大家阿斯利康大家教案设计沙龙的教科书家啊啦啦啦啦啦啦啦啦啦啦啦啦
        的设计教案设计大家阿斯利康大家教案设计沙龙的教科书家啊啦啦啦啦啦啦啦啦啦啦啦啦
        的设计教案设计大家阿斯利康大家教案设计沙龙的教科书家啊啦啦啦啦啦啦啦啦啦啦啦啦
        的设计教案设计大家阿斯利康大家教案设计沙龙的教科书家啊啦啦啦啦啦啦啦啦啦啦啦啦
      </div>
      <div class="fabulous">
        <div class="back">
          <img src="../../assets/fabulous.png" alt="">
        </div>
        <p>20人攒过</p>
        <flexbox :gutter="0">
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
        </flexbox>
      </div>
    </div>
    <group style="margin-top:-11px;">
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
    <div class="write-comment">
      <div class="left">
        <span slot="icon" class="icon iconfont icon-write"></span>
        <span style="margin-left:5px;">我来评论</span>
      </div>
      <div class="right">
        <span slot="icon" class="icon iconfont icon-fenxiang" style="margin-right:15px;"></span>
        <span slot="icon" class="icon iconfont icon-ziyuan"></span>
      </div>
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
    img: 'http://thumb.niutuku.com/960x1/8f/b8/8fb8fb2623afa6336e2be205718f5f0e.jpg'
  })
}
</script>
<style media="screen">
  #article-detail .main {
    box-sizing: border-box;
    padding: 10px;
    background-color: #fff;
  }
  #article-detail .main .tit {
    font-size: 17px;
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
    font-size: 15px;
    color: #333;
  }
  #article-detail .main .fabulous {
    box-sizing: border-box;
    padding: 40px 40px 20px;
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
    width: 70%;
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
    width: 30%;
    box-sizing: border-box;
    margin-top: 2.5px;
    line-height: 30px;
    border-radius: 12px;
    font-size: 14px;
    color: #333;
    text-align: center;
    padding-left: 15px;
  }
</style>
