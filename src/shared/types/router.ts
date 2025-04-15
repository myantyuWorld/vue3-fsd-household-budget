import type { RouteRecordRaw } from 'vue-router'

export type AppRouteRecordRaw = RouteRecordRaw & {
  meta?: {
    layout?: 'default' | 'auth'
    requiresAuth?: boolean
  }
} 