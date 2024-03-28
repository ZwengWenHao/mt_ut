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
      loadMenus(next, to)
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login/redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})
export const loadMenus = (next, to) => {
  buildMenus().then(res => {
    const sdata = JSON.parse(JSON.stringify(res))
    const rdata = JSON.parse(JSON.stringify(res))
    const sidebarRoutes = filterAsyncRouter(sdata)
    const rewriteRoutes = filterAsyncRouter(rdata, false, true)
    rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
    store.dispatch('permission/GenerateRoutes', rewriteRoutes).then(() => {
      router.addRoutes(rewriteRoutes)
      next({ ...to, replace: true })
    })
    store.dispatch('permission/SetSidebarRouters', sidebarRoutes)
  })
}
router.afterEach(() => {
  NProgress.done()
})