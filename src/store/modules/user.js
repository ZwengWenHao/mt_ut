import { Local } from '@/utils/storage'
import router from '@/router/index'
import { login, getInfo, logout } from '@/api/login'
import { setToken, getToken, removeToken } from '@/utils/auth'
const state = {
    permission: [],
    roles: [],
    token: getToken(),
    user: {},
    loadMenus: false,
}
const getters = {
    permission(state) {
        return state.permission
    }
}
const mutations = {
    permission(state) {
        state.permission = Local.get('permission')
    },
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_ROLES(state, roles) {
        state.roles = roles
    },
    SET_USER(state, user) {
        state.user = user
    },
    SET_LOAD_MENUS(state, type) {
        state.loadMenus = type
    }
}
const actions = {
    changeRoles({ commit, state }) {
        commit('permission')
        router.matcher.addRoutes(state.permission)
    },
    Login({ commit }, userInfo) {
        return new Promise(async (resolve, reject) => {
            try {
                const { token, user } = await login({ ...userInfo })
                setToken(token, userInfo.rememberMe)
                commit('SET_TOKEN', token)
                setUserInfo(user, commit)
                commit('SET_LOAD_MENUS', true)
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    },
    GetInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo().then(res => {
                setUserInfo(res, commit)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 退出登录 不管成功失败 重置缓存
    LogOut({ commit }) {
        return new Promise((resolve, reject) => {
            logout().then(res => {
                logOut(commit)
                resolve()
            }).catch(error => {
                logOut(commit)
                reject(error)
            })
        })
    },
    updateLoadMenus({ commit }) {
        return new Promise((resolve, reject) => {
            commit('SET_LOAD_MENUS', false)
        })
    }
}
function logOut(commit) {
    commit('SET_TOKEN', '')
    removeToken()
}
export const setUserInfo = ({ roles, user }, commit) => {
    if (!roles.length) {
        commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
    } else {
        commit('SET_ROLES', roles)
    }
    commit('SET_USER', user)
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

