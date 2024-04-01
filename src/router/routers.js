import Vue from "vue";
import Router from 'vue-router'
import Layout from '@/layout/index.vue'
Vue.use(Router)

export const constantRouterMap = [
    {
        path: '/login',
        meta: {
            title: '登录',
            noCache: true,
        },
        component: () => import('@/views/login/index.vue'),
        hidden: true,
    },
    {
        path: '/404',
        component: () => import('@/views/features/401.vue'),
        hidden: true,
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/features/redirect.vue')
            }
        ]
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/home'),
                name: 'Dashboard',
                meta: { title: '平台首页', icon: 'chart', affix: true, }
            }
        ]
    },
]

const createRouter = new Router({
    mode: 'hash',
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
export default createRouter