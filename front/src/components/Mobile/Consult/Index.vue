<template>
  <div id="consult">
    <group>
      <div slot="default" class="title">
        <span style="display:inline-block;"></span>
        <span>你可能感兴趣的问题</span>
      </div>
    </group>
    <group>
      <div slot="default" class="title">
        <span style="display:inline-block;"></span>
        <span>大家在问</span>
      </div>
    </group>
    <div class="consult-list" v-for="item in 6">
      <div class="top clearfix">
        <img src="../../../assets/businessman.png" width="40px" alt="">
        <p>name</p>
        <p style="color: rgb(153, 153, 153);font-size: 12px;">广东省 深圳市</p>
      </div>
      <div class="consult-text">
        觉得时间多久啊是零件冷镦机萨拉近段时间觉得时间多久啊是零件冷镦机萨拉近段时间觉得时间多久啊是零件冷镦机萨拉近段时间觉得时间多久啊是零件冷镦机萨拉近段时间觉得时间多久啊是零件冷镦机萨拉近段时间觉得时间多久啊是零件冷镦机萨拉近段时间
      </div>
      <div class="success">已回答</div>
      <p><span style="color:#ffa050;font-size: 12px;">10分钟前</span></p>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import Tabbar from '@/components/Public/Tabbar'
import { Cell, Group } from 'vux'
export default {
  components: {
    Tabbar,
    Group,
    Cell
  },
  data: () => ({
  })
}
</script>
<style media="screen">
  #consult .consult-list {
    box-sizing: border-box;
    padding: 10px;
    background-color: #fff;
    margin-bottom: 10px;
    font-size: 14px;
    color: #444;
    position: relative;
  }
  #consult  .consult-list .top > *{
    float: left;
  }
  #consult .consult-list .top p {
    width: calc(100% - 52.5px);
    margin-left: 7.5px;
  }
  #consult .consult-text {
    margin: 5px 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  #consult .title {
    font-size: 14px;
    box-sizing: border-box;
    padding: 10px;
  }
  #consult .title span:first-child {
    float: left;
    width: 5px;
    height: 20px;
    background-color: #f90;
    border-radius: 5px;
    vertical-align: middle;
  }
  #consult .title span:last-child {
    margin-left: 10px;
  }
  #consult .consult-list .success {
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
</style>
