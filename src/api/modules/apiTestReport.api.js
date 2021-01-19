export default ({ request }) => ({
    // 获取版本信息列表
    listApiTestReport () { return request({ url: '/apiReport/list', method: 'get' }) },
})
  