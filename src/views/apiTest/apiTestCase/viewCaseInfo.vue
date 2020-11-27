<template>
  <temp-page :drawer-visible="drawerVisible" :temp-page-title="tempPageTitle" @handleClose="handleClose">
    <div>这里写数据展示的信息</div>  
  </temp-page>
</template>
<script>
import tempPage from '@/components/tempPage'

export default {
  name: 'viewCaseInfo',
  components: { tempPage },
  props: {
    drawerVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tempPageTitle: '用例详情'
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
  }
}
</script>
<style lang="scss" scoped>

</style>