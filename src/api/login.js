import request from '@/utils/request'
import axios from 'axios'
// export function getCodeImg() {
//     return request({
//         headers: {
//             'Cache-control': 'no-cache, no-store, must-revalidate',
//             'Pragma': 'no-cache',
//             'Expires': 0
//         },
//         url: 'auth/code',
//         method: 'get'
//     })
// }
export async function getCodeImg() {
    const res = await axios({ url: '/mock/code.json', method: 'get' })
    return res.data
}

// export function login(data) {
//     return request({
//         url: 'auth/login',
//         method: 'post',
//         data
//     })
// }

export async function login() {
    const res = await axios({ url: '/mock/login.json', method: 'get' })
    return res.data
}


// export function getInfo() {
//     return request({
//         url: 'auth/info',
//         method: 'get'
//     })
// }

export async function getInfo() {
    const res = await axios({ url: '/mock/info.json', method: 'get' })
    return res.data
}

export function logout() {
    return request({
        url: 'auth/logout',
        method: 'delete'
    })
}