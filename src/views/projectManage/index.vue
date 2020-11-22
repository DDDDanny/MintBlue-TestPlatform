<template>
  <d2-container>
    <el-row justify="end" type="flex" class="button-bar">
      <el-col :span="3" :offset="3">
        <el-button type="primary" @click="addProject">新增项目</el-button>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24">
        <el-table :data="projectInfo" border :header-cell-style="tableHeaderColor">
          <el-table-column label="项目名称" prop="proName"></el-table-column>
          <el-table-column label="项目描述" prop="proDesc"></el-table-column>
          <el-table-column label="创建时间" width="150" prop="createTime"></el-table-column>
          <el-table-column label="创建人" width="150" prop="creater"></el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="editProjectInfo(scope.row)">编辑</el-button>
              <el-button type="text" size="medium" @click="delProject">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="projectDialogDisplay" width="50%" @close="handleCloseDialog">
      <el-form :model="projectForm" :rules="projectAddRules" ref="projectAddRuleForm" label-width="80px">
        <el-form-item label="项目名称" prop="proName">
          <el-input v-model="projectForm.proName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="proDesc">
          <el-input v-model="projectForm.proDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="projectDialogDisplay = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitInfo">确 定</el-button>
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
        { proName: '项目1', proDesc: '这是个测试项目', createTime: '2020.11.11', creater: 'DDDDanny' },
        { proName: '项目2', proDesc: '这是个测试项目', createTime: '2020.11.11', creater: 'DDDDanny' },
        { proName: '项目3', proDesc: '这是个测试项目', createTime: '2020.11.11', creater: 'DDDDanny' }
      ],
      // 表格表头数据
      tableHeaderColor: { background: '#FAFAFA' },
      // 项目新增/编辑弹框
      projectDialogDisplay: false,
      // 新增项目表单
      projectForm: {
        proName: '',
        proDesc: ''
      },
      projectAddRules: {
        proName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ]
      },
      isEdit: false
    }
  },
  computed: {
    // 获取 Dialog Title
    dialogTitle: function () {
      if (this.isEdit) return '编辑项目'
      return '新增项目'
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
      this.isEdit = false
      this.projectDialogDisplay = true
      // 点击新增环境信息时，清空一次表单数据
      Object.keys(this.projectForm).forEach(key => (this.projectForm[key] = ''))
    },
    // 提交新增项目信息
    handleSubmitInfo () {
      this.$refs.projectAddRuleForm.validate((valid) => {
        if (!valid) {
          this.$message.error('请填写必填项！')
          return
        }
        if (!this.isEdit) {
          // 这里写新增项目的逻辑
          // ---
          // ---
          this.$message.success('新增项目成功！')
        } else {
          // 这里写编辑项目的逻辑
          // ---
          // ---
          this.$message.success('项目更新成功！')
        }
        // 隐藏弹框
        this.projectDialogDisplay = false
      })
    },
    // 处理弹窗关闭事件
    handleCloseDialog () {
      // 重置数据
      this.$refs.projectAddRuleForm.resetFields()
    },
    // 编辑项目信息
    editProjectInfo (proRow) {
      this.isEdit = true
      this.projectDialogDisplay = true
      console.log(proRow);
      this.projectForm.proName = proRow.proName
      this.projectForm.proDesc = proRow.proDesc
      // 获取编辑项目信息逻辑写在这
      // ---
      // ---
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-bar {
    margin-bottom: 25px;
  }
</style>