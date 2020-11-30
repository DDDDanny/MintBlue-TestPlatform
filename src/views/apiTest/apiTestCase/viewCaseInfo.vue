<template>
  <temp-page :drawer-visible="drawerVisible" :temp-page-title="tempPageTitle" @handleClose="handleClose">
    <el-form label-width="100px" >
      <el-form-item v-for="(item, index) in caseInfoDetail" :key="index" :label="item.title" class="detail-form-item">
        <el-input v-if="item.title !== '请求内容'" v-model="item.value" disabled></el-input>
        <el-input v-else type="textarea" v-model="item.value" disabled></el-input>
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
    }
  },
  data () {
    return {
      tempPageTitle: '用例详情',
      caseInfoDetail: [
        { title: '用例名称', value: 'Api测试用例' },
        { title: '用例等级', value: '高' },
        { title: '请求方式', value: 'POST' },
        { title: '请求URL', value: 'WWW.baidu.com' },
        { title: '请求头', value: '{Header: xml/json}' },
        { title: '请求内容', value: '132' },
        { title: '断言条件', value: 'status.msg == 登录成功' },
        { title: '获取参数', value: 'Msg = status.msg' },
        { title: '备注信息', value: 'Api测试用例详情' }
      ]
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
  .detail-form-item {
    margin-right: 20px
  }
</style>
