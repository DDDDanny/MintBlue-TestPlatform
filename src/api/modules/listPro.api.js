export default ({ request }) => ({
  /**
   * @description 项目列表
   */
  listPro () {
    // 接口请求
    return request({
      url: '/project/list',
      method: 'get'
    })
  }
})
