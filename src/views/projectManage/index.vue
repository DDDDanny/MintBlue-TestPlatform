<template>
  <d2-container>
    <el-row justify="end" type="flex" class="button-bar">
      <el-col :span="2">
        <el-button type="primary">新建项目</el-button>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24">
        <el-table :data="projectInfo" border :header-cell-style="tableHeaderColor">
          <el-table-column label="项目名称" prop="projectName"></el-table-column>
          <el-table-column label="项目描述" prop="projectDesc"></el-table-column>
          <el-table-column label="创建时间" width="150" prop="createTime"></el-table-column>
          <el-table-column label="创建人" width="150" prop="creater"></el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="">
              <el-button type="text" size="medium">编辑</el-button>
              <el-button type="text" size="medium">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
export default {
  name: 'projectManage',
  data() {
    return {
      // 项目数据
      projectInfo: [
        { projectName: '项目1', projectDesc: '这是个测试项目', createTime: '2020.11.11', creater: 'DDDDanny' },
        { projectName: '项目2', projectDesc: '这是个测试项目', createTime: '2020.11.11', creater: 'DDDDanny' },
        { projectName: '项目3', projectDesc: '这是个测试项目', createTime: '2020.11.11', creater: 'DDDDanny' },
      ],
      // 表格表头数据
      tableHeaderColor: {background:'#FAFAFA'}
    }
  }
}
</script>
<style lang="scss" scoped>
  .button-bar {
    margin-bottom: 25px;
  }
</style>
