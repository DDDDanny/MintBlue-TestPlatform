<template>
  <div>
    <el-row justify="end" type="flex" class="button-bar">
      <el-col :span="3" :offset="3">
        <el-button type="primary" @click="addVersion">新增版本</el-button>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24">
        <el-table :data="versionInfo" :header-cell-style="tableHeaderColor" border>
          <el-table-column label="版本号" prop="version"></el-table-column>
          <el-table-column label="版本信息" min-width="200" prop="verInfo"></el-table-column>
          <el-table-column label="创建时间" width="150" prop="createTime"></el-table-column>
          <el-table-column label="创建人" width="150" prop="creator"></el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="">
              <el-button type="text" size="medium">编辑</el-button>
              <el-button type="text" size="medium" @click="delVersion">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="新增版本号" :visible.sync="versionDialogDisplay" width="50%" @close="handleCancelAddVer">
      <el-form :model="versionInfoForm" :rules="versionInfoRules" ref="versionRuleForm" label-width="80px">
        <el-form-item label="版本号" prop="version">
          <el-input v-model="versionInfoForm.version" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="版本信息" prop="verDesc">
          <el-input v-model="versionInfoForm.verDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelAddVer">取 消</el-button>
        <el-button type="primary" @click="handleSubmitVer">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'verSetting',
  data() {
    return {
      versionInfo: [
        { version: 'V2.10.0', verInfo: '版本信息1', createTime: '2020.11.12', creator: 'DDDDanny' },
        { version: 'V2.11.0', verInfo: '版本信息2', createTime: '2020.11.13', creator: 'DDDDanny' }
      ],
      // 表格表头数据
      tableHeaderColor: { background: '#FAFAFA' },
      // 控制弹框是否显示
      versionDialogDisplay: false,
      // 版本信息Form表单
      versionInfoForm: {
        version: '',
        verDesc: ''
      },
      // 版本信息校验规则
      versionInfoRules: {
        version: [
          { required: true, message: '请输入版本号', trigger: 'blur' }
        ],
        verDesc: [
          { required: true, message: '请输入版本信息', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 删除版本
    delVersion () {
      this.$confirm('此操作将永久删除该版本, 是否继续?', '提示', {
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
    // 新增版本信息
    addVersion () {
      this.versionDialogDisplay = true
    },
    // 处理提交版本信息
    handleSubmitVer () {
      this.$refs.versionRuleForm.validate((valid) => {
        if (!valid) {
          this.$message.error('请填写必填项！')
          return
        }
        this.$message.success('新增版本号成功！')
        // 隐藏弹框
        this.versionDialogDisplay = false
        // 重置数据
        this.$refs.versionRuleForm.resetFields()
      })
    },
    // 处理取消新增
    handleCancelAddVer () {
      // 隐藏弹框
      this.versionDialogDisplay = false
      // 重置数据
      this.$refs.versionRuleForm.resetFields()
    }
  },
}
</script>

<style lang="scss" scoped>
  .button-bar {
    margin-bottom: 25px;
  }
</style>