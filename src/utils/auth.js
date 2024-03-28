import Config from '@/settings'
import Cookies from 'js-cookie'
const TokenKey = Config.TokenKey
export function getToken() {
    return Cookies.get(TokenKey)
}
export function setToken(token, rememberMe) {
    if (rememberMe) {
        Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
    } return Cookies.set(TokenKey, token)
}

export function removeToken() {
    Cookies.remove(TokenKey)
}