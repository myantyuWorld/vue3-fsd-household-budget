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
</script>

<template>
  <TheCard>
    <div class="w-[calc(100%-16px)] h-max rounded text-center">
      <div class="flex top-0">
        <span
          class="bg-gray-100 text-gray-800 text-xl font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300"
          >{{ tag }}
        </span>
        <div class="font-medium me-2 text-2xl">残り</div>
        <div class="font-medium me-2 text-red-500 text-2xl">{{ formattedAvailableAmount }}</div>
        <div class="font-medium me-2 text-2xl">円</div>
      </div>
      <span
        class="m-2 py-3 font-sans antialiased font-bold md:text-5xl lg:text-6xl flex justify-center gap-1 text-7xl text-stone-900"
      >
        {{ formattedCurrentExpense }}
        <span class="self-end text-4xl">円</span>
      </span>
    </div>
  </TheCard>
</template>
