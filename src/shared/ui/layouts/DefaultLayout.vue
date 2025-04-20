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