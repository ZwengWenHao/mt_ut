import request from '@/utils/request'

export function getCodeImg() {
    return request({
        headers: {
            'Cache-control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
        },
        url: 'auth/code',
        method: 'get'
    })
}

export function login(data) {
    return request({
        url: 'auth/login',
        method: 'post',
        data
    })
}

export function getInfo() {
    return request({
        url: 'auth/info',
        method: 'get'
    })
}

export function logout() {
    return request({
        url: 'auth/logout',
        method: 'delete'
    })
}