export default ({ request }) => ({
  // 获取版本信息列表
  listVersion (params = {}) { return request({ url: '/version/list', method: 'get', params }) },
  // 新增版本信息
  addVersion (data = {}) { return request({ url: '/version/add', method: 'post', data }) },
  // 编辑版本信息
  editVersion (data = {}) { return request({ url: '/version/edit', method: 'post', data }) },
  // 获取环境信息
  listEnv (params = {}) { return request({ url: '/env/list', method: 'get', params }) },
  // 新增环境信息
  addEnv (data = {}) { return request({ url: '/env/add', method: 'post', data }) },
  // 编辑环境信息
  editEnv (data = {}) { return request({ url: '/env/edit', method: 'post', data }) }
})
