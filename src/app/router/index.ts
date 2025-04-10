import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './auth-guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/ui/LoginPage.vue')
    },
    {
      path: '/line/callback',
      name: 'line-callback',
      component: () => import('@/pages/login/ui/LineCallback.vue')
    },
    {
      path: '/kaimemo',
      name: 'kaimemo',
      component: () => import('@/pages/kaimemo/ui/KaimemoPage.vue')
    },
    {
      path: '/',
      redirect: '/kaimemo'
    }
  ]
})

router.beforeEach(authGuard)

export default router 