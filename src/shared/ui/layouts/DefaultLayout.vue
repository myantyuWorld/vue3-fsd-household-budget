<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useSessionStore } from '@/entities/session/model/session-store'
import { defineAsyncComponent } from 'vue'
import { BaseModal, TheForm, PrimaryButton } from '@/shared/ui'
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
const ProfileIcon = defineAsyncComponent(() =>
  import('@/shared/ui/icons/ProfileIcon.vue')
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
    <header class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-lg backdrop-blur-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto py-1 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 dark:from-indigo-400 dark:via-pink-400 dark:to-purple-400">
            {{ title }}
          </h1>
          <div class="flex items-center gap-6">
            <template v-if="isUserLoaded">
              <img 
                :src="user.pictureURL" 
                class="w-12 h-12 rounded-full border-2 border-indigo-200 dark:border-indigo-800 shadow-md transform hover:scale-110 transition-all duration-300" 
              />
            </template>
            <UserSkeleton v-else />
            <button 
              @click="logout" 
              class="p-2 rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-300"
            >
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
    <nav class="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-lg backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-around py-4">
          <router-link to="/kaimemo" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300">
            <ShoppingIcon />
          </router-link>
          <router-link to="/summary" class="text-gray-600 hover:text-gray-900">
            <SummaryIcon />
          </router-link>
          <router-link to="/profile" class="text-gray-600 hover:text-gray-900">
            <ProfileIcon />
          </router-link>
        </div>
      </div>
    </nav>
  </div>

  <!-- modal -->
  <BaseModal title="プロフィール" :isOpen="false" verticalPosition="top-0" horizontalPosition="left-0">
    <template #modalBody>
      <div class="flex items-center gap-4">
        <template v-if="isUserLoaded">
          <img :src="user.pictureURL" class="w-10 h-10 rounded-full" />
        </template>
        <UserSkeleton v-else />

        <TheForm label="ユーザー名">
          <label>
            {{ user.name }}
          </label>
        </TheForm>
      </div>
      <hr/>
      <TheForm label="家計簿">
        <template v-for="householdBook in user.householdBooks" :key="householdBook.id">
          <ul>
            <li>
                {{ householdBook.title }}
                <ul>
                  <li v-for="categoryLimit in householdBook.categoryLimit" :key="categoryLimit.id">
                    - {{ categoryLimit.category.name }}
                  </li>
                  <PrimaryButton>
                    追加
                  </PrimaryButton>
                </ul>
            </li>
          </ul>
        </template>
      </TheForm>

      <hr/>

      <hr/>
    </template>
  </BaseModal>
</template>

<style scoped>
.router-link-active {
  @apply text-blue-600;
}
</style>