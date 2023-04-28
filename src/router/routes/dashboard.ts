import { BASE_LAYOUT } from '@/layouts'
import type {RouteRecordRaw} from "vue-router";

export default {
  path: '/dashboard',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      component: () => import('@/pages/dashboard/index.vue'),
      meta: {
        title: '首页',
        auth: true,
      },
    }],
} as RouteRecordRaw
