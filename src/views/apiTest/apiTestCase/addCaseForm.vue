<template>
  <temp-page :drawer-visible="drawerVisible" @handleClose="handleClose">
    <el-form ref="addCaseFormRef" :model="addCaseForm" label-width="80px" class="row">
      <el-row>
        <el-col :span="22" :offset="1" >
          <el-form-item label="用例名称">
            <el-input v-model="addCaseForm.caseName" placeholder="请输入用例名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item label="用例等级">
            <el-select v-model="addCaseForm.caseLevel" placeholder="请选择等级" clearable>
              <el-option v-for="item in caseLevel" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="请求方式">
            <el-select v-model="addCaseForm.requestMethod" placeholder="请选择方式" clearable>
              <el-option v-for="item in requestMethod" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="22" :offset="1">
          <el-form-item label="请求URL">
            <el-input v-model="addCaseForm.requestUrl" placeholder="请输入请求URL" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22" :offset="1">
          <el-form-item label="请求头">
            <el-input v-model="addCaseForm.requestHeader" placeholder="请输入请求头" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22" :offset="1">
          <el-form-item label="请求内容">
            <el-input type="textarea" :rows="5" v-model="addCaseForm.requestBody" placeholder="请输入请求内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22" :offset="1">
          <el-form-item label="断言条件">
            <el-row v-for="(item, index) in addCaseForm.assertInfos" :key="index" class="assert-group">
              <el-col :span="20">
                <assert-group v-model="addCaseForm.assertInfos[index]" />
              </el-col>
              <el-col :span="2">
                <el-button type="primary" size="mini" class="el-icon-plus" circle @click="addAssertGroup"></el-button>
              </el-col>
              <el-col :span="2">
                <el-button type="danger" size="mini" class="el-icon-minus" circle @click="delAssertGroup(index)"></el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="22" :offset="1">
          <el-form-item label="获取参数">
            <el-row v-for="(item, index) in addCaseForm.paramInfos" :key="index" class="assert-group" >
              <el-col :span="20">
                <param-group v-model="addCaseForm.paramInfos[index]" />
              </el-col>
              <el-col :span="2">
                <el-button type="primary" size="mini" class="el-icon-plus" circle @click="addParamGroup"></el-button>
              </el-col>
              <el-col :span="2">
                <el-button type="danger" size="mini" class="el-icon-minus" circle @click="delParamGroup(index)"></el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="22" :offset="1">
          <el-form-item label="备注">
            <el-input v-model="addCaseForm.remark" placeholder="请输入备注" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn-group">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </temp-page>
</template>
<script>
import tempPage from '@/components/tempPage'
import assertGroup from '@/views/apiTest/apiTestCase/components/assertGroup'
import paramGroup from '@/views/apiTest/apiTestCase/components/paramGroup'

export default {
  name: 'addCaseForm',
  components: { tempPage, assertGroup, paramGroup },
  props: {
    drawerVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      addCaseForm: {
        assertInfos: [{}],
        paramInfos: [{}]
      },
      // 测试用例等级下拉选项
      caseLevel: [
        { value: 1, label: '低' },
        { value: 2, label: '中' },
        { value: 3, label: '高' }
      ],
      // 请求方式下拉选项
      requestMethod: [
        { value: 'post', label: 'POST' }, { value: 'get', label: 'GET' }
      ],
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    handleSubmit () {
      this.$emit('handleSubmit', this.addCaseForm)
    },
    // 新增断言组
    addAssertGroup () {
      this.addCaseForm.assertInfos.push({})
    },
    // 删除断言组
    delAssertGroup (index) {
      if (this.addCaseForm.assertInfos.length < 2) {
        this.$message.warning('断言条件不能全部删除哟～')
        return
      }
      this.addCaseForm.assertInfos.splice(index, 1)
    },
    // 新增参数组
    addParamGroup () {
      this.addCaseForm.paramInfos.push({})
    },
    // 删除参数组
    delParamGroup (index) {
      if (this.addCaseForm.paramInfos.length < 2) {
        this.$message.warning('参数信息不能全部删除哟～')
        return
      }
      this.addCaseForm.paramInfos.splice(index, 1)
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
  .assert-group {
    margin-bottom: 20px;
  }
</style>
