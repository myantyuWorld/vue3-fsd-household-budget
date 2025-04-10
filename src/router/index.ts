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
      component: () => import('@/pages/login/ui/LoginPage.vue')
    },
    {
      path: '/line/callback',
      name: 'line-callback',
      component: () => import('@/pages/login/ui/LineCallback.vue')
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
    },
    {
      path: '/summary',
      name: 'summary',
      component: KaimemoSummaryPage,
    },
    {
      path: '/summary/calender/:date',
      name: 'summary-calender',
      component: SummaryCalender,
      props: (router) => ({
        date: router.params.date,
      }),
    },
  ],
})

// 認証ガードを追加
router.beforeEach(authGuard)

export default router
