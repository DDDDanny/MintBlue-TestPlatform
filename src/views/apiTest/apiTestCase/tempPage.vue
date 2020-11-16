<template>
    <div>
      <el-drawer :visible="drawerVisible" size="800px" :append-to-body="true"  @close="handleClose">
        <template slot="title">
          <h3>新增测试用例</h3>
        </template>
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
  // 解决element ui drawer组件出现篮框的Bug
  ::v-deep :focus {
    outline: 0;
  }
</style>
