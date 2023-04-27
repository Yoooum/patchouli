import { request } from '@/utils'

export default {
  fetchMenus: () => request.get('/api/menus'),
}
