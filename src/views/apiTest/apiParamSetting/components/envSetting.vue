<template>
  <div>
    <el-row justify="end" type="flex" class="button-bar">
      <el-col :span="3" :offset="3">
        <el-button type="primary" @click="addEnv">新增环境</el-button>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24">
        <el-table :data="envInfo" :header-cell-style="tableHeaderColor" border>
          <el-table-column label="环境名称" prop="envName"></el-table-column>
          <el-table-column label="基础地址" min-width="200" prop="baseURL"></el-table-column>
          <el-table-column label="创建时间" width="150" prop="createTime"></el-table-column>
          <el-table-column label="创建人" width="150" prop="creator"></el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="">
              <el-button type="text" size="medium">编辑</el-button>
              <el-button type="text" size="medium" @click="delEnv">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="新增环境参数" :visible.sync="envDialogDisplay" width="50%" @close="handleCancelAddEnv">
      <el-form :model="envInfoForm" :rules="envInfoRules" ref="envRuleForm" label-width="80px">
        <el-form-item label="环境名称" prop="envName">
          <el-input v-model="envInfoForm.envName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="基础地址" prop="baseURL">
          <el-input v-model="envInfoForm.baseURL" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelAddEnv">取 消</el-button>
        <el-button type="primary" @click="handleSubmitEnv">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'envSetting',
  data() {
    return {
      envInfo: [
        { envName: '正式环境', baseURL: 'https://xiaojing0.com/workbench_api', createTime: '2020.11.12', creator: 'DDDDanny' },
        { envName: '测试环境', baseURL: 'https://dev.xiaojing0.com/workbench_api', createTime: '2020.11.13', creator: 'DDDDanny' }
      ],
      // 表格表头数据
      tableHeaderColor: { background: '#FAFAFA' },
      // 控制弹框是否显示
      envDialogDisplay: false,
      // 环境信息Form表单
      envInfoForm: {
        envName: '',
        baseURL: ''
      },
      // 环境信息校验规则
      envInfoRules: {
        envName: [
          { required: true, message: '请输入环境名称', trigger: 'blur' }
        ],
        baseURL: [
          { required: true, message: '请输入基础地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 删除环境参数
    delEnv () {
      this.$confirm('此操作将永久删除该环境参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 这里写删除项目的逻辑
        // ---
        // ---
        this.$message.success('删除成功！')
      }).catch(() => {
        this.$message.info('您已取消删除～')
      })
    },
    // 新增环境信息
    addEnv () {
      this.envDialogDisplay = true
    },
    // 处理提交环境信息
    handleSubmitEnv () {
      this.$refs.envRuleForm.validate((valid) => {
        if (!valid) {
          this.$message.error('请填写必填项！')
          return
        }
        this.$message.success('新增环境信息成功')
        this.envDialogDisplay = false
        this.$refs.envRuleForm.resetFields()
      })
    },
    // 处理取消新增
    handleCancelAddEnv () {
      // 隐藏弹框
      this.envDialogDisplay = false
      // 重置数据
      this.$refs.envRuleForm.resetFields()
    }
  },
}
</script>

<style lang="scss" scoped>
  .button-bar {
    margin-bottom: 25px;
  }
</style>