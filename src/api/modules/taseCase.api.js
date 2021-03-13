export default ({ request }) => ({
    // 获取测试集信息列表
    listTestCase (params = {}) { return request({ url: '/testcase/list', method: 'get', params }) },
    // 新增测试用例集
    addTestCase (data = {}) { return request({ url: '/testcase/add', method: 'post', data }) },
    // 编辑测试用例集
    editTestCase (data = {}) { return request({ url: '/testcase/edit', method: 'post', data }) }
  })