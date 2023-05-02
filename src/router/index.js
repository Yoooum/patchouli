import { createRouter, createWebHistory } from 'vue-router'
import { BASE_LAYOUT, BLANK_LAYOUT } from '@/layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BASE_LAYOUT,
      redirect: '/dashboard',
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

const modules = import.meta.glob('@/router/routes/*.js', { eager: true })

Object.keys(modules).forEach((key) => {
  const module = modules[key]
  router.addRoute(module.default)
})

export default router
