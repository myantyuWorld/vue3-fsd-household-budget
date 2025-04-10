<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/entities/session/model/session-store'

const router = useRouter()
const sessionStore = useSessionStore()

onMounted(async () => {
  try {
    await sessionStore.fetchUser()
    router.push('/kaimemo')
  } catch (error) {
    console.error('Authentication failed:', error)
    router.push('/login')
  }
})
</script> 
<template>
<div class="min-h-screen bg-gray-100 flex items-center justify-center">
  <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
    <div class="text-center">
      <h2 class="text-xl font-semibold">ログイン中...</h2>
      <p class="mt-2 text-gray-600">しばらくお待ちください</p>
    </div>
  </div>
</div>
</template>
