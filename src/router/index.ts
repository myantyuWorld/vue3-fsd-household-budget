import { createRouter, createWebHistory } from 'vue-router'
import { SharePage } from '@/pages/share'
import { KaimemoPage } from '@/pages/kaimemo'
import { KaimemoSummaryPage } from '@/pages/kaimemo-summary'
import { SummaryCalender } from '@/pages/summary-calender'
import { authGuard } from '@/app/router/auth-guard'
import { ProfilePage } from '@/pages/profile'
import { ExpenseCalendarPage } from '@/pages/expense-calender'
import { AdminInformationPage } from '@/pages/admin/information'
import { UserInformationPage } from '@/pages/user-information'

// デフォルトのメタ情報を定義
const defaultMeta = {
  layout: 'default',
  requiresAuth: true
}

const adminMeta = {
  layout: 'admin',
  requiresAuth: true
}

// 認証不要のメタ情報を定義
const authMeta = {
  layout: 'auth',
  requiresAuth: false
}

// ルート定義を分離
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/ui/LoginPage.vue'),
    meta: {
      ...authMeta,
      title: 'ログイン'
    }
  },
  {
    path: '/line/callback',
    name: 'line-callback',
    component: () => import('@/pages/login/ui/LineCallback.vue'),
    meta: {
      ...authMeta,
      title: 'ログイン'
    }
  },
  {
    path: '/share',
    name: 'share',
    component: SharePage,
    meta: {
      ...defaultMeta,
      title: '家計簿共有'
    }
  },
  {
    path: '/kaimemo',
    name: 'kaimemo',
    component: KaimemoPage,
    meta: {
      ...defaultMeta,
      title: '家計簿'
    }
  },
  {
    path: '/summary',
    name: 'summary',
    component: KaimemoSummaryPage,
    meta: {
      ...defaultMeta,
      title: '家計簿'
    }
  },
  {
    path: '/summary/calender/:date',
    name: 'summary-calender',
    component: SummaryCalender,
    props: (router: { params: { date: string } }) => ({
      date: router.params.date
    }),
    meta: {
      ...defaultMeta,
      title: '家計簿'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    meta: {
      ...defaultMeta,
      title: 'プロフィール'
    }
  },
  {
    path: '/expense-calender',
    name: 'expense-calender',
    component: ExpenseCalendarPage,
    meta: {
      ...defaultMeta,
      title: '家計簿'
    }
  },
  {
    path: '/admin/informations',
    name: 'admin-informations',
    component: AdminInformationPage,
    meta: {
      ...adminMeta,
      title: '管理者'
    }
  },
  {
    path: '/user/informations',
    name: 'user-informations',
    component: UserInformationPage,
    meta: {
      ...defaultMeta,
      title: 'お知らせ'
    }
  }
]

// ルーターの作成
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 認証ガードを追加
router.beforeEach(authGuard)

export default router
