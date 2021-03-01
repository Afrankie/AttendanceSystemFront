import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/user/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    console.log("hastoken")  
          // await store.dispatch('user/resetToken')

    const { roles } = await store.dispatch('user/getInfo')
    const accessRoutes = await store.dispatch('permission/generateRoutes',roles)
    // console.log("src permission " + JSON.stringify(roles) + "11")
    // console.log("acessroutes " + JSON.stringify(accessRoutes))
    router.addRoutes(accessRoutes)
    if (to.path === '/user/login') {
      // if is logged in, redirect to the home page
      next({ path: '/record/list' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          

          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`user/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    console.log("notoken")  
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      console.log("notoken and no in whiteListlist")
      next(`/user/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
