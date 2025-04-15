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
const ShareIcon = defineAsyncComponent(() => 
  import('@/shared/ui/icons/ShareIcon.vue')
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

const onClickShare = () => {
  // TODO : 実装
  console.log('clickShare')
}
</script>

<template>
  <div>
    <div class="justify-center sticky top-0">
      <div class="bg-gray-100 rounded-lg shadow-lg p-4 flex items-center justify-between">
        <router-link to="/kaimemo" class="text-gray-600 hover:text-gray-900">
          <ShoppingIcon />
        </router-link>
        <router-link to="/summary" class="text-gray-600 hover:text-gray-900">
          <SummaryIcon />
        </router-link>
        <button @click="onClickShare">
          <ShareIcon />
        </button>
        <div class="flex items-center gap-4">
          <template v-if="isUserLoaded">
            <img :src="user.pictureURL" class="w-10 h-10 rounded-full" />
            <h1 class="text-sm font-bold">{{ user.name }}</h1>
          </template>
          <UserSkeleton v-else />
        </div>
        <button @click="logout" class="text-gray-600 hover:text-gray-900">
          <LogoutIcon />
        </button>
      </div>
    </div>
    <slot></slot>
  </div>
</template> 