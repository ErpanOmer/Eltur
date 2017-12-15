<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="">
      this is admin!
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    //  do something after mounting vue instance
    let url = 'http://localhost/api/Article'
    this.$http.get(url + '?title=2').then(response => {
      console.log(response)
    })
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
