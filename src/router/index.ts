import {createRouter, createWebHistory} from 'vue-router'
import type { RouteRecordRaw } from "vue-router";
import {BASE_LAYOUT, BLANK_LAYOUT} from '@/layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BASE_LAYOUT,
      meta: {
        auth: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      component: BLANK_LAYOUT,
      children: [
        {
          path: '',
          component: () => import('@/pages/exception/404/index.vue'),
        },
      ],
    },
  ],
})

const modules:Record<string,RouteRecord> = import.meta.glob('@/router/routes/*', { eager: true })

console.log(modules)
interface RouteRecord {
  default: RouteRecordRaw
}
Object.keys(modules).forEach((key) => {
  const route = modules[key]
  router.addRoute(route.default)
})

export default router
