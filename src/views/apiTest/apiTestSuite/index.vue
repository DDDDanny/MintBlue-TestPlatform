<template>
  <d2-container>
    <el-row justify="end" type="flex" class="button-bar">
      <el-col :span="3" :offset="3">
        <el-button type="primary" @click="addTestSuite">新增测试集</el-button>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24">
        <el-table :data="caseSuiteInfo" :header-cell-style="tableHeaderColor" border>
          <el-table-column label="用例集名称" prop="suiteName"></el-table-column>
          <el-table-column label="备注" min-width="100" prop="suiteDesc"></el-table-column>
          <el-table-column label="更新时间" width="150" prop="updateTime"></el-table-column>
          <el-table-column label="创建人" width="150" prop="creator"></el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="success" icon="el-icon-view" size="medium" circle/>
              <el-button type="primary" icon="el-icon-edit" size="medium" circle @click="editSuite(scope.row)"/>
              <el-button type="danger" icon="el-icon-delete" size="medium" circle @click="delSuite"/>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogDisplay" width="55%" @close="handleCloseDialog">
      <el-form :model="testSuiteForm" :rules="testSuiteAddRules" ref="testSuiteFormRef" label-width="100px">
        <el-form-item label="测试集名称" prop="suiteName">
          <el-input v-model="testSuiteForm.suiteName" autocomplete="off" placeholder="请输入测试集名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="suiteDesc">
          <el-input v-model="testSuiteForm.suiteDesc" autocomplete="off" placeholder="请输入备注" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-transfer v-model="selectData" :data="waitData" :titles="transferTitles"></el-transfer>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDisplay = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitInfo">确 定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
export default {
  name: 'apiTestSuite',
  data () {
    return {
      caseSuiteInfo: [
        { suiteName: 'Api测试集1', suiteDesc: '测试集备注信息1', updateTime: '2020.11.12', creator: 'DDDDanny' },
        { suiteName: 'Api测试集2', suiteDesc: '测试集备注信息1', updateTime: '2020.11.13', creator: 'DDDDanny' }
      ],
      // 穿梭框标题
      transferTitles: ["待选用例", "已选用例"],
      // 待选数据
      waitData: [
        {key: '001', label: '测试用例1'},
        {key: '002', label: '测试用例2'},
        {key: '003', label: '测试用例3'},
      ],
      // 已选择的数据
      selectData: [],
      // 表格表头数据
      tableHeaderColor: { background: '#FAFAFA' },
      // 是否是编辑信息
      isEdit: false,
      // 控制弹框是否显示
      dialogDisplay: false,
      // 新增测试集表单
      testSuiteForm: {
        suiteName: '',
        suiteDesc: ''
      },
      // 测试集合规则
      testSuiteAddRules: {
        suiteName: [
          { required: true, message: '请输入测试集名称', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // 获取 Dialog Title
    dialogTitle: function () {
      if (this.isEdit) return '编辑测试集'
      return '新增测试集'
    }
  },
  methods: {
    // 删除测试集
    delSuite () {
      this.$confirm('此操作将永久删除该测试集, 是否继续?', '提示', {
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
    },
    // 新增测试集
    addTestSuite () {
      this.isEdit = false
      this.dialogDisplay = true
      // 点击新增测试集时，清空一次表单数据
      Object.keys(this.testSuiteForm).forEach(key => (this.testSuiteForm[key] = ''))
    },
    // 提交新增项目信息
    handleSubmitInfo () {
      this.$refs.testSuiteFormRef.validate((valid) => {
        if (!valid) {
          this.$message.error('请填写必填项！')
          return
        }
        if (!this.isEdit) {
          // 这里写新增项目的逻辑
          // ---
          // ---
          console.log(this.selectData);
          this.$message.success('新增测试集成功！')
        } else {
          // 这里写编辑项目的逻辑
          // ---
          // ---
          this.$message.success('测试集更新成功！')
        }
        // 隐藏弹框
        this.dialogDisplay = false
      })
    },
    // 处理弹窗关闭事件
    handleCloseDialog () {
      // 重置数据
      this.$refs.testSuiteFormRef.resetFields()
    },
    // 编辑测试集
    editSuite (proRow) {
      this.isEdit = true
      this.dialogDisplay = true
      // console.log(proRow)
      this.testSuiteForm.suiteName = proRow.suiteName
      this.testSuiteForm.suiteDesc = proRow.suiteDesc
      // 获取编辑项目信息逻辑写在这
      // ---
      // ---
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-bar {
    margin-bottom: 25px;
  }
</style>
