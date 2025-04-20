import { defineStore } from 'pinia'
import { authApi } from '@/shared/api/auth-api'
import { GET } from '@/shared/api/client'
import type { components } from '@/shared/api/v1.d'
interface SessionState {
  user: components['schemas']['FetchMe']
  isAuthenticated: boolean
  isLoading: boolean
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    user: {
      id: 0,
      userID: '',
      name: '',
      pictureURL: '',
      householdBooks: []
    },
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
        this.user = {
          id: 0,
          userID: '',
          name: '',
          pictureURL: '',
          householdBooks: []
        }
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

        if (data) {
          this.user = data
          this.isAuthenticated = true
          this.isLoading = false
        } else {
          this.isAuthenticated = false
          this.isLoading = false
        }
        if (error) {
          throw error
        }
      } catch (error) {
        this.user = {
          id: 0,
          userID: '',
          name: '',
          pictureURL: '',
          householdBooks: []
        }
        this.isAuthenticated = false
        throw error
      } finally {
        this.isLoading = false
      }
    }
  }
}) 