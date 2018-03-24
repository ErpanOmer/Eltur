<template>
  <div id="article-detail">
    <div class="main">
      <p class="tit">叫阿三顶顶结来得及拉数据</p>
      <p class="time"><span>11分钟前</span><span style="float:right;">Phantom</span></p>
      <div class="cover" :style="'background:url(' + img + ') center center no-repeat;background-size: cover;'"></div>
      <div class="text">
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp婚后男女双方觉得不合适，或者共同生活感情破裂，都不想继续一起过的，那么可以协议离婚。不过双方自愿离婚，签订离婚协议书时，需要确定财产分割、小孩抚养等事宜，所以有些人担心会影响自己的利益，所以便要找专业人士律师代写。但是，有些人又担心找律师麻烦，所以自己也跃跃欲试。
　　<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp实际上，可以自己写离婚协议书，觉得麻烦的也可以请律师代写，完全可以根据自身实际情况自行决定。所以，也并不是必须要求请律师写离婚协议书。
　　并且，自己写离婚协议书一般要包含以下内容：
　　<br>1、明确双方同意解除婚姻关系<br>
    2、明确子女的抚养权<br>
　　具体而言，子女抚养权可以是由一方抚养，也可以是由双方共同抚养，还可以是分别抚养一段期限。<br>
　　3、明确子女抚养费<br>
　　按规定，没有与子女共同生活的一方需向抚养子女一方支付抚养费，主要包括支付标准、支付方式等问题。<br>
　　4、明确探望权<br>
　　在离婚协议中约定好探望的时间、地点、方式、周期以及中止探望权的情形可以避免离婚后不必要的纠纷，有利于抚养子女一方的生活安宁。<br>
　　5、明确分割夫妻共同财产<br>
　　具体地，夫妻共同财产既包括积极的财产如动产不动产和债权等，也包括消极的财产如债务，夫妻应承担的国家税收、行政罚款等。<br>
　　6、明确赔偿补偿<br>
　　7、明确困难救济<br>
　　最后，实践中若离婚争议大，尤其是涉及财产分割争议、孩子抚养权及抚养费争议，双方难以协商一致的，为避免日后产生不必要的纠纷，比如一方不认账等，那么建议可以在必要时找个专业的律师介入，代写离婚协议书。
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
    show: false,
    comment: '',
    img: 'http://thumb.niutuku.com/960x1/8f/b8/8fb8fb2623afa6336e2be205718f5f0e.jpg'
  }),
  methods: {
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
    font-size: 16px;
    line-height: 1.8;
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
