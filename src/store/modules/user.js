import { Local } from '@/utils/storage'
import router, { resetRouter } from '@/router/index'
import { login } from '@/api/login'
import { setToken, getToken } from '@/utils/auth'
const state = {
    permission: [],
    roles: [],
    token: getToken(),
    user: {}
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
    }
}
const actions = {
    changeRoles({ commit, state }) {
        commit('permission')
        router.addRoutes(state.permission)
    },
    Login({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            login({ ...userInfo }).then(res => {
                const { token, user } = res
                setToken(token, userInfo.rememberMe)
                commit('SET_TOKEN', token)
                setUserInfo(user, commit)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
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

