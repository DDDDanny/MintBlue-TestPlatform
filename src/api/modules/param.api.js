export default ({ request }) => ({
    // 获取版本信息列表
    listVersion () { return request({ url: '/version/list', method: 'get' }) },
    // 新增项目接口
    // addPro (data = {}) { return request({ url: '/project/add', method: 'post', data }) },
    // 编辑项目接口
    // editPro (data = {}) { return request({ url: '/project/edit', method: 'post', data }) }
  })
  