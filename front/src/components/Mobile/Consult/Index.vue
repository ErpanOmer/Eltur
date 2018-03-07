<template>
  <div id="">
    <group>
      <cell title="快速咨询" is-link :link="{ name: 'Process' }">
        <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../../../assets/gavel-law.png"/>
      </cell>
      <cell title="找律师" is-link :link="{ name: 'Lawyer'}">
        <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../../../assets/judge.png"/>
      </cell>
    </group>
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import Tabbar from '@/components/Public/Tabbar'
import { Cell, Group } from 'vux'
export default {
  components: {
    Tabbar,
    Group,
    Cell
  },
  data: () => ({
  })
}
</script>
