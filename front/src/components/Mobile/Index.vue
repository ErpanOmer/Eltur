<template>
  <div id="index">
    <div class="swiper">
      <swiper loop auto :list="img_list" v-model="demo01_index" :aspect-ratio="100/195"></swiper>
    </div>
    <panel header="最新新闻" :footer="footer" :list="list" :type="type"></panel>
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import Tabbar from '@/components/Public/Tabbar'
import { Swiper, Cell, Group, Panel, Radio } from 'vux'
export default {
  components: {
    Tabbar, Swiper, Cell, Group, Panel, Radio
  },
  data: () => ({
    img_list: [{
      url: '',
      img: 'http://thumb.niutuku.com/960x1/8f/b8/8fb8fb2623afa6336e2be205718f5f0e.jpg',
      title: ''
    }, {
      url: '',
      img: 'http://thumb.niutuku.com/960x1/94/73/94731f3222b54c0fac39327cec4b438e.jpg',
      title: ''
    }, {
      url: '',
      img: 'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=e30f83e88ab1cb132a643441bc3d3d2b/94cad1c8a786c917a899ba3ece3d70cf3bc7571b.jpg',
      title: ''
    }, {
      url: '',
      img: 'http://thumb.niutuku.com/960x1/da/35/da357021b4d95225d374c86f14fec6a8.jpg',
      title: ''
    }],
    demo01_index: 0,
    type: '5',
    list: [{
      src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
      title: '标题一',
      desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
      url: ''
    }, {
      src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
      title: '标题二',
      desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
      url: {
        path: '',
        replace: false
      },
      meta: {
        source: '来源信息',
        date: '时间',
        other: '其他信息'
      }
    }],
    footer: {
      title: '换一组',
      url: ''
    }
  })
}
</script>
<style media="screen">
  #index .swiper {
    background: #C3A768;
  }
</style>
