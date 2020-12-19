export default ({ request }) => ({
    /**
     * @description 新增项目
     */
    addPro (data={}) {
      // 接口请求
      return request({
        url: '/project/add',
        method: 'post',
        data
      })
    }
  })
