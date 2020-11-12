<template>
  <d2-container>
    <el-row justify="end" type="flex" class="button-bar">
      <el-col :span="2">
        <el-button type="primary" @click="addProject">新增项目</el-button>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24">
        <el-table :data="projectInfo" border :header-cell-style="tableHeaderColor">
          <el-table-column label="项目名称" prop="projectName"></el-table-column>
          <el-table-column label="项目描述" prop="projectDesc"></el-table-column>
          <el-table-column label="创建时间" width="150" prop="createTime"></el-table-column>
          <el-table-column label="创建人" width="150" prop="creater"></el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="">
              <el-button type="text" size="medium">编辑</el-button>
              <el-button type="text" size="medium" @click="delProject">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="新增项目" :visible.sync="projectDialogDisplay" width="50%" @close="cancelAddProject">
      <el-form :model="projectAddForm" :rules="projectAddRules" ref="projectAddRuleForm">
        <el-form-item label="项目名称" prop="proName">
          <el-input v-model="projectAddForm.proName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="proDesc">
          <el-input v-model="projectAddForm.proDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddProject">取 消</el-button>
        <el-button type="primary" @click="submitAddProject">确 定</el-button>
      </span>
      </el-dialog>
  </d2-container>
</template>

<script>
export default {
  name: 'projectManage',
  data () {
    return {
      // 项目数据
      projectInfo: [
        { projectName: '项目1', projectDesc: '这是个测试项目', createTime: '2020.11.11', creater: 'DDDDanny' },
        { projectName: '项目2', projectDesc: '这是个测试项目', createTime: '2020.11.11', creater: 'DDDDanny' },
        { projectName: '项目3', projectDesc: '这是个测试项目', createTime: '2020.11.11', creater: 'DDDDanny' }
      ],
      // 表格表头数据
      tableHeaderColor: { background: '#FAFAFA' },
      // 项目新增/编辑弹框
      projectDialogDisplay: false,
      // 新增项目表单
      projectAddForm: {
        proName: '',
        proDesc: ''
      },
      projectAddRules: {
        proName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 删除项目
    delProject () {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
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
    // 新增项目
    addProject () {
      this.projectDialogDisplay = true
    },
    // 提交新增项目信息
    submitAddProject () {
      this.$refs.projectAddRuleForm.validate((valid) => {
        if (!valid) {
          this.$message.error('请填写必填项！')
          return
        }
        // 这里写新增项目的逻辑
        // ---
        // ---
        this.$message.success('新增项目成功！')
        // 隐藏弹框
        this.projectDialogDisplay = false
        // 重置数据
        this.$refs.projectAddRuleForm.resetFields()
      })
    },
    // 取消添加项目
    cancelAddProject () {
      // 重置数据
      this.$refs.projectAddRuleForm.resetFields()
      // 隐藏弹框
      this.projectDialogDisplay = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .button-bar {
    margin-bottom: 25px;
  }
</style>