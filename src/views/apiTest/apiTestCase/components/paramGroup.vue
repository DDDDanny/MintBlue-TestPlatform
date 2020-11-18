<template>
  <el-form :model="paramInfo" :rules="paramInfoRules">
    <el-row>
      <el-col :span="11">
        <el-form-item label="" prop="paramKey">
          <el-input v-model="paramInfo.paramKey" placeholder="输入参数Key"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="" prop="paramValue">
          <el-input v-model="paramInfo.paramValue" placeholder="输入参数Val"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  name: 'paramGroup',
  props: {
    paramInfo: {
      type: Object,
      default: () => ({})
    }
  },
  model: {
    prop: 'paramInfo'
  },
  data () {
    return {
      paramInfoRules: {
        paramKey: [
          { required: true, message: '请输入参数Key', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
