<template>
  <temp-page :drawer-visible="drawerVisible" @handleClose="handleClose">
    <el-form ref="addCaseFormRef" :rules="rules" :model="addCaseForm" label-width="80px" class="row">
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="用例名称" prop="name">
            <el-input v-model="addCaseForm.caseName" placeholder="请输入用例名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item label="用例等级">
            <el-select v-model="addCaseForm.caseLevel" placeholder="请选择等级" clearable>
              <el-option v-for="item in caseLevel" :key="item.value" :label="item.label" :value="item.value"/>
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
        <!---->
        <el-col :span="22" :offset="1" class="assert-group">
          <div class="assert-item">
            <el-form-item
              label="断言条件"
              v-for="(item,index) in addCaseForm.assertKey"
              :prop="'assertKey.' + index + '.value'"
              :key="'assertKey' + index"
              :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
            >
              <el-input v-model="item.value" placeholder="输入断言Key"></el-input>
            </el-form-item>
          </div>

          <div class="assert-item">
            <el-form-item
              v-for="(item,index) in addCaseForm.assertCondition"
              :rules="{
      required: true, message: '域名不能为空2', trigger: 'blur'
    }"
              :prop="'assertCondition.' + index + '.value'"
              :key="'assertCondition' + index">
              <el-select v-model="item.value" placeholder="请选择条件">
                <el-option v-for="item in assertConditions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </div>

          <div class="assert-item">
            <el-form-item
              v-for="(item,index) in addCaseForm.assertValue"
              :rules="{
      required: true, message: '域名不能为空3', trigger: 'blur'
    }"
              :prop="'assertValue.' + index + '.value'"
              :key="'assertValue' + index">
              <el-input v-model="item.value" placeholder="输入断言Val"></el-input>
              <el-button type="primary" size="mini" class="el-icon-plus" circle @click="addAssertGroup "></el-button>
              <el-button type="danger" size="mini" class="el-icon-minus" circle @click="delAssertGroup(index)"></el-button>
            </el-form-item>
          </div>
        </el-col>
        <!---->
        <el-col :span="22" :offset="1">
          <el-form-item label="获取参数">
            <el-row v-for="(item, index) in addCaseForm.paramInfos" :key="index" class="assert-group">
              <el-col :span="20">
                <param-group v-model="addCaseForm.paramInfos[index]"/>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" size="mini" class="el-icon-plus" circle @click="addParamGroup"></el-button>
              </el-col>
              <el-col :span="2">
                <el-button type="danger" size="mini" class="el-icon-minus" circle @click="delParamGroup (index)"></el-button>
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
  import paramGroup from '@/views/apiTest/apiTestCase/components/paramGroup'

  export default {
    name: 'addCaseForm',
    components: {
      tempPage,
      paramGroup,
    },
    props: {
      drawerVisible: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        addCaseForm: {
          paramInfos: [{}],
          assertKey: [{ value: '' }],
          assertCondition: [{ value: '' }],
          assertValue: [{ value: '' }],
        },
        // 测试用例等级下拉选项
        caseLevel: [
          {
            value: 1,
            label: '低',
          },
          {
            value: 2,
            label: '中',
          },
          {
            value: 3,
            label: '高',
          },
        ],
        assertConditions: [
          {
            value: '==',
            label: '等于',
          },
          {
            value: '!=',
            label: '不等于',
          },
          {
            value: 'In',
            label: '包含',
          },
          {
            value: 'notIn',
            label: '不包含',
          },
        ],
        // 请求方式下拉选项
        requestMethod: [
          {
            value: 'post',
            label: 'POST',
          }, {
            value: 'get',
            label: 'GET',
          },
        ],
        xxx: {},
        rules: {
          name: [
            {
              required: true,
              message: '请输入活动名称',
              trigger: 'blur',
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur',
            },
          ],
          assertKey: [{
            required: true,
            message: '请输入活动1',
            trigger: 'blur',
          }],
          assertCondition: [{
            required: true,
            message: '请输入活动2',
            trigger: 'blur',
          }],
          assertValue: [{
            required: true,
            message: '请输入活动3',
            trigger: 'blur',
          }],
        },
      }
    },
    methods: {
      handleClose () {
        this.$emit('handleClose')
      },
      handleSubmit () {
        this.$refs.addCaseFormRef.validate().then(() => {
          this.$emit('handleSubmit', this.addCaseForm)
        })
      },
    // 新增断言组
    addAssertGroup () {
      this.addCaseForm.assertKey.push({ value: '' })
      this.addCaseForm.assertCondition.push({ value: '' })
      this.addCaseForm.assertValue.push({ value: '' })
    },
    // 删除断言组
    delAssertGroup (index) {
      if (this.addCaseForm.assertKey.length < 2) {
        this.$message.warning('断言条件不能全部删除哟～')
        return
      }
      this.addCaseForm.assertKey.splice(index, 1)
      this.addCaseForm.assertCondition.splice(index, 1)
      this.addCaseForm.assertValue.splice(index, 1)
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
    display: flex;

    ::v-deep .assert-item:not(:first-child) {
      .el-form-item__content {
        margin-left: 10px !important;
        display: flex;
      }
    }
  }
</style>
