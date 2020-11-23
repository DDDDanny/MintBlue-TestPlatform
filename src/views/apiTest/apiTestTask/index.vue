<template>
  <d2-container>
    <el-row justify="end" type="flex" class="button-bar">
      <el-col :span="3" :offset="3">
        <el-button type="primary">新增任务</el-button>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24">
        <el-table :data="caseTaskInfo" :header-cell-style="tableHeaderColor" border>
          <el-table-column label="任务名称" width="200" prop="taskName"></el-table-column>
          <el-table-column label="任务开始时间" width="200" prop="startTime"></el-table-column>
          <el-table-column label="任务结束时间" width="200" prop="endTime"></el-table-column>
          <el-table-column label="测试集" width="100" prop="caseSuite"></el-table-column>
          <el-table-column label="版本号" width="100" prop="version"></el-table-column>
          <el-table-column label="任务状态" width="100" prop="taskStatus"></el-table-column>
          <el-table-column label="创建时间" width="150" prop="createTime"></el-table-column>
          <el-table-column label="创建人" width="150" prop="creator"></el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="">
              <el-button type="text" size="medium" >查看</el-button>
              <el-button type="text" size="medium" >编辑</el-button>
              <el-button type="text" size="medium" @click="delTestTask" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
export default {
  name: 'apiTestTask',
  data () {
    return {
      caseTaskInfo: [
        { taskName: 'Api测试任务1', startTime: '2020.11.20 15:00', endTime: '2020.11.20 15:30', caseSuite: '测试集1', version: 'V2.10.0', taskStatus: '已完成', createTime: '2020.11.20 15:00', creator: 'DDDDanny' },
        { taskName: 'Api测试任务2', startTime: '2020.11.20 15:00', endTime: '-', caseSuite: '测试集2', version: 'V2.10.0', taskStatus: '进行中', createTime: '2020.11.20 15:00', creator: 'DDDDanny' },
        { taskName: 'Api测试任务3', startTime: '2020.11.20 15:00', endTime: '-', caseSuite: '测试集3', version: 'V2.10.0', taskStatus: '未开始', createTime: '2020.11.20 15:00', creator: 'DDDDanny' }
      ],
      // 控制表头颜色
      tableHeaderColor: { background: '#FAFAFA' }
    }
  },
  methods: {
    // 删除测试任务
    delTestTask () {
      this.$confirm('此操作将永久删除该测试任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 这里写删除测试集的逻辑
        // ---
        // ---
        this.$message.success('删除成功！')
      }).catch(() => {
        this.$message.info('您已取消删除～')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-bar {
    margin-bottom: 25px;
  }
</style>
