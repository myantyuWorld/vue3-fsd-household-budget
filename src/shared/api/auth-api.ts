import {  POST } from './client'

export const authApi = {
  // async login() {
  //   const response = await GET('/line/login', {})
  //   return response.url
  // },

  async logout() {
    await POST('/line/logout', {})
  },

  // async getMe(): Promise<User> {
  //   const response = await client.GET('/line/me')
  //   return response.user
  // }
} 