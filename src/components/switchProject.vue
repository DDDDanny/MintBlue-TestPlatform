<template>
  <div>
    <span>当前项目：{{ currentPro }}</span>
    <el-button type="primary" icon="el-icon-menu" circle size="mini" style="margin-left: 15px" @click="openSwitchProDialog"/>
    <el-dialog title="切换项目" :visible.sync="proDialogDisplay" width="20%">
      <el-form :model="selectedProInfo" label-width="50px">
        <el-form-item label="项目">
          <el-select v-model="selectedProInfo" placeholder="请选择项目" style="width: 100%">
            <el-option v-for="item in projects" :key="item.value" :label="item.label" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="proDialogDisplay = false">取 消</el-button>
        <el-button type="primary" @click="handleSwitchPro">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import util from '@/libs/util'

export default {
  name: 'switchProject',
  data () {
    return {
      // 当前项目名称
      currentPro: '',
      // 控制是否显示Dialog
      proDialogDisplay: false,
      // 项目信息
      projects: [],
      // 被选中的项目信息
      selectedProInfo: {}
    }
  },
  methods: {
    // 获取当前项目名称
    getCurrentProName () {
      const cookiesPro = util.cookies.get('project')
      this.currentPro = JSON.parse(cookiesPro).label
    },
    // 打开切换项目Dialog
    async openSwitchProDialog () {
      const data = await this.$api.listPro()
      if (data.status.code !== 0) {
        this.$message.error('获取项目列表失败！')
        return
      }
      const res = data.data
      // 清空数组
      this.projects.length = 0
      // 构造选择项目List
      for (let i = 0; i < res.length; i++) {
        const item = { label: res[i].projectName, value: res[i].projectID }
        this.projects.push(item)
      }
      // 初始化项目下拉菜单默认选项
      this.selectedProInfo = JSON.parse(util.cookies.get('project'))
      // 打开切换项目Dialog
      this.proDialogDisplay = true
    },
    // 处理切换项目
    handleSwitchPro () {
      // 缺少异常的判断
      //
      //
      // 拿到被选中的项目ID
      util.cookies.set('project', this.selectedProInfo)
      // 设置Cookies
      this.$emit('switchProject')
      // 隐藏弹框
      this.proDialogDisplay = false
      // 提示信息
      this.$message.success('切换项目成功！')
      // 调用获取当前选中的项目名称
      this.getCurrentProName()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
