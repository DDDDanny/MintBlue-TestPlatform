<template>
  <d2-container>
    <el-row type="flex" class="button-bar">
      <el-col :span="8" class="switch-project">
        <switch-project @switchProject='switchProject' ref="switchPro" />
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
          <el-table-column label="用例等级" width="100" prop="caseLevel">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.caseLevel === 1" type="danger">高</el-tag>
              <el-tag v-if="scope.row.caseLevel === 2" type="warning">中</el-tag>
              <el-tag v-if="scope.row.caseLevel === 3" type="success">低</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="请求方式" width="100" prop="requestMethod">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.requestMethod === 1" type="warning">POST</el-tag>
              <el-tag v-if="scope.row.requestMethod === 2" type="success">GET</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="请求URL" width="200" prop="requestUrl"></el-table-column>
          <el-table-column label="备注" width="200" prop="remark"></el-table-column>
          <el-table-column label="更新时间" min-width="200" prop="updateTime"></el-table-column>
          <el-table-column label="创建人" min-width="100" prop="creator"></el-table-column>
          <el-table-column label="操作" width="150" fixed='right'>
            <template slot-scope="scope">
              <el-button type="success" icon="el-icon-view" size="medium" @click="viewApiCase(scope.row)" circle/>
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
    <view-case-info :drawer-visible="viewTempPageVisible" :case-info-detail="caseInfoDetail" @handleClose="handleViewClose"/>
  </d2-container>
</template>

<script>
import util from '@/libs/util'
import addCaseForm from '@/views/apiTest/apiTestCase/addCaseForm'
import viewCaseInfo from '@/views/apiTest/apiTestCase/viewCaseInfo'
import switchProject from '@/components/switchProject'

export default {
  name: 'apiTestCase',
  components: { addCaseForm, viewCaseInfo, switchProject },
  data () {
    return {
      caseInfo: [],
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
      // View TempPage 开关
      viewTempPageVisible: false,
      // 测试用例详情
      caseInfoDetail: {}
    }
  },
  created () {
    this.getCaseList()
  },
  mounted () {
    // 获取当前项目名称
    const projectName = JSON.parse(util.cookies.get('project')).label
    this.$refs.switchPro.currentPro = projectName
  },
  methods: {
    // 获取用例列表信息
    async getCaseList () {
      // 这里写获取任务列表的逻辑
      const proID = JSON.parse(util.cookies.get('project')).value
      const res = await this.$api.listTestCase({ proID })
      if (res.status.code !== 0) {
        this.$message.error('测试用例列表获取失败！')
        return
      }
      this.caseInfo = res.data
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
    handleSubmit (caseInfo) {
      console.log(caseInfo)
    },
    // 展示接口测试用例详情
    viewApiCase (row) {
      // 获取case info detail
      this.caseInfoDetail = row
      this.viewTempPageVisible = true
    },
    // 处理查看数据临时页的关闭事件
    handleViewClose () {
      this.viewTempPageVisible = false
    },
    // 切换项目后，刷新列表
    switchProject () {
      this.getCaseList()
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
