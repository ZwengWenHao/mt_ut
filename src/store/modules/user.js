import { Local } from '@/utils/storage'
import router, { resetRouter } from '@/router/index'
const state = {
    permission: [],
    roles:[]
}
const getters = {
    permission(state) {
        return state.permission
    }
}
const mutations = {
    permission(state) {
        state.permission = Local.get('permission')
    }
}
const actions = {
    changeRoles({ commit, state }) {
        commit('permission')
        router.addRoutes(state.permission)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

