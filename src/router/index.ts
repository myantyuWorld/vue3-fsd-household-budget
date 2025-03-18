import { createRouter, createWebHistory } from 'vue-router'
import { SharePage } from '@/pages/share'
import { KaimemoPage } from '@/pages/kaimemo'
import { KaimemoSummaryPage } from '@/pages/kaimemo-summary'
import { SummaryCalender } from '@/pages/summary-calender'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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

export default router
