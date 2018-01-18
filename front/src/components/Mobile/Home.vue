<template>
  <div id="">
    <div id="" @click="$router.go(-1)">
      {{msg}}
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    msg: '手机挑传'
  })
}
</script>
