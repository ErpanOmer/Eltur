<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    //  do something after mounting vue instance
    let url = 'http://localhost/api/Article'
    let data = {
      title: '我是',
      date: new Date(),
      author: '爱人',
      detaild: '是吧！'
    }
    this.$http.get(url + '?title=' + data.title).then(response => {
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
