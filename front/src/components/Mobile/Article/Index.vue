<template>
  <div id="article">
    <panel header="最新文章" :footer="footer" :list="list" :type="type"></panel>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import { Panel, Group, Radio } from 'vux'
import Tabbar from '@/components/Public/Tabbar'
export default {
  components: {
    Tabbar,
    Panel,
    Group,
    Radio
  },
  data () {
    return {
      type: '5',
      list: [{
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题一',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: ''
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题二',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '',
          replace: false
        },
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }],
      footer: {
        title: '换一组',
        url: ''
      }
    }
  }
}
</script>
