<template>
  <div id="Textarea">
    <group title="反馈意见">
      <x-textarea :max="150" placeholder="请输入您的意见！" :show-counter="true" :height="120" :rows="4"></x-textarea>
    </group>
    <div style="text-align:right;margin-right:10px;">
    <x-button mini plain link="BACK">返回</x-button>
    <x-button mini type="primary">提交</x-button>
  </div>
  </div>
</template>
<script>
import { XTextarea, Group, XButton } from 'vux'

export default {
  components: {
    XTextarea,
    Group,
    XButton
  },
  data () {
    return {

    }
  }
}
</script>
