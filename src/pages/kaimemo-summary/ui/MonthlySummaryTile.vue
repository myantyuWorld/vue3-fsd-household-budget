<script setup lang="ts">
  import { computed } from 'vue'
  import TheCard from './TheCard.vue'
  import { formatAmount } from '@/shared/util/string'

  const props = defineProps<{
    tag: '食費' | '日用品'
    currentExpense: number
    availableAmount: number
  }>()

  const formattedAvailableAmount = computed(() => {
    return formatAmount(props.availableAmount - props.currentExpense)
  })

  const formattedCurrentExpense = computed(() => {
    return formatAmount(props.currentExpense)
  })

  const getTagColor = computed(() => {
    return props.tag === '食費'
      ? 'bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 text-pink-800 dark:text-pink-200'
      : 'bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 text-indigo-800 dark:text-indigo-200'
  })
</script>

<template>
  <TheCard
    class="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
  >
    <div class="w-[calc(100%-16px)] h-max rounded text-center p-3">
      <div class="flex items-center justify-center gap-3">
        <span
          :class="getTagColor"
          class="text-xl font-medium px-4 py-1 rounded-full shadow-sm"
        >
          {{ tag }}
        </span>
        <div class="flex items-center gap-2">
          <span class="text-xl text-gray-600 dark:text-gray-400">残り</span>
          <span class="text-2xl font-bold text-red-500 dark:text-red-400">
            {{ formattedAvailableAmount }}
          </span>
          <span class="text-xl text-gray-600 dark:text-gray-400">円</span>
        </div>
      </div>
      <div class="relative">
        <span
          class="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 dark:from-indigo-400 dark:via-pink-400 dark:to-purple-400"
        >
          {{ formattedCurrentExpense }}
          <span class="text-4xl">円</span>
        </span>
        <div
          class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 rounded-full"
        ></div>
      </div>
    </div>
  </TheCard>
</template>
