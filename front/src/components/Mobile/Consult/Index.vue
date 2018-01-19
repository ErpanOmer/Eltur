<template>
  <div id="">
    {{msg}}
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import Tabbar from '@/components/Public/Tabbar'
export default {
  components: {
    Tabbar
  },
  data: () => ({
    msg: '咨询'
  })
}
</script>
