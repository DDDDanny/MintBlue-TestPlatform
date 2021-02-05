<template>
  <d2-container>
    <el-row justify="end" type="flex" class="button-bar">
      <el-col :span="8" class="switch-project">
        <switch-project @switchProject='switchProject' ref="switchPro" />
      </el-col>
      <el-col :span="4" :offset="12">
        <el-button type="primary" @click="addTestTask">新增测试任务</el-button>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24">
        <el-table :data="caseTaskInfo" :header-cell-style="tableHeaderColor" border>
          <el-table-column label="任务名称" width="200" prop="taskName"></el-table-column>
          <el-table-column label="测试集" width="200" prop="caseSuite"></el-table-column>
          <el-table-column label="版本号" width="100" prop="version"></el-table-column>
          <el-table-column label="任务开始时间" width="200" prop="startTime"></el-table-column>
          <el-table-column label="任务结束时间" width="200" prop="endTime"></el-table-column>
          <el-table-column label="任务状态" width="100" prop="taskStatus"></el-table-column>
          <el-table-column label="创建时间" width="200" prop="createTime"></el-table-column>
          <el-table-column label="创建人" min-width="100" prop="creator"></el-table-column>
          <el-table-column label="操作" width="250" fixed="right">
            <template slot-scope="scope">
              <el-button type="success" icon="el-icon-view" size="medium" circle></el-button>
              <el-button type="primary" icon="el-icon-edit" size="medium" circle></el-button>
              <el-button type="info" icon="el-icon-switch-button" size="medium" circle></el-button>
              <el-button type="warning" icon="el-icon-caret-right" size="medium" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" size="medium" circle @click="delTestTask(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="新增测试任务" :visible.sync="dialogDisplay" width="50%" @close="handleCloseDialog" :close-on-click-modal='false'>
      <el-form :model="testTaskForm" :rules="testTaskRules" ref="testTaskFormRef" label-width="80px">
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="testTaskForm.taskName" autocomplete="off" placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item label="测试集" prop="suiteID">
          <el-select v-model="testTaskForm.suiteID" placeholder="请选择测试集" class="selector-base">
            <el-option v-for="(item, index) in testSuites" :key="index" :label="item.suiteName" :value="item.suiteID"/>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号" prop="verID">
          <el-select v-model="testTaskForm.verID" placeholder="请选择版本号" class="selector-base">
            <el-option v-for="(item, index) in versions" :key="index" :label="item.version" :value="item.verID"/>
          </el-select>
        </el-form-item>
        <el-form-item label="执行环境" prop="envID">
          <el-select v-model="testTaskForm.envID" placeholder="请选择执行环境" class="selector-base">
            <el-option v-for="(item, index) in envs" :key="index" :label="item.envName" :value="item.envID"/>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker v-model="testTaskForm.startTime" type="datetime" placeholder="选择任务开始时间" default-time="12:00:00" class="selector-base" value-format="timestamp"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDisplay = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import util from '@/libs/util'
import switchProject from '@/components/switchProject'

export default {
  name: 'apiTestTask',
  components: { switchProject },
  data () {
    return {
      // 表格数据信息
      caseTaskInfo: [],
      // 控制表头颜色
      tableHeaderColor: { background: '#FAFAFA' },
      // 测试任务表单
      testTaskForm: {},
      // 是否是编辑信息
      isEdit: false,
      // 控制弹框是否显示
      dialogDisplay: false,
      // Form验证项
      testTaskRules: {
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        suiteID: [
          { required: true, message: '请选择测试集', trigger: 'change' }
        ],
        verID: [
          { required: true, message: '请选择版本号', trigger: 'change' }
        ],
        envID: [
          { required: true, message: '请选择执行环境', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: '请选择任务开始时间', trigger: 'blur' }
        ]
      },
      // 测试集合
      testSuites: [],
      // 版本号集合
      versions: [],
      // 执行环境集合
      envs: []
    }
  },
  created () {
    this.getTaskList()
  },
  mounted () {
    // 获取当前项目名称
    const projectName = JSON.parse(util.cookies.get('project')).label
    this.$refs.switchPro.currentPro = projectName
  },
  methods: {
    // 获取测试任务列表
    async getTaskList () {
      // 这里写获取任务列表的逻辑
      const proID = JSON.parse(util.cookies.get('project')).value
      const res = await this.$api.listTask({ proID })
      if (res.status.code !== 0) {
        this.$message.error('任务列表获取失败！')
        return
      }
      this.caseTaskInfo = res.data
    },
    // 删除测试任务
    delTestTask (taskRow) {
      this.$confirm('此操作将永久删除该测试任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$api.delTask({ taskID: taskRow.taskID })
        if (res.status.code !== 0) {
          this.$message.error('删除测试任务失败！')
          return
        }
        // 刷新任务列表
        this.getTaskList()
        this.$message.success('删除成功！')
      }).catch(() => {
        this.$message.info('您已取消删除～')
      })
    },
    // 新增测试任务
    async addTestTask () {
      this.isEdit = false
      this.dialogDisplay = true
      // 点击新增测试集时，清空一次表单数据
      // Object.keys(this.testTaskForm).forEach(key => (this.testTaskForm[key] = ''))
      // 获取测试集下拉菜单数据
      const proID = JSON.parse(util.cookies.get('project')).value
      const suiteInfo = await this.$api.listTestSuite({ proID })
      this.testSuites = suiteInfo.data
      // 获取版本号下拉菜单数据
      const versionInfo = await this.$api.listVersion({ proID })
      this.versions = versionInfo.data
      // 获取执行环境下拉菜单数据
      const envInfo = await this.$api.listEnv({ proID })
      this.envs = envInfo.data
    },
    // 处理弹窗关闭事件
    handleCloseDialog () {
      // 重置数据
      this.$refs.testTaskFormRef.resetFields()
    },
    // 处理提交逻辑
    handleSubmit () {
      this.$refs.testTaskFormRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error('请填写所有必填项')
          return
        }
        const proID = JSON.parse(util.cookies.get('project')).value
        this.testTaskForm.proID = proID
        const res = await this.$api.addTask(this.testTaskForm)
        if (res.status.code !== 0) {
          this.$message.error('获取测试任务列表失败！')
          return
        }
        // 刷新任务列表
        this.getTaskList()
        this.dialogDisplay = false
        this.$message.success('新增测试任务成功！')
      })
    },
    // 切换项目
    switchProject () {
      this.getTaskList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-bar {
    margin-bottom: 25px;
  }
  .selector-base {
    width: 100%
  }
  .switch-project {
    display:flex;
    // justify-content:center;/*主轴上居中*/
    align-items:center;/*侧轴上居中*/
  }
</style>
