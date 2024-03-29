import router from './routers.js'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth.js'
import { buildMenus } from '@/api/menus'
import { filterAsyncRouter } from '@/store/modules/permission'

NProgress.configure({ showSpinner: false })
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (!store.getters.roles.length) {
        store.dispatch('user/GetInfo').then(res => {
          loadMenus(next, to)
        })
      } else if (store.getters.loadMenus) {
        store.dispatch('user/updateLoadMenus')
        loadMenus(next, to)
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})
export const loadMenus = (next, to) => {
  buildMenus().then(res => {
    const rewriteRoutes = filterAsyncRouter(res, false, true)
    store.dispatch('permission/GenerateRoutes', rewriteRoutes).then(() => {
      rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
      router.matcher.addRoutes(rewriteRoutes)
      next({ ...to, replace: true })
    })
  })
}
router.afterEach(() => {
  NProgress.done()
})