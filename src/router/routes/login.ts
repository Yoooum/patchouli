import { BLANK_LAYOUT } from '@/layouts'
import type {RouteRecordRaw} from "vue-router";

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
} as RouteRecordRaw
