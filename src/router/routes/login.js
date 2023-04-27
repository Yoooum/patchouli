import { BLANK_LAYOUT } from '@/layouts'

export default {
  path: '/login',
  component: BLANK_LAYOUT,
  children: [
    {
      path: '',
      name: 'login',
      component: () => import('@/pages/login/index.vue'),
      meta: {
        auth: false,
      },
    }],
}
