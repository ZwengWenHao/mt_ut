import Vue from 'vue'
import VueRouter from 'vue-router'
import page from '@/views/autoRouter'
import {Local} from '@/utils/storage'
const permission = Local.get('permission')
console.log( 'permission',JSON.parse(permission));
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/json-editor',
        name: 'json-editor',
        component: () => import('@/views/components-dome/json-editor.vue')
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue')
      },
      {
        path: '/ganttChart',
        name: 'ganttChart',
        component: () => import('@/views/ganttChart/index.vue')
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
