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
    msg: '个人中心'
  })
}
</script>
