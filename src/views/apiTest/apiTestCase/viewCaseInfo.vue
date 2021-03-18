<template>
  <temp-page :drawer-visible="drawerVisible" :temp-page-title="tempPageTitle" @handleClose="handleClose">
    <el-form label-width="100px" class="temp-page">
      <el-form-item label="用例名称：" class="detail-form-item">
        <span>{{ caseInfoDetail.caseName }}</span>
      </el-form-item>
      <el-form-item label="用例等级：" class="detail-form-item">
        <span>{{ caseInfoDetail.caseLevel }}</span>
      </el-form-item>
      <el-form-item label="请求方式：" class="detail-form-item">
        <span>{{ caseInfoDetail.requestMethod }}</span>
      </el-form-item>
      <el-form-item label="请求URL：" class="detail-form-item">
        <span>{{ caseInfoDetail.requestUrl }}</span>
      </el-form-item>
      <el-form-item label="请求头：" class="detail-form-item">
        <span>{{ caseInfoDetail.requestHeader }}</span>
      </el-form-item>
      <el-form-item label="请求内容：" class="detail-form-item">
        <span>{{ caseInfoDetail.requestBody }}</span>
      </el-form-item>
      <el-form-item label="断言条件：" class="detail-form-item">
        <span>{{ caseInfoDetail.assert }}</span>
      </el-form-item>
      <el-form-item label="获取参数：" class="detail-form-item">
        <span>{{ caseInfoDetail.forward }}</span>
      </el-form-item>
      <el-form-item label="备注信息：" class="detail-form-item">
        <span>{{ caseInfoDetail.remark }}</span>
      </el-form-item>
    </el-form>
  </temp-page>
</template>
<script>
import tempPage from '@/components/tempPage'

export default {
  name: 'viewCaseInfo',
  components: { tempPage },
  props: {
    drawerVisible: {
      type: Boolean,
      default: false
    },
    caseInfoDetail: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      tempPageTitle: '用例详情'
    }
  },
  methods: {
    // 处理关闭事件
    handleClose () {
      this.$emit('handleClose')
    }
  }
}
</script>
<style lang="scss" scoped>
  .temp-page {
    overflow: scroll;
  }
  .detail-form-item {
    margin-right: 20px
  }
</style>
