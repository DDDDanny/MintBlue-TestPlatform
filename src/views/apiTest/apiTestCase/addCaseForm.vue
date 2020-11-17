<template>
  <temp-page :drawer-visible="drawerVisible" @handleClose="handleClose">
    <el-form ref="addCaseFormRef" :model="addCaseForm" label-width="80px" class="row">
      <el-row>
        <el-col :span="22" :offset="1" >
          <el-form-item label="用例名称">
            <el-input v-model="addCaseForm.caseName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item label="用例等级">
            <el-input v-model="addCaseForm.caseLevel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="请求方式">
            <el-input v-model="addCaseForm.requestMethod"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22" :offset="1">
          <el-form-item label="请求URL">
            <el-input v-model="addCaseForm.requestUrl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22" :offset="1">
          <el-form-item label="请求头">
            <el-input v-model="addCaseForm.requestHeader"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22" :offset="1">
          <el-form-item label="请求内容">
            <el-input v-model="addCaseForm.requestBody"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22" :offset="1">
          <el-form-item label="断言信息">
            <el-input v-model="addCaseForm.assert"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22" :offset="1">
          <el-form-item label="获取参数">
            <el-input v-model="addCaseForm.param"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22" :offset="1">
          <el-form-item label="备注">
            <el-input v-model="addCaseForm.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn-group">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary">提交</el-button>
    </div>
  </temp-page>
</template>
<script>
import tempPage from '@/components/tempPage'

export default {
  name: 'addCaseForm',
  components: { tempPage },
  props: {
    drawerVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      addCaseForm: {},
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
  .row{
    flex: 1;
    overflow: auto;
  }
  .btn-group {
    padding: 20px 0px;
    width: 100%;
    height: 80px;
    box-shadow: 0px -1px 4px 0px rgba(195, 195, 195, 0.5);
    display: flex;
    justify-content: flex-end;
    position: relative;
    z-index: 2;
    .el-button {
      width: 150px;
      margin-right: 20px;
    }
  }
</style>