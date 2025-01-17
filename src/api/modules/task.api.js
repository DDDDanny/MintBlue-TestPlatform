export default ({ request }) => ({
  // 获取任务信息列表
  listTask (params = {}) { return request({ url: '/task/list', method: 'get', params }) },
  // 新增任务信息
  addTask (data = {}) { return request({ url: '/task/add', method: 'post', data }) },
  // 删除任务信息
  delTask (data = {}) { return request({ url: '/task/del', method: 'post', data }) }
})
