export default ({ request }) => ({
  // 获取任务信息列表
  listTask (params = {}) { return request({ url: '/task/list', method: 'get', params }) }
})
