<template>
  <d2-container>
    <el-row justify="end" type="flex" class="button-bar">
      <el-col :span="3" :offset="3">
        <el-button type="primary">新增测试集</el-button>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24">
        <el-table :data="caseSuiteInfo" :header-cell-style="tableHeaderColor" border>
          <el-table-column label="用例集名称" prop="suiteName"></el-table-column>
          <el-table-column label="备注" min-width="100" prop="remark"></el-table-column>
          <el-table-column label="更新时间" width="150" prop="updateTime"></el-table-column>
          <el-table-column label="创建人" width="150" prop="creator"></el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="">
              <el-button type="text" size="medium" >查看</el-button>
              <el-button type="text" size="medium" >编辑</el-button>
              <el-button type="text" size="medium" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
export default {
  name: 'apiTestSuite',
  data () {
    return {
      caseSuiteInfo: [
        { suiteName: 'Api测试集1', remark: '测试集备注信息1', updateTime: '2020.11.12', creator: 'DDDDanny' },
        { suiteName: 'Api测试集2', remark: '测试集备注信息1', updateTime: '2020.11.13', creator: 'DDDDanny' }
      ],
      // 表格表头数据
      tableHeaderColor: { background: '#FAFAFA' }
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-bar {
    margin-bottom: 25px;
  }
</style>
