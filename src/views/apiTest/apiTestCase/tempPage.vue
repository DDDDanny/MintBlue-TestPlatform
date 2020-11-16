<template>
    <div>
      <el-drawer :visible="drawerVisible" size="800px" :append-to-body="true" @close="handleClose">
        <template slot="title">
          <span class="temp-title">新增测试用例</span>
        </template>
        <el-row>
          <el-col :span="22" :offset="1">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="用例名称">
                <el-input v-model="form.name" ></el-input>
              </el-form-item>
              <el-form-item label="用例描述">
                <el-input v-model="form.desc" ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="btn-group">
          <div class="temp-page-btn-bar">
            <el-button @click="handleClose" >取消</el-button>
            <el-button type="primary">提交</el-button>
          </div>
        </div>
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
  data () {
    return {
      form: {
        name: ''
      }
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
  .temp-page-btn-bar {
    position: relative;
    left: 450px;
    .el-button {
      width: 150px;
      margin-right: 20px;
    }
  }
  .btn-group {
    position: fixed;
    bottom: 0px;
    padding: 20px 0px;
    display: inline-block;
    width: 100%;
    box-shadow: 0px -1px 4px 0px rgba(195, 195, 195, 0.5);
  }
  .temp-title {
    color: #000000;
    font-size:20px;
  }
</style>
