<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import { useSessionStore } from '@/entities/session/model/session-store'
  import { useNotificationStore } from '@/entities/notification/model/notification-store'
  import { defineAsyncComponent } from 'vue'
  defineProps<{
    title: string
  }>()

  const sessionStore = useSessionStore()
  const notificationStore = useNotificationStore()
  const user = computed(() => sessionStore.user)
  const isUserLoaded = ref(false)

  // 定期的な更新のためのインターバルID
  let updateInterval: number | null = null

  // 定期的なお知らせの更新
  const startPeriodicUpdate = () => {
    // 5分ごとに更新（300000ミリ秒）
    updateInterval = window.setInterval(() => {
      notificationStore.fetchNotifications()
    }, 300000)
  }

  // 遅延読み込みコンポーネント
  const ShoppingIcon = defineAsyncComponent(
    () => import('@/shared/ui/icons/ShoppingIcon.vue')
  )
  const SummaryIcon = defineAsyncComponent(
    () => import('@/shared/ui/icons/SummaryIcon.vue')
  )
  const LogoutIcon = defineAsyncComponent(
    () => import('@/shared/ui/icons/LogoutIcon.vue')
  )
  const UserSkeleton = defineAsyncComponent(
    () => import('@/shared/ui/icons/UserSkeleton.vue')
  )
  const ProfileIcon = defineAsyncComponent(
    () => import('@/shared/ui/icons/ProfileIcon.vue')
  )
  const ExpenseCalendarIcon = defineAsyncComponent(
    () => import('@/shared/ui/icons/ExpenseCalendarIcon.vue')
  )
  const InformationIcon = defineAsyncComponent(
    () => import('@/shared/ui/icons/InformationIcon.vue')
  )

  onMounted(async () => {
    try {
      await Promise.all([
        sessionStore.fetchUser(),
        notificationStore.fetchNotifications()
      ])
      isUserLoaded.value = true
      startPeriodicUpdate()
    } catch (error) {
      console.error('Failed to load user:', error)
    }
  })

  // コンポーネントのアンマウント時にインターバルをクリア
  onUnmounted(() => {
    if (updateInterval !== null) {
      clearInterval(updateInterval)
      updateInterval = null
    }
  })

  const logout = async () => {
    try {
      await sessionStore.logout()
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header
      class="bg-gradient-to-r from-primary-light to-primary-bg shadow-lg backdrop-blur-md sticky top-0 z-50"
    >
      <div class="max-w-7xl mx-auto py-1 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <h1
            class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary-light"
          >
            {{ title }}
          </h1>
          <div class="flex items-center gap-6">
            <template v-if="isUserLoaded">
              <img
                :src="user.pictureURL"
                class="w-12 h-12 rounded-full border-2 border-primary-light shadow-md transform hover:scale-110 transition-all duration-300"
              />
            </template>
            <UserSkeleton v-else />
            <router-link to="/user/informations">
              <button
                class="p-3 rounded-full hover:bg-primary-light transition-colors duration-300"
              >
                <InformationIcon :unreadCount="notificationStore.unreadCount" />
              </button>
            </router-link>
            <button
              @click="logout"
              class="p-3 rounded-full hover:bg-primary-light transition-colors duration-300"
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 pb-20">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <slot></slot>
      </div>
    </main>

    <nav
      class="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary-light to-primary-bg shadow-lg backdrop-blur-md"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-around py-4">
          <router-link
            to="/kaimemo"
            class="text-primary hover:text-primary-dark transition-colors duration-300"
          >
            <ShoppingIcon />
          </router-link>
          <router-link
            to="/summary"
            class="text-gray-600 hover:text-primary-dark"
          >
            <SummaryIcon />
          </router-link>
          <router-link
            to="/expense-calender"
            class="text-gray-600 hover:text-primary-dark"
          >
            <ExpenseCalendarIcon />
          </router-link>
          <router-link
            to="/profile"
            class="text-gray-600 hover:text-primary-dark"
          >
            <ProfileIcon />
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
  .router-link-active {
    @apply text-blue-600;
  }
</style>
