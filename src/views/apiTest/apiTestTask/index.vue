<template>
  <d2-container>
    <el-row justify="end" type="flex" class="button-bar">
      <el-col :span="3" :offset="3">
        <el-button type="primary" @click="addTestTask">新增任务</el-button>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24">
        <el-table :data="caseTaskInfo" :header-cell-style="tableHeaderColor" border>
          <el-table-column label="任务名称" width="200" prop="taskName"></el-table-column>
          <el-table-column label="任务开始时间" width="200" prop="startTime"></el-table-column>
          <el-table-column label="任务结束时间" width="200" prop="endTime"></el-table-column>
          <el-table-column label="测试集" width="100" prop="caseSuite"></el-table-column>
          <el-table-column label="版本号" width="100" prop="version"></el-table-column>
          <el-table-column label="任务状态" width="100" prop="taskStatus"></el-table-column>
          <el-table-column label="创建时间" width="150" prop="createTime"></el-table-column>
          <el-table-column label="创建人" width="150" prop="creator"></el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="">
              <el-button type="text" size="medium" >查看</el-button>
              <el-button type="text" size="medium" >编辑</el-button>
              <el-button type="text" size="medium" @click="delTestTask" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="新增测试任务" :visible.sync="dialogDisplay" width="50%" @close="handleCloseDialog">
      <el-form :model="testTaskForm" :rules="testTaskRules" ref="testTaskFormRef" label-width="100px">
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="testTaskForm.taskName" autocomplete="off" placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item label="测试集" prop="testSuite">
          <el-input v-model="testTaskForm.testSuite" autocomplete="off" placeholder="请选择测试集"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input v-model="testTaskForm.version" autocomplete="off" placeholder="请选择版本号"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-input v-model="testTaskForm.startTime" autocomplete="off" placeholder="请选择开始时间"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDisplay = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
export default {
  name: 'apiTestTask',
  data () {
    return {
      caseTaskInfo: [
        { taskName: 'Api测试任务1', startTime: '2020.11.20 15:00', endTime: '2020.11.20 15:30', caseSuite: '测试集1', version: 'V2.10.0', taskStatus: '已完成', createTime: '2020.11.20 15:00', creator: 'DDDDanny' },
        { taskName: 'Api测试任务2', startTime: '2020.11.20 15:00', endTime: '-', caseSuite: '测试集2', version: 'V2.10.0', taskStatus: '进行中', createTime: '2020.11.20 15:00', creator: 'DDDDanny' },
        { taskName: 'Api测试任务3', startTime: '2020.11.20 15:00', endTime: '-', caseSuite: '测试集3', version: 'V2.10.0', taskStatus: '未开始', createTime: '2020.11.20 15:00', creator: 'DDDDanny' }
      ],
      // 控制表头颜色
      tableHeaderColor: { background: '#FAFAFA' },
      // 测试任务表单
      testTaskForm: {},
      // 是否是编辑信息
      isEdit: false,
      // 控制弹框是否显示
      dialogDisplay: false,
      testTaskRules: {
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        testSuite: [
          { required: true, message: '请选择测试集', trigger: 'blur' }
        ],
        version: [
          { required: true, message: '请选择版本号', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择任务开始时间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 删除测试任务
    delTestTask () {
      this.$confirm('此操作将永久删除该测试任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 这里写删除测试集的逻辑
        // ---
        // ---
        this.$message.success('删除成功！')
      }).catch(() => {
        this.$message.info('您已取消删除～')
      })
    },
    // 新增测试任务
    addTestTask () {
      this.isEdit = false
      this.dialogDisplay = true
      // 点击新增测试集时，清空一次表单数据
      // Object.keys(this.testTaskForm).forEach(key => (this.testTaskForm[key] = ''))
    },
    // 处理弹窗关闭事件
    handleCloseDialog () {
      // 重置数据
      this.$refs.testTaskFormRef.resetFields()
    },
  }
}
</script>

<style lang="scss" scoped>
  .button-bar {
    margin-bottom: 25px;
  }
</style>
