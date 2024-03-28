import request from '@/utils/request'
export function buildMenus() {
    return request({
      url: '/permission.json',
      method: 'get'
    })
  }