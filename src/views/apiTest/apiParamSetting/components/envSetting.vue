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
          <el-table-column label="创建时间" width="200" prop="createTime"></el-table-column>
          <el-table-column label="创建人" width="150" prop="creator"></el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="editEnv(scope.row)">编辑</el-button>
              <el-button type="text" size="medium" @click="delEnv">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="envDialogDisplay" width="50%" @close="handleCloseDialog">
      <el-form :model="envInfoForm" :rules="envInfoRules" ref="envRuleForm" label-width="80px">
        <el-form-item label="环境名称" prop="envName">
          <el-input v-model="envInfoForm.envName" autocomplete="off" placeholder="请输入环境名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="基础地址" prop="baseURL">
          <el-input v-model="envInfoForm.baseURL" autocomplete="off" placeholder="请输入基础地址" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="envDialogDisplay = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitEnv">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'envSetting',
  data () {
    return {
      // 环境列表数据
      envInfo: [],
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
        envName: [{ required: true, message: '请输入环境名称', trigger: 'blur' }],
        baseURL: [{ required: true, message: '请输入基础地址', trigger: 'blur' }]
      },
      // 判断是否为编辑
      isEdit: false
    }
  },
  created () {
    // 获取环境信息
    this.getEnvList()
  },
  computed: {
    dialogTitle: function () {
      if (this.isEdit) return '编辑环境参数'
      return '新增环境参数'
    }
  },
  methods: {
    // 获取环境参数列表
    async getEnvList () {
      const res = await this.$api.listEnv()
      this.envInfo = res.data
    },
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
      this.isEdit = false
      this.envDialogDisplay = true
      // 点击新增环境信息时，清空一次表单数据
      Object.keys(this.envInfoForm).forEach(key => (this.envInfoForm[key] = ''))
    },
    // 处理提交环境信息
    handleSubmitEnv () {
      this.$refs.envRuleForm.validate(async (valid) => {
        if (!valid) {
          this.$message.error('请填写必填项！')
          return
        }
        if (!this.isEdit) {
          // 获取project ID
          const proID = util.cookies.get('project')
          if (proID === 'NULL') {
            this.$message.error('没有可用的项目，请添加项目后重试')
            return
          }
          // 新增环境信息逻辑写在这里
          this.envInfoForm.projectID = proID
          const res = await this.$api.addEnv(this.envInfoForm)
          if (res.status.code !== 0) {
            this.$message.error('新增环境信息失败！')
            return
          }
          this.$message.success('新增环境信息成功')
        } else {
          // 编辑环境信息逻辑写在这里
          //
          //
          this.$message.success('更新环境信息成功')
        }
        // 刷新列表
        this.getEnvList()
        // 隐藏弹框
        this.envDialogDisplay = false
      })
    },
    // 处理取消新增
    handleCloseDialog () {
      // 重置数据
      this.$refs.envRuleForm.resetFields()
    },
    // 编辑环境信息
    editEnv (envRow) {
      this.isEdit = true
      this.envDialogDisplay = true
      this.envInfoForm.envName = envRow.envName
      this.envInfoForm.baseURL = envRow.baseURL
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-bar {
    margin-bottom: 25px;
  }
</style>
