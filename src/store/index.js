import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    d2admin
  },
  state: {
    // 被选择的项目ID（这个值要存在cookie中）
    seletedProject: '001'
  }
})
