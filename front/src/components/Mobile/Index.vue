<template>
  <div id="index">
    <div class="swiper">
      <swiper loop auto :list="img_list" v-model="demo01_index" :aspect-ratio="100/195"></swiper>
    </div>
    {{msg}}
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import Tabbar from '@/components/Public/Tabbar'
import { Swiper } from 'vux'
export default {
  components: {
    Tabbar, Swiper
  },
  data: () => ({
    msg: '我是手机',
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
    demo01_index: 0
  })
}
</script>
<style media="screen">
  #index .swiper {
    background: #C3A768;
  }
</style>
