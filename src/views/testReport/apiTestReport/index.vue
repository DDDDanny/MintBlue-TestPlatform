<template>
  <d2-container>
    <el-row justify="end" type="flex" class="button-bar">
      <el-col :span="6" :gutter="12">
        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getReportList">
            <el-button slot="append" icon="el-icon-search" @click="getReportList"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24">
        <el-table style="width: 100%" :data="apiReports" :header-cell-style="tableHeaderColor" border >
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="报告名称" width="250" prop="reportName"></el-table-column>
          <el-table-column label="版本号" min-width="100" prop="version"></el-table-column>
          <el-table-column label="成功数量" min-width="50" >
            <template slot-scope="scope">
              <el-tag type="success">{{ scope.row.successNum }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="失败数量" min-width="50">
            <template slot-scope="scope">
              <el-tag type="danger">{{ scope.row.failNum }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="生成时间" min-width="150" prop="createTime"></el-table-column>
          <el-table-column label="操作" width="60" fixed='right'>
            <template slot-scope="">
              <el-button type="text" size="medium">查看</el-button>
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
  </d2-container>
</template>

<script>
export default {
  name: 'apiTestReport',
  data () {
    return {
      // 查询条件
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 1
      },
      // 数据总数
      total: 0,
      // 测试报告列表数据
      apiReports: [],
      // 控制表头颜色
      tableHeaderColor: { background: '#FAFAFA' }
    }
  },
  created () {
    this.getReportList()
  },
  methods: {
    // 获取报告列表数据
    async getReportList () {
      const res = await this.$api.listApiTestReport()
      if (res.status.code !== 0) {
        this.$message.error('获取测试报告列表失败！')
        return
      }
      this.apiReports = res.data
      this.total = this.apiReports.length
    },
    // pageSize 改变时会触发
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getReportList()
    },
    // currentPage 改变时会触发
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getReportList()
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
</style>
