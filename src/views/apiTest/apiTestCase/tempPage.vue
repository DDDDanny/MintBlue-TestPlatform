<template>
    <div>
      <el-drawer :visible="drawerVisible" size="800px" @close="handleClose">
        <span>Add TestCase Form</span>
      </el-drawer>
    </div>
</template>
<script>
export default {
  props: {
    // TempPage Title
    tempPageTitle: {
      type: String,
      default: '新增测试用例'
    },
    // 是否展示TempPage
    drawerVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
