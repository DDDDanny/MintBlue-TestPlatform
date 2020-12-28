export default ({ request }) => ({
  // 获取测试集信息列表
  listTestSuite (params = {}) { return request({ url: '/suite/list', method: 'get', params }) },
  // 新增测试用例集
  addTestSuite (data = {}) { return request({ url: '/suite/add', method: 'post', data }) },
  // 编辑测试用例集
  editTestSuite (data = {}) { return request({ url: '/suite/edit', method: 'post', data }) }
})
