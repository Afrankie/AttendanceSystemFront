const Mock = require('mockjs')


module.exports = [
  {
    url: '/face/save',
    type: 'post',
    response: config => {
      return {
        status : 500,
        statusMsg: '失败'
      }
    }
  }
]