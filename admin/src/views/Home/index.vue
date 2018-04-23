<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text" v-text="`Hello! ${name}`"></div> -->
    <chart height='100%' width='100%'></chart>
  </div>
</template>
<script>
import Chart from '@/components/Charts/mixChart'
export default {
  name: 'home',
  components: { Chart },
  data: () => ({
  }),
  computed: {
    name: function() {
      return this.$store.getters.name
    },
    token: function() {
      return this.$store.getters.token
    }
  },
  mounted() {
    //  do something after mounting vue instance
    this.$store.dispatch('GetInfo').then(() => {
    }).catch(() => {
      this.$router.push('Login')
      console.log('获取用户信息失败')
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    padding: 30px;
    position: relative;
    width: 100%;
    height:85vh;
  }
}
</style>
