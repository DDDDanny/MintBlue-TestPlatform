<template>
  <el-drawer :visible="drawerVisible" size="50%" class="drawer" :append-to-body="true" @close="handleClose">
    <template slot="title">
      <span class="temp-title">{{ tempPageTitle }}</span>
    </template>
    <slot></slot>
  </el-drawer>
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
  ::v-deep .el-drawer__body{
    display: flex;
    flex-direction: column;
    height: calc(100% - 78px);
    padding-top: 20px;
  }
  .temp-title {
    color: #000000;
    font-size:20px;
  }
  ::v-deep .el-drawer__header {
    box-shadow: 2px 0px 3px #888888;
    padding-bottom: 10px;
    margin-bottom: 0px;
  }
</style>
