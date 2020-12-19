export default ({ request }) => ({
    // 获取项目列表
    listPro () { return request({ url: '/project/list', method: 'get' }) },
    // 新增项目接口
    addPro (data={}) { return request({ url: '/project/add', method: 'post', data}) },
    // 编辑项目接口
    editPro (data={}) { return request({ url: '/project/edit', method: 'post', data }) }
})
