import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getRoles, setRoles, removeRoles, getAvatar, setAvatar, removeAvatar, getFirst, setFirst, removeFirst } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: getAvatar(),
    roles: getRoles(),   //添加角色变量
    first: getFirst()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state,roles) => {
    state.roles = roles
  }
}

const tokens = {
  administrator: {
    token: 'admin-token'
  },
  student : {
    token: 'student-token'
  }
}

const avatarUrl = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { id, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ id: id.trim(), password: password }).then(response => {
        const { content } = response
        const token = tokens[content.uRoleName];
        commit('SET_TOKEN', token)
        commit('SET_NAME', content.uName)
        commit('SET_AVATAR', avatarUrl)
        var roles = []
        roles.push(content.uRoleName)
        commit('SET_ROLES', roles)
        setToken(token)
        setRoles(roles)
        setAvatar(avatarUrl)
        setFirst()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      //   const { data } = response

      //   if (!data) {
      //     return reject('Verification failed, please Login again.')
      //   }

      //   const { name, avatar } = data

      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
      
      // console.log(state.roles)
      // console.log(typeof(JSON.parse(state.roles)))

      const data = {
        avatar:avatarUrl
      }
      // console.log(typeof(state.roles))
      if (typeof(state.roles) === "object") {
        data.roles = state.roles;
      } else {
        data.roles = JSON.parse(state.roles)
      }

      if (state.token) {
        resolve(data)
      } else {
        console.log("getInfo reject")
        reject()
      }
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        removeRoles()
        removeAvatar()
        removeFirst()

        resetRouter()
        commit('RESET_STATE')
        commit('SET_ROLES', [])
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeRoles()
      removeAvatar()
      removeFirst()

      commit('RESET_STATE')
      commit('SET_ROLES', [])
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

