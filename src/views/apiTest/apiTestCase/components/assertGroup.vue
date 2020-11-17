<template>
  <el-form :model="assertInfo">
    <el-row>
      <el-col :span="7">
        <el-form-item label="">
          <el-input v-model="assertInfo.assertKey" placeholder="输入断言Key"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-form-item label="">
          <el-select v-model="assertInfo.assertCondition" placeholder="请选择条件">
            <el-option v-for="item in assertConditions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-form-item label="">
          <el-input v-model="assertInfo.assertValue" placeholder="输入断言Val"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  name: 'assertGroup',
  data () {
    return {
      assertInfo: {},
      assertConditions: [
        { value: '==', label: '等于' },
        { value: '!=', label: '不等于' },
        { value: 'In', label: '包含' },
        { value: 'notIn', label: '不包含' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
