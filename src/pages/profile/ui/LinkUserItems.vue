<script setup lang="ts">
  import { defineAsyncComponent } from 'vue'

  const UserSkeleton = defineAsyncComponent(
    () => import('@/shared/ui/icons/UserSkeleton.vue')
  )

  defineProps<{
    name: string
    role: string
  }>()
</script>

<template>
  <li
    class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm"
  >
    <UserSkeleton />
    <span class="font-medium text-gray-700 dark:text-gray-300">{{ name }}</span>
    <span class="text-sm text-gray-500 dark:text-gray-400">{{ role }}</span>
  </li>
</template>
