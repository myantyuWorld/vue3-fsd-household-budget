import type { NavigationGuard } from 'vue-router'
import { useSessionStore } from '@/entities/session/model/session-store'

export const authGuard: NavigationGuard = async (to) => {
  const sessionStore = useSessionStore()
  const publicPages = ['/login', '/line/callback']
  const authRequired = !publicPages.includes(to.path)

  try {
    if (!sessionStore.isAuthenticated && !sessionStore.isLoading) {
      await sessionStore.fetchUser()
    }
  } catch (error) {
    console.log(error)
    if (authRequired) {
      return '/login'
    }
  }

  if (authRequired && !sessionStore.isAuthenticated) {
    return '/login'
  }

  if (to.path === '/login' && sessionStore.isAuthenticated) {
    return '/kaimemo'
  }

  return true
} 