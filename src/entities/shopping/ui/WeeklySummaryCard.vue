<script setup lang="ts">
  import type { components } from '@/shared/api/v1'
  import { computed } from 'vue'

  const props = defineProps<{
    weeklySummary: components['schemas']['WeeklySummary'] | null
    currentDate: Date
  }>()

  const emit = defineEmits<{
    'week-prev': []
    'week-next': []
  }>()

  const formatWeekRange = computed(() => {
    if (!props.weeklySummary?.weekStart || !props.weeklySummary?.weekEnd) {
      return ''
    }
    
    const startDate = new Date(props.weeklySummary.weekStart)
    const endDate = new Date(props.weeklySummary.weekEnd)
    
    const formatDate = (date: Date) => {
      return `${date.getMonth() + 1}/${date.getDate()}`
    }
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  })

  const totalAmount = computed(() => {
    return props.weeklySummary?.totalAmount || 0
  })

  const canGoPrev = computed(() => {
    const currentWeekStart = new Date(props.currentDate)
    currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay())
    
    // 例: 2024年1月1日以降の週のみ表示可能とする
    const minDate = new Date('2024-01-01')
    const prevWeekStart = new Date(currentWeekStart)
    prevWeekStart.setDate(prevWeekStart.getDate() - 7)
    
    return prevWeekStart >= minDate
  })

  const canGoNext = computed(() => {
    const currentWeekStart = new Date(props.currentDate)
    currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay())
    
    const nextWeekStart = new Date(currentWeekStart)
    nextWeekStart.setDate(nextWeekStart.getDate() + 7)
    
    const today = new Date()
    const todayWeekStart = new Date(today)
    todayWeekStart.setDate(todayWeekStart.getDate() - todayWeekStart.getDay())
    
    return nextWeekStart <= todayWeekStart
  })
</script>

<template>
  <div class="bg-white/90 dark:from-gray-800 dark:to-gray-700 rounded-xl p-2 shadow-lg">
    <div class="text-center">
      <div class="flex items-center justify-between">
        <button 
          @click="emit('week-prev')"
          class="p-2 rounded-full hover:bg-primary-light dark:hover:bg-gray-600 transition-colors"
          :class="{ 'opacity-50 cursor-not-allowed': !canGoPrev }"
          :disabled="!canGoPrev"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">
            週の支出
          </h3>
        </div>
        
        <button 
          @click="emit('week-next')"
          class="p-2 rounded-full hover:bg-primary-light dark:hover:bg-gray-600 transition-colors"
          :class="{ 'opacity-50 cursor-not-allowed': !canGoNext }"
          :disabled="!canGoNext"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      
      <div class="">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ formatWeekRange }}
        </p>
        <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">
          ¥{{ totalAmount.toLocaleString() }}
        </p>
      </div>
      
      <div v-if="weeklySummary?.items && weeklySummary.items.length > 0" class="pt-2">
        <p class="text-xs text-gray-500 dark:text-gray-400">
          {{ weeklySummary.items.length }}件の支出
        </p>
      </div>
    </div>
  </div>
</template>