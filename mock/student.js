const Mock = require('mockjs')

const data = Mock.mock({
  'list|29': [{
    'id|+1': 1,
    // sID: '@sentence(10, 20)',
    'sId|+1': 1000000001,
    uName: '@cname',
    'pictureFlag|1':[0,1],
    'uFacePath': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    // 'status|1': ['published', 'draft', 'deleted'],
    // pageviews: '@integer(300, 5000)'
  }]
})

module.exports = [
  {
    url: '/student/list',
    type: 'post',
    response: config => {
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