import axios from "axios";
import Config from '@/settings'
import { Notification } from 'element-ui'
import { getToken } from '@/utils/auth'

// process.env.NODE_ENV.VUE_APP_BASE_API
const service = axios.create({
    baseURL: '/',
    timeout: Config.timeOut
})

service.interceptors.request.use(config => {
    if (getToken()) {
        config.headers['Authorization'] = getToken()
    }
    config.headers['Content-Type'] = 'application/json'
    return config
}, error => {
    Promise.reject(error)
})

service.interceptors.response.use(response => {
    return response.data
}, error => {
    const code = error.response.data.status
    const message = error.response.data.message
    if (code) {
        Notification.error(message)
    } else {
        Notification.error({
            title: '接口请求失败',
            duration: 5000
        })
    }
    return Promise.reject(error)
})

export default service