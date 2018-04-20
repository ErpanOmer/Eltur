<template>
  <div id="swiper">
    <el-container>
      <el-main>
        <el-carousel :interval="3000" type="card" height="300px">
          <el-carousel-item v-for="item in list" :key="item">
            <div :style="'height: 300px;background:url(' + item + ') center center no-repeat;background-size: cover;'"></div>
          </el-carousel-item>
        </el-carousel>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'swiper',
  data: () => ({
    list: [
      'http://thumb.niutuku.com/960x1/8f/b8/8fb8fb2623afa6336e2be205718f5f0e.jpg',
      'http://thumb.niutuku.com/960x1/94/73/94731f3222b54c0fac39327cec4b438e.jpg',
      'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=e30f83e88ab1cb132a643441bc3d3d2b/94cad1c8a786c917a899ba3ece3d70cf3bc7571b.jpg',
      'http://thumb.niutuku.com/960x1/da/35/da357021b4d95225d374c86f14fec6a8.jpg'
    ]
  })
}
</script>
<style lang="scss">
</style>
