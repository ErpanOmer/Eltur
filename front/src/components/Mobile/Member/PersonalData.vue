<template>
  <div id="personal-data">
    <group title="个人资料">
      <cell title="个人资料" is-link :link="{ name: 'PersonalData' }">
        <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../../../assets/men.png"/>
      </cell>
      <cell title="反馈建议" is-link>
        <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../../../assets/me.png"/>
      </cell>
    </group>
  </div>
</template>
<script>
import { Cell, Group } from 'vux'
export default {
  components: {
    Cell, Group
  },
  data () {
    return {
      example: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(1)
    })
  }
}
</script>
