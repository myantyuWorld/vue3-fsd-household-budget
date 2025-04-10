import { defineStore } from 'pinia'
import type { User } from '@/shared/api/auth'
import { authApi } from '@/shared/api/auth-api'
import { GET } from '@/shared/api/client'

interface SessionState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    user: null,
    isAuthenticated: false,
    isLoading: false
  }),

  actions: {
    // async login() {
    //   const loginUrl = await authApi.login()
    //   window.location.href = loginUrl
    // },

    async logout() {
      try {
        await authApi.logout()
        this.user = null
        this.isAuthenticated = false
        window.location.href = '/login'
      } catch (error) {
        console.error('Logout failed:', error)
      }
    },

    async fetchUser() {
      this.isLoading = true
      try {
        const { data, error } = await GET('/line/me', {
          param : {}
        })
        console.log(data)
        if (error) {
          throw error
        }
        this.isAuthenticated = true
      } catch (error) {
        this.user = null
        this.isAuthenticated = false
        throw error
      } finally {
        this.isLoading = false
      }
    }
  }
}) 