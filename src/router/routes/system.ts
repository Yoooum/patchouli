import { BASE_LAYOUT } from '@/layouts'
import type {RouteRecordRaw} from "vue-router";

export default {
  path: '/system',
  component: BASE_LAYOUT,
  meta: {
    title: '系统管理',
  },
  children: [
    {
      path: 'user',
      component: () => import('@/pages/user/index.vue'),
      meta: {
        auth: true,
        title: '用户管理',
      },
    },
    {
      path: 'role',
      component: () => import('@/pages/role/index.vue'),
      meta: {
        auth: true,
        title: '角色管理',
      },
    },
  ],
} as RouteRecordRaw
