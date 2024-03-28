const getters = {
    roles: state => state.user.roles,
    token: state => state.user.token,
    user: state => state.user.user,
}

export default getters