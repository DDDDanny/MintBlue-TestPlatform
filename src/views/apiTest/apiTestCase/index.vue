<template>
  <d2-container>
    <el-row type="flex" class="button-bar">
      <el-col :span="8" class="switch-project">
        <span>当前项目：{{ currentPro }}</span>
        <el-button type="primary" icon="el-icon-refresh" circle size="mini" style="margin-left: 15px" @click="openSwitchProDialog"/>
      </el-col>
      <el-col :span="4" :offset="8">
        <el-button type="primary" @click="goAddCase">新增测试用例</el-button>
      </el-col>
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getCaseList">
            <el-button slot="append" icon="el-icon-search" @click="getCaseList"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24">
        <el-table style="width: 100%" :data="caseInfo" :header-cell-style="tableHeaderColor" border >
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="用例名称" width="250" prop="caseName"></el-table-column>
          <el-table-column label="用例等级" width="100" prop="caseLevel"></el-table-column>
          <el-table-column label="请求方式" width="100" prop="requestMethod"></el-table-column>
          <el-table-column label="请求URL" width="200" prop="requestUrl"></el-table-column>
          <el-table-column label="备注" width="200" prop="remark"></el-table-column>
          <el-table-column label="更新时间" min-width="100" prop="updateTime"></el-table-column>
          <el-table-column label="创建人" min-width="100" prop="creator"></el-table-column>
          <el-table-column label="操作" width="150" fixed='right'>
            <template slot-scope="">
              <el-button type="success" icon="el-icon-view" size="medium" circle/>
              <el-button type="primary" icon="el-icon-edit" size="medium" circle/>
              <el-button type="danger" icon="el-icon-delete" size="medium" circle @click="delApiCase"/>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="pagination-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"/>
    </div>
    <add-case-form :drawerVisible="tempPageVisible" @handleClose="handleClose" @handleSubmit="handleSubmit" />
    <el-dialog title="切换项目" :visible.sync="proDialogDisplay" width="20%">
      <el-form :model="proInfo" label-width="50px">
        <el-form-item label="项目">
          <el-select v-model="proInfo.proId" placeholder="请选择项目" style="width: 100%">
              <el-option v-for="item in projects" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="proDialogDisplay = false">取 消</el-button>
        <el-button type="primary" @click="handleSwitchPro">确 定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import addCaseForm from '@/views/apiTest/apiTestCase/addCaseForm'

export default {
  name: 'apiTestCase',
  components: { addCaseForm },
  data () {
    return {
      caseInfo: [
        { caseName: '用户登录成功', caseLevel: '高', requestMethod: 'POST', requestUrl: '/login', remark: '成功', updateTime: '2020-11-16', creator: 'DDDDanny' },
        { caseName: '用户登录失败（用户名错误）', caseLevel: '高', requestMethod: 'POST', requestUrl: '/login', remark: '用户名错误，登录失败', updateTime: '2020-11-16', creator: 'DDDDanny' },
        { caseName: '用户登录失败（密码错误）', caseLevel: '高', requestMethod: 'POST', requestUrl: '/login', remark: '密码错误，登录失败', updateTime: '2020-11-16', creator: 'DDDDanny' }
      ],
      // 项目集合
      projects: [
        { label: '校精灵', value: '001' },
        { label: '选课精灵', value: '002' },
        { label: '好生源', value: '003' }
      ],
      proInfo: {
        proId: ''
      },
      // 表格表头数据
      tableHeaderColor: { background: '#FAFAFA' },
      // 数据总数
      total: 0,
      // 查询条件
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 1
      },
      // TempPage 开关
      tempPageVisible: false,
      // 控制项目选择弹框显示
      proDialogDisplay: false,
      // 当前项目名称
      currentPro: ''
    }
  },
  created () {
    this.getCurrentProName()
    this.getCaseList()
  },
  methods: {
    // 获取当前项目名称
    getCurrentProName () {
      // 这里写获取项目信息的逻辑
      //
      //
      // 获取当前项目的项目名称(暂时这么取)
      this.currentPro = this.$store.state.seletedProject
    },
    // 获取用例列表信息
    getCaseList () {
      // 获取测试用例列表信息逻辑写在这
      //
      //
      this.total = this.caseInfo.length
    },
    // pageSize 改变时会触发
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getCaseList()
    },
    // currentPage 改变时会触发
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getCaseList()
    },
    // 点击新增测试用例
    goAddCase () {
      this.tempPageVisible = true
    },
    // 处理TempPage关闭事件
    handleClose () {
      this.tempPageVisible = false
    },
    // 删除用例
    delApiCase () {
      this.$confirm('此操作将永久删除该测试用例, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 这里写删除测试用例的逻辑
        // ---
        // ---
        this.$message.success('删除成功！')
      }).catch(() => {
        this.$message.info('您已取消删除～')
      })
    },
    // 提交测试用例
    handleSubmit (val) {
      console.log(val)
    },
    // 打开切换项目弹框
    openSwitchProDialog () {
      // 初始化项目下拉菜单默认选项
      this.proInfo.proId = this.$store.state.seletedProject
      // 显示弹框
      this.proDialogDisplay = true
    },
    // 处理切换项目
    handleSwitchPro () {
      // 拿到被选中的项目ID
      this.$store.state.seletedProject = this.proInfo.proId
      // 隐藏弹框
      this.proDialogDisplay = false
      // 调用获取当前选中的项目名称
      this.getCurrentProName()
    }
  }
}
</script>

<style lang="scss" scoped>
 .button-bar {
   margin-bottom: 25px;
 }
 .pagination-box {
   margin-top: 25px;
 }
 .switch-project {
  display:flex;
  // justify-content:center;/*主轴上居中*/
  align-items:center;/*侧轴上居中*/
 }
</style>
