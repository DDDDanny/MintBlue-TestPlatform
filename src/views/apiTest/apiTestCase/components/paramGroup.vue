<template>
  <el-form :model="paramInfo">
    <el-row>
      <el-col :span="11">
        <el-form-item label="">
          <el-input v-model="paramInfo.paramKey" placeholder="输入参数Key"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-form-item label="">
          <el-input v-model="paramInfo.paramValue" placeholder="输入参数Val"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  name: 'paramGroup',
  data () {
    return {
      paramInfo: {}
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
