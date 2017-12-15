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
      msg: 'Me'
    }
  },
  components: {
    ToolBar
  }
}
</script>
