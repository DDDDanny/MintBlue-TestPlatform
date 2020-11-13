<template>
  <div>
    <el-row justify="end" type="flex" class="button-bar">
      <el-col :span="3" :offset="3">
        <el-button type="primary">新增版本</el-button>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24">
        <el-table :data="versionInfo" :header-cell-style="tableHeaderColor" border>
          <el-table-column label="版本号" prop="version"></el-table-column>
          <el-table-column label="版本信息" min-width="200" prop="verInfo"></el-table-column>
          <el-table-column label="创建时间" width="150" prop="createTime"></el-table-column>
          <el-table-column label="创建人" width="150" prop="creator"></el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="">
              <el-button type="text" size="medium">编辑</el-button>
              <el-button type="text" size="medium" @click="delVersion">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'verSetting',
  data() {
    return {
      versionInfo: [
        { version: 'V2.10.0', verInfo: '版本信息1', createTime: '2020.11.12', creator: 'DDDDanny' },
        { version: 'V2.11.0', verInfo: '版本信息2', createTime: '2020.11.13', creator: 'DDDDanny' }
      ],
      // 表格表头数据
      tableHeaderColor: { background: '#FAFAFA' }
    }
  },
  methods: {
    // 删除版本
    delVersion () {
      this.$confirm('此操作将永久删除该版本, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 这里写删除项目的逻辑
        // ---
        // ---
        this.$message.success('删除成功！')
      }).catch(() => {
        this.$message.info('您已取消删除～')
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .button-bar {
    margin-bottom: 25px;
  }
</style>