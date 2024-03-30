const getters = {
    roles: state => state.user.roles,
    token: state => state.user.token,
    user: state => state.user.user,
    sidebar: state => state.app.sidebar,
    sidebarRouters: state => state.permission.sidebarRouters,
    permission_routers: state => state.permission.routers,
    loadMenus: state => state.user.loadMenus,
    visitedViews:state => state.tagsView.visitedViews,
}

export default getters