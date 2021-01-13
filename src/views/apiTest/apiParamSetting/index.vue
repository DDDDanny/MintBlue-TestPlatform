<template>
  <d2-container>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="版本号" name="ver">
        <ver-setting ref="verRef" :change-tab-flag="activeName" />
      </el-tab-pane>
      <el-tab-pane label="环境参数" name="env">
        <env-setting ref="envRef" :change-tab-flag="activeName" />
      </el-tab-pane>
    </el-tabs>
  </d2-container>
</template>

<script>
import util from '@/libs/util'
import envSetting from '@/views/apiTest/apiParamSetting/components/envSetting'
import verSetting from '@/views/apiTest/apiParamSetting/components/verSetting'

export default {
  name: 'apiParamSetting',
  components: { envSetting, verSetting },
  data() {
    return {
      activeName: 'ver',
    }
  }
}
</script>
