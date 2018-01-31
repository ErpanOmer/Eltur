<template>
  <div id="personal-data">
    <group title="个人资料">
      <cell title="个人资料" is-link :link="{ name: 'Personal' }">
        <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../../../assets/men.png"/>
      </cell>
      <cell title="反馈建议" is-link>
        <img slot="icon" width="25" style="display:block;margin-right:5px;" :src="paherden"/>
      </cell>
    </group>
  </div>
</template>
<script>
import { Cell, Group } from 'vux'
import image from '@/assets/me.png'
export default {
  components: {
    Cell, Group
  },
  data () {
    return {
      example: true,
      paherden: image
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(1)
    })
  }
}
</script>
