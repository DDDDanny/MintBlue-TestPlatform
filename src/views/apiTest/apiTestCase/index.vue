<template>
  <d2-container>
    <el-row justify="end" type="flex" class="button-bar">
      <el-col :span="3" :offset="3">
        <el-button type="primary">新增测试用例</el-button>
      </el-col>
      <el-col :span="6" :gutter="12">
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
          <el-table-column label="更新时间" width="100" prop="updateTime"></el-table-column>
          <el-table-column label="创建人" width="150" prop="creator"></el-table-column>
          <el-table-column label="操作" width="150" fixed='right'>
            <template slot-scope="">
              <el-button type="text" size="medium">查看</el-button>
              <el-button type="text" size="medium">编辑</el-button>
              <el-button type="text" size="medium">删除</el-button>
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
  name: 'apiTestCase',
  data () {
    return {
      caseInfo: [
        { caseName: '用户登录成功', caseLevel: '高', requestMethod: 'POST', requestUrl: '/login', remark: '成功', updateTime: '2020-11-16', creator: 'DDDDanny' },
        { caseName: '用户登录失败（用户名错误）', caseLevel: '高', requestMethod: 'POST', requestUrl: '/login', remark: '用户名错误，登录失败', updateTime: '2020-11-16', creator: 'DDDDanny' },
        { caseName: '用户登录失败（密码错误）', caseLevel: '高', requestMethod: 'POST', requestUrl: '/login', remark: '密码错误，登录失败', updateTime: '2020-11-16', creator: 'DDDDanny' }
      ],
      // 表格表头数据
      tableHeaderColor: { background: '#FAFAFA' },
      // 数据总数
      total: 0,
      // 查询条件
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 1
      }
    }
  },
  created () {
    this.getCaseList()
  },
  methods: {
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
