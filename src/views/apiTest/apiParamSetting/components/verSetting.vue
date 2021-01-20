<template>
  <div>
    <el-row justify="end" type="flex" class="button-bar">
      <el-col :span="8" class="switch-project">
        <switch-project @switchProject='switchProject' ref="switchPro" />
      </el-col>
      <el-col :span="4" :offset="12">
        <el-button type="primary" @click="addVersion">新增版本</el-button>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24">
        <el-table :data="versionInfo" :header-cell-style="tableHeaderColor" border>
          <el-table-column label="版本号" prop="version"></el-table-column>
          <el-table-column label="版本信息" min-width="200" prop="remark"></el-table-column>
          <el-table-column label="创建时间" width="200" prop="createTime"></el-table-column>
          <el-table-column label="创建人" width="150" prop="creator"></el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="editVersion(scope.row)">编辑</el-button>
              <el-button type="text" size="medium" @click="delVersion(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="versionDialogDisplay" width="50%" @close="handleCloseDialog">
      <el-form :model="versionInfoForm" :rules="versionInfoRules" ref="versionRuleForm" label-width="80px">
        <el-form-item label="版本号" prop="version">
          <el-input v-model="versionInfoForm.version" autocomplete="off" placeholder="请输入版本号" clearable></el-input>
        </el-form-item>
        <el-form-item label="版本信息" prop="remark">
          <el-input v-model="versionInfoForm.remark" autocomplete="off" placeholder="请输入版本信息" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="versionDialogDisplay = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitVer">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import util from '@/libs/util'
import switchProject from '@/components/switchProject'

export default {
  name: 'verSetting',
  components: { switchProject },
  props: {
    // 改变Tab标示
    changeTabFlag: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      versionInfo: [],
      // 表格表头数据
      tableHeaderColor: { background: '#FAFAFA' },
      // 控制弹框是否显示
      versionDialogDisplay: false,
      // 版本信息Form表单
      versionInfoForm: {
        version: '',
        remark: ''
      },
      // 版本信息校验规则
      versionInfoRules: {
        version: [{ required: true, message: '请输入版本号', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入版本信息', trigger: 'blur' }]
      },
      // 判断是否为编辑
      isEdit: false
    }
  },
  computed: {
    // 获取 Dialog Title
    dialogTitle: function () {
      if (this.isEdit) return '编辑版本号'
      return '新增版本号'
    }
  },
  created () {
    // 获取版本信息列表
    this.getVersionList()
  },
  watch: {
    // 监听Tab是否变化
    changeTabFlag () {
      this.getCurrentProjectName()
    }
  },
  mounted () {
    // 获取当前项目名称
    this.getCurrentProjectName()
  },
  methods: {
    // 获取当前项目名称
    getCurrentProjectName () {
      const projectName = JSON.parse(util.cookies.get('project')).label
      this.$refs.switchPro.currentPro = projectName
    },
    // 获取版本号列表
    async getVersionList () {
      const res = await this.$api.listVersion()
      if (res.status.code !== 0) {
        this.$message.error('获取版本号列表失败')
        return
      }
      this.versionInfo = res.data
    },
    // 删除版本
    delVersion (verRow) {
      this.$confirm('此操作将永久删除该版本, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 这里写删除项目的逻辑
        this.versionInfoForm.isDel = 1
        this.versionInfoForm.versionID = verRow.verID
        const res = await this.$api.editVersion(this.versionInfoForm)
        if (res.status.code !== 0) {
          this.$message.error('删除失败！')
          return
        }
        this.$message.success('删除成功！')
        this.getVersionList()
      }).catch(() => {
        this.$message.info('您已取消删除～')
      })
    },
    // 新增版本信息
    addVersion () {
      this.isEdit = false
      this.versionDialogDisplay = true
      // 点击新增环境信息时，清空一次表单数据
      Object.keys(this.versionInfoForm).forEach(key => (this.versionInfoForm[key] = ''))
    },
    // 处理提交版本信息
    handleSubmitVer () {
      this.$refs.versionRuleForm.validate(async (valid) => {
        if (!valid) {
          this.$message.error('请填写必填项！')
          return
        }
        if (!this.isEdit) {
          // 获取Project ID
          const proInfo = util.cookies.get('project')
          if (proInfo === 'NULL') {
            this.$message.error('没有可用的项目，请添加项目后重试')
            return
          }
          this.versionInfoForm.projectID = JSON.parse(proInfo).value
          // 新增版本号逻辑写在这
          const res = await this.$api.addVersion(this.versionInfoForm)
          if (res.status.code !== 0) {
            this.$message.error('新增版本号失败！')
            return
          }
          this.$message.success('新增版本号成功！')
        } else {
          // 编辑版本号逻辑写在这
          const res = await this.$api.editVersion(this.versionInfoForm)
          if (res.status.code !== 0) {
            this.$message.error('更新版本号失败！')
            return
          }
          this.$message.success('更新版本号成功！')
        }
        // 刷新列表
        this.getVersionList()
        // 隐藏弹框
        this.versionDialogDisplay = false
      })
    },
    // 处理弹框关闭事件
    handleCloseDialog () {
      // 重置数据
      this.$refs.versionRuleForm.resetFields()
    },
    // 编辑版本号
    editVersion (verRow) {
      this.isEdit = true
      this.versionDialogDisplay = true
      // 构建编辑信息
      this.versionInfoForm.version = verRow.version
      this.versionInfoForm.remark = verRow.remark
      this.versionInfoForm.versionID = verRow.verID
      this.versionInfoForm.isDel = 0
    },
    // 切换项目
    switchProject () {
      this.getVersionList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-bar {
    margin-bottom: 25px;
  }
  .switch-project {
    display:flex;
    // justify-content:center;/*主轴上居中*/
    align-items:center;/*侧轴上居中*/
  }
</style>
