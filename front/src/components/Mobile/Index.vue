<template>
  <div id="" @click="$router.push('Home')">
    {{msg}}
  </div>
</template>
<script>
export default {
  data: () => ({
    msg: '我是手机'
  })
}
</script>
