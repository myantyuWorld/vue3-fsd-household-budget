<script setup lang="ts">
  import type { components } from '@/shared/api/v1'

  defineProps<{
    categoryLimits: components['schemas']['CategoryLimit'][]
  }>()
</script>

<template>
  <li
    v-for="categoryLimit in categoryLimits"
    :key="categoryLimit.id"
    class="flex items-center justify-between p-1 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm mb-2"
  >
    <span class="font-medium text-gray-700 dark:text-gray-300">
      {{ categoryLimit.category.name }}
    </span>
    <span class="text-lg font-bold text-blue-600 dark:text-blue-400">
      {{ categoryLimit.limitAmount }}円
    </span>
  </li>
</template>
