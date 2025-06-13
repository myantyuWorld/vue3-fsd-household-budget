<script setup lang="ts">
  import { formatYearMonth } from '@/shared/util/string'
  import { GridCol2 } from '@/shared/ui/layouts'

  defineProps<{
    operatingCurrentDate: Date
    summarizeAmount: number
    summarizeCategoryLimitAmount: number
  }>()

  defineEmits<{
    clickMonthlyPrev: []
    clickMonthlyNext: []
  }>()
</script>

<template>
  <div class="max-w-4xl mx-auto flex items-center justify-between">
    <button
      @click="$emit('clickMonthlyPrev')"
      class="group flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-primary-bg to-primary-light text-primary hover:from-primary-light hover:to-primary transform hover:scale-110 transition-all shadow-soft hover:shadow-lg"
      aria-label="前の月"
    >
      <span class="text-2xl font-bold select-none">&lt;</span>
    </button>

    <div class="flex items-center">
      <router-link
        :to="`/summary/calender/2025-02`"
        class="group flex items-center gap-4 hover:scale-105 transition-transform duration-300"
      >
        <h1
          class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark"
        >
          {{ formatYearMonth(operatingCurrentDate) }}
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          class="text-primary group-hover:rotate-12 transition-transform duration-300"
        >
          <path
            fill="currentColor"
            d="M11 14v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zm-4 4v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zM3 22V4h3V2h2v2h8V2h2v2h3v18zm2-2h14V10H5zM5 8h14V6H5zm0 0V6z"
          />
        </svg>
      </router-link>
    </div>

    <button
      @click="$emit('clickMonthlyNext')"
      class="group flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-primary-bg to-primary-light text-primary hover:from-primary-light hover:to-primary transform hover:scale-110 transition-all duration-300 shadow-soft hover:shadow-lg"
      aria-label="次の月"
    >
      <span class="text-2xl font-bold select-none">&gt;</span>
    </button>
  </div>

  <GridCol2>
    <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
      <div class="text-center">
        <p class="text-sm text-gray-600">今月の支出</p>
        <p class="text-2xl font-bold text-primary">
          ¥{{ summarizeAmount.toLocaleString() }}
        </p>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
      <div class="text-center">
        <p class="text-sm text-gray-600">今月の予算</p>
        <p class="text-2xl font-bold text-primary">
          ¥{{ summarizeCategoryLimitAmount.toLocaleString() }}
        </p>
      </div>
    </div>
  </GridCol2>
</template>
