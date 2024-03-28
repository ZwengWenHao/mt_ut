import router from './routers.js'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth.js'

NProgress.configure({ showSpinner: false })
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      console.log('store',store.getters.roles);
      next()
    }
  }else{
    if(whiteList.indexOf(to.path)!==-1){
      next()
    }else{
      next(`/login/redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})



router.afterEach(() => {
  NProgress.done()
})