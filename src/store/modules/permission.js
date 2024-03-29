import { constantRouterMap } from '@/router/routers'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'

const state = {
    routers: constantRouterMap,
    addRouters: [],
    sidebarRouters: []
}
const mutations = {
    SET_ROUTERS(state, routers) {
        state.routers = state.routers.concat(routers)
    },
    SET_SIDEBAR_ROUTERS(state, sidebarRouter) {
        state.sidebarRouters = sidebarRouter
    }
}
const actions = {
    GenerateRoutes({ commit }, asyncRouter) {
        commit('SET_ROUTERS', asyncRouter)
    },
    SetSidebarRouters({ commit }, sidebarRouter) {
        commit('SET_SIDEBAR_ROUTERS', sidebarRouter)
    },

}

export const filterAsyncRouter = (routers, lastRouter = false, type = false) => {
    return routers.filter(router => {
        if (type && router.children) {
            router.children = filterChildren(router.children)
        }
        if (router.component) {
            if (router.component === 'Layout') {
                router.component = Layout
            } else if (router.component === 'ParentView') {
                router.component = ParentView
            } else {
                const component = router.component
                router.component = loadView(component)
            }
        }
        if (router.children != null && router.children && router.children.length) {
            router.children = filterAsyncRouter(router.children, router, type)
        } else {
            delete router['children']
            delete router['redirect']
        }
        return true
    })
}

function filterChildren(childrenMap, lastRouter = false) {
    var children = []
    childrenMap.forEach((el, index) => {
        if (el.children && el.children.length) {
            if (el.component === 'ParentView') {
                el.children.forEach(c => {
                    c.path = el.path + '/' + c.path
                    if (c.children && c.children.length) {
                        children = children.concat(filterChildren(c.children, c))
                        return
                    }
                    children.push(c)
                })
                return
            }
        }
        if (lastRouter) {
            el.path = lastRouter.path + '/' + el.path
        }
        children = children.concat(el)
    })
    return children
}

export const loadView = (view) => {
    return () => import(`@/views/${view}`)
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}