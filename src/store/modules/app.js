import Cookies from "js-cookie";
const state = {
    isBrowserWindow: null,
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false,
        device: 'desktop',
    },
}
const mutations = {
    TOGGLE_SIDEBAR(state) {
        state.sidebar.opened = !state.sidebar.opened
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1)
        } else {
            Cookies.set('sidebarStatus', 0)
        }
    },
    BROWSER_WINDOW(state, link) {
        state.isBrowserWindow = link
    },
    TOGGLE_DEVICE(state, device) {
        state.device = device
    },
    CLOSE_SIDEBAR(state, withoutAnimation) {
        Cookies.set('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    SHOW_SIDE_BAR(state, withoutAnimation) {
        Cookies.set('sidebarStatus', 1)
        state.sidebar.opened = true
        state.sidebar.withoutAnimation = withoutAnimation
    }
}
const actions = {
    browserWindow({ commit }, state) {
        commit('BROWSER_WINDOW', state)
    },
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },
    toggleDevice({ commit }, device) {
        commit('TOGGLE_DEVICE', device)
    },
    closeSideBar({ commit }, { withoutAnimation }) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    showSideBar({ commit }, { withoutAnimation }) {
        commit('SHOW_SIDE_BAR', withoutAnimation)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}