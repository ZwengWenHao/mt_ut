const getters = {
    roles: state => state.user.roles,
    token: state => state.user.token,
    user: state => state.user.user,
    sidebar: state => state.app.sidebar,
    sidebarRouters:state => state.permission.sidebarRouters,
}

export default getters