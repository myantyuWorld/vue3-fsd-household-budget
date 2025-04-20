<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useSessionStore } from '@/entities/session/model/session-store'
import { defineAsyncComponent } from 'vue'

defineProps<{
  title: string
}>()

const sessionStore = useSessionStore()
const user = computed(() => sessionStore.user)
const isUserLoaded = ref(false)

// 遅延読み込みコンポーネント
const ShoppingIcon = defineAsyncComponent(() => 
  import('@/shared/ui/icons/ShoppingIcon.vue')
)
const SummaryIcon = defineAsyncComponent(() => 
  import('@/shared/ui/icons/SummaryIcon.vue')
)
const LogoutIcon = defineAsyncComponent(() => 
  import('@/shared/ui/icons/LogoutIcon.vue')
)
const UserSkeleton = defineAsyncComponent(() => 
  import('@/shared/ui/icons/UserSkeleton.vue')
)

onMounted(async () => {
  try {
    await sessionStore.fetchUser()
    isUserLoaded.value = true
  } catch (error) {
    console.error('Failed to load user:', error)
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
    <header class="bg-gray-100 shadow">
      <div class="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold text-gray-900">
            {{ title }}
          </h1>
          <div class="flex items-center gap-4">
            <template v-if="isUserLoaded">
              <img :src="user.pictureURL" class="w-10 h-10 rounded-full" />
            </template>
            <UserSkeleton v-else />
            <button @click="logout" class="text-gray-600 hover:text-gray-900">
              <LogoutIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
    <main class="flex-1">
      <div class="max-w-7xl mx-auto  sm:px-6 lg:px-8">
        <slot></slot>
      </div>
    </main>
    <nav class="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-around py-4">
          <router-link to="/kaimemo" class="text-gray-600 hover:text-gray-900">
            <ShoppingIcon />
          </router-link>
          <router-link to="/summary" class="text-gray-600 hover:text-gray-900">
            <SummaryIcon />
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