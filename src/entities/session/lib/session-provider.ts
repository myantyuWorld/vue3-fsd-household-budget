import { type InjectionKey, inject, provide } from 'vue'
import { type components } from '@/shared/api/v1.d'

export type User = components['schemas']['FetchMe']

export const UserKey: InjectionKey<User> = Symbol('user')

export const provideUser = (user: User) => {
  provide(UserKey, user)
}

export const useUser = () => {
  const user = inject(UserKey)
  if (!user) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return user
}
