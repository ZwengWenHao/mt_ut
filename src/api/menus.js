import request from '@/utils/request'
import axios from 'axios'

export async function buildMenus() {
  const res = await axios({ url: '/mock/permission.json' })
  return res.data
}