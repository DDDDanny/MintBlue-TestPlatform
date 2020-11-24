<template>
  <d2-container>
    <el-row justify="end" type="flex" class="button-bar">
      <el-col :span="6" :gutter="12">
        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getCaseList">
            <el-button slot="append" icon="el-icon-search" @click="getCaseList"></el-button>
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
  </d2-container>
</template>

<script>
export default {
  name: 'apiTestReport',
  data() {
    return {
      queryInfo: {
        query: ''
      },
      apiReports: [
        { reportName: 'Api测试报告1', version: 'V2.10.0', successNum: '12', failNum: '5', createTime: '2020-12-01 18:00' },
        { reportName: 'Api测试报告2', version: 'V2.11.0', successNum: '50', failNum: '6', createTime: '2020-12-01 20:30' },
        { reportName: 'Api测试报告3', version: 'V2.12.0', successNum: '35', failNum: '8', createTime: '2020-12-01 23:50' }
      ],
      tableHeaderColor: { background: '#FAFAFA' }
    }
  },
  methods: {
    getCaseList () {
      console.log(123);
    }
  },
}
</script>

<style lang="scss" scoped>
  .button-bar {
    margin-bottom: 25px;
  }
</style>