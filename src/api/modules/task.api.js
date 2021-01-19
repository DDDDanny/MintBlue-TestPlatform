export default ({ request }) => ({
    // 获取任务信息列表
    listTask () { return request({ url: '/task/list', method: 'get' }) },
})
