import { Local } from '@/utils/storage'
const state = {
    permission: []
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
    changeRoles({ commit }) {
        commit('permission')
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

