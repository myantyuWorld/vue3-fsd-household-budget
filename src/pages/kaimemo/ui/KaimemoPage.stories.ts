import { type Meta, type StoryObj } from '@storybook/vue3'
import {
  VueQueryPlugin,
  QueryClient,
  type VueQueryPluginOptions
} from '@tanstack/vue-query'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { http, HttpResponse } from 'msw'
import { mswLoader } from 'msw-storybook-addon'
import Component from './KaimemoPage.vue'
import { useSessionStore } from '@/entities/session/model/session-store'

const queryClient = new QueryClient()
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient
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
              name: '食費'
            }
          }
        ],
        users: []
      }
    ]
  },
  isAuthenticated: true,
  isLoading: false
})

// Routerのモック
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/kaimemo',
      name: 'kaimemo',
      component: Component
    }
  ]
})

// ルーターを初期化（queryパラメータを含める）
router.push({
  path: '/kaimemo',
  query: {
    tempUserID: 'test-temp-user-id'
  }
})

const meta: Meta<typeof Component> = {
  component: Component,
  tags: ['autodocs'],
  decorators: [
    story => ({
      components: { story },
      plugins: [[VueQueryPlugin, vueQueryPluginOptions], pinia, router],
      provide: {
        router: router
      },
      template: '<story />'
    })
  ],
  parameters: {
    msw: {
      handlers: [
        http.get('/api/items', () => {
          return HttpResponse.json([
            {
              id: '1',
              name: '牛乳',
              tag: '食費',
              done: false
            },
            {
              id: '2',
              name: 'パン',
              tag: '食費',
              done: false
            },
            {
              id: '3',
              name: '洗剤',
              tag: '日用品',
              done: false
            }
          ])
        })
      ]
    }
  },
  loaders: [mswLoader]
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/items', () => {
          return HttpResponse.json([
            {
              id: '1',
              name: '牛乳',
              tag: '食費',
              done: false
            },
            {
              id: '2',
              name: 'パン',
              tag: '食費',
              done: false
            },
            {
              id: '3',
              name: '洗剤',
              tag: '日用品',
              done: false
            }
          ])
        })
      ]
    }
  }
}
