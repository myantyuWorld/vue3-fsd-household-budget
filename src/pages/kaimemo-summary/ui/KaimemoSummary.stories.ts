import { type Meta, type StoryObj } from '@storybook/vue3'
import { VueQueryPlugin, QueryClient, type VueQueryPluginOptions } from '@tanstack/vue-query'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { mswLoader } from 'msw-storybook-addon'
import { useSessionStore } from '@/entities/session/model/session-store'
import Component from './KaimemoSummary.vue'
import { http, HttpResponse } from 'msw'
const queryClient = new QueryClient()
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient,
}

const pinia = createPinia()
setActivePinia(pinia)

// SessionStoreのモック
const sessionStore = useSessionStore()
sessionStore.$patch({
  user: {
    id: 1,
    userID: 'test-user-1',
    name: 'テストユーザー',
    pictureURL: '',
    householdBooks: [
      {
        id: 1,
        userID: 1,
        title: 'テスト家計簿',
        description: 'テスト用の家計簿です',
        categoryLimit: [
          {
            id: 1,
            categoryID: 1,
            limitAmount: 10000,
            category: {
              id: 1,
              name: '食費',
            },
          },
        ],
        users: [],
      },
      {
        id: 2,
        userID: 1,
        title: 'テスト家計簿2',
        description: 'テスト用の家計簿です2',
        categoryLimit: [],
        users: [],
      },
    ],
  },
  isAuthenticated: true,
  isLoading: false,
})

// Routerのモック
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/kaimemo',
      name: 'kaimemo',
      component: Component,
    },
  ],
})

// ルーターを初期化（queryパラメータを含める）
router.push({
  path: '/kaimemo',
  query: {
    tempUserID: 'test-temp-user-id',
  },
})

const meta: Meta<typeof Component> = {
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      plugins: [[VueQueryPlugin, vueQueryPluginOptions], pinia, router],
      provide: {
        router: router,
      },
      template: '<story />',
    }),
  ],
  parameters: {
    msw: {
      handlers: [
        http.get(
          'http://localhost:3000/household/:householdID/shopping/record',
          ({ params, request }) => {
            console.log('MSW intercepted request:', {
              url: request.url,
              params,
              method: request.method,
            })

            const url = new URL(request.url)
            const date = url.searchParams.get('date')
            const householdID = params.householdID

            if (!date || !householdID) {
              console.log('MSW validation failed:', { date, householdID })
              return new HttpResponse(null, { status: 400 })
            }

            console.log('MSW returning mock response')
            return HttpResponse.json({
              shoppingAmounts: [
                {
                  id: 1,
                  amount: 1000,
                  date: date,
                  memo: 'テスト',
                  category: { id: 1, name: '食費' },
                },
                {
                  id: 2,
                  amount: 2000,
                  date: date,
                  memo: 'テスト2',
                  category: { id: 2, name: '日用品' },
                },
                {
                  id: 3,
                  amount: 3000,
                  date: date,
                  memo: 'テスト3',
                  category: { id: 3, name: '交通費' },
                },
              ],
              totalAmount: 6000,
              categoryAmounts: [
                {
                  category: { id: 1, name: '食費' },
                  amount: 1000,
                  limitAmount: 55000,
                },
                {
                  category: { id: 2, name: '日用品' },
                  amount: 2000,
                  limitAmount: 10000,
                },
                {
                  category: { id: 3, name: '交通費' },
                  amount: 3000,
                  limitAmount: 10000,
                },
              ],
            })
          },
        ),
      ],
    },
  },
  loaders: [mswLoader],
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  // ストーリー固有の設定があればここに追加
}
