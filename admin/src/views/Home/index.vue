<template>
  <div class="dashboard-container">
    <div class="dashboard-text" v-text="`Hello! ${name}`"></div>
  </div>
</template>
<script>
export default {
  name: 'Home',
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
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
