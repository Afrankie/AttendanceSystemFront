
const tokens = {
  admin: {
    token: 'admin-token'
  },
  student : {
    token: 'student-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: '我是管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    // avatar: 'https://sm.ms/image/7WZeF9oqURQ2pmT',
    name: '管理员'
  },
  'editor-token': {
    roles: ['student'],
    introduction: '我是学生',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    // avatar: 'https://sm.ms/image/tRyLHQBSXvcnqfE',
    name: '学生'
  }
}

module.exports = [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          status: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        status: 200,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      //const info = users[token]
      const info = users[token]
      // mock error
      if (!info) {
        return {
          status: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        status: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        status: 200,
        data: 'success'
      }
    }
  }
]
