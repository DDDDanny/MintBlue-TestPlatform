export default ({ request }) => ({
    // 获取版本信息列表
    listVersion () { return request({ url: '/version/list', method: 'get' }) },
    // 新增版本信息
    addVersion (data = {}) { return request({ url: '/version/add', method: 'post', data }) },
    // 编辑项目接口
    // editPro (data = {}) { return request({ url: '/project/edit', method: 'post', data }) }
  })
  