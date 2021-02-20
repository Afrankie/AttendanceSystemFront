const Mock = require('mockjs')

const data = Mock.mock({
  'list|29': [{
    'id|+1': 1,
    // sID: '@sentence(10, 20)',
    'sId|+1': 1000000001,
    uName: '@cname',
    // 'status|1': ['published', 'draft', 'deleted'],
    createTime: '@datetime',
    // pageviews: '@integer(300, 5000)'
  }]
})

module.exports = [
  {
    url: '/record/list',
    type: 'post',
    response: config => {
      console.error('12321313')
      console.error(config)
      const list = data.list
      return {
        content: {
          total: list.length,
          list: list,
          columns: []
        },
        status : 200,
        statusMsg: '请求成功'
      }
    }
  }
]