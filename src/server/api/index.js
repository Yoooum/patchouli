import { request } from '@/utils'

export default {
  fetchMenus: () => request.get('/api/menus'),
  fetchUser: () => request.get('/api/user'),
  logout: () => request.post('/api/logout'),
}
