const state = {
    visitedViews: []
}
const mutations = {
    ADD_VISITED_VIEW(state, view) {
        const is_add = state.visitedViews.some(v => v.path === view.path)
        if (is_add) return
        state.visitedViews.push(
            Object.assign({}, view, { title: view.meta.title || 'no-name' })
        )
    },
    DEL_VISITED_VIEW(state, view) {
        for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
                state.visitedViews.splice(i, 1)
                break
            }
        }
    },
    UPDATE_VISITED_VIEW(state, view) {
        for (const v of state.visitedViews) {
            if (v.path == view.path) {
                v = Object.assign(v, view)
                break
            }
        }
    }
}
const actions = {
    // 根据点击的页面添加到tag列表中
    addView({ dispatch }, view) {
        dispatch('addVisitedView', view)
    },
    addVisitedView({ commit }, view) {
        commit('ADD_VISITED_VIEW', view)
    },
    // tag关闭删除
    delView({ dispatch }, view) {
        return new Promise(resolve => {
            dispatch('delVisitedView', view)
            resolve({
                visitedViews: [...state.visitedViews]
            })
        })
    },
    delVisitedView({ commit }, view) {
        return new Promise(_ => {
            commit('DEL_VISITED_VIEW', view)
        })
    },
    updateVisitedView({ commit }, view) {
        commit('UPDATE_VISITED_VIEW', view)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}