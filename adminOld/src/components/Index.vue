<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ToolBar></ToolBar>
  </div>
</template>
<script>
import ToolBar from '@/components/public/ToolBar'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Fucking forever this Company! Bitch!'
    }
  },
  components: {
    ToolBar
  }
}
</script>
