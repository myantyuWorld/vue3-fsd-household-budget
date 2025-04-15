import { createRouter, createWebHistory } from 'vue-router'
import { SharePage } from '@/pages/share'
import { KaimemoPage } from '@/pages/kaimemo'
import { KaimemoSummaryPage } from '@/pages/kaimemo-summary'
import { SummaryCalender } from '@/pages/summary-calender'
import { authGuard } from '@/app/router/auth-guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/ui/LoginPage.vue'),
      meta: {
        layout: 'auth',
        requiresAuth: false,
        title: 'ログイン'
      }
    },
    {
      path: '/line/callback',
      name: 'line-callback',
      component: () => import('@/pages/login/ui/LineCallback.vue'),
      meta: {
        layout: 'auth',
        requiresAuth: false,
        title: 'ログイン'
      }
    },
    {
      path: '/',
      name: 'share',
      component: SharePage,
    },
    {
      path: '/kaimemo',
      name: 'kaimemo',
      component: KaimemoPage,
      meta: {
        layout: 'default',
        requiresAuth: true,
        title: '家計簿'
      }
    },
    {
      path: '/summary',
      name: 'summary',
      component: KaimemoSummaryPage,
      meta: {
        layout: 'default',
        requiresAuth: true,
        title: '家計簿'
      }
    },
    {
      path: '/summary/calender/:date',
      name: 'summary-calender',
      component: SummaryCalender,
      props: (router) => ({
        date: router.params.date,
      }),
      meta: {
        layout: 'default',
        requiresAuth: true,
        title: '家計簿'
      }
    },
  ],
})

// 認証ガードを追加
router.beforeEach(authGuard)

export default router
