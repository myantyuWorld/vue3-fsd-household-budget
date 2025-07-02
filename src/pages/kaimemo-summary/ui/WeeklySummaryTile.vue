<script setup lang="ts">
  import TheCard from './TheCard.vue'
  import SummaryRecordHeader from './SummaryRecordHeader.vue'
  import SummaryRecordItem from './SummaryRecordItem.vue'
  import type { components } from '@/shared/api/v1'
  import { computed } from 'vue'
  import { formatDateFromDate } from '@/shared/util/string'

  const props = defineProps<{
    date: Date
    weeklySummary: components['schemas']['WeeklySummary']
  }>()

  const getWeekDate = (offset: number) => {
    const date = new Date(props.date)
    date.setDate(date.getDate() - date.getDay() + offset)
    return formatDateFromDate(date)
  }

  const WEEK_START_OFFSET = 0
  const WEEK_END_OFFSET = 6

  const weekStart = computed(() => getWeekDate(WEEK_START_OFFSET))
  const weekEnd = computed(() => getWeekDate(WEEK_END_OFFSET))

  defineEmits<{
    onClickPrev: []
    onClickNext: []
    onClickDeleteAmountRecord: [id: string]
  }>()
</script>

<template>
  <TheCard
    class="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
  >
    <div class="flex flex-row items-center">
      <button
        @click="$emit('onClickPrev')"
        class="basis-32 flex items-center justify-center text-3xl text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300"
      >
        ＜
      </button>
      <div class="basis-224 m-2">
        <SummaryRecordHeader
          :startDate="weekStart"
          :endDate="weekEnd"
          :weeklyAmount="weeklySummary.totalAmount || 0"
        />
      </div>
      <button
        @click="$emit('onClickNext')"
        class="basis-32 flex items-center justify-center text-3xl text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300"
      >
        ＞
      </button>
    </div>

    <TheCard
      class="mt-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700"
    >
      <div class="flow-root overflow-auto max-h-96">
        <ul
          role="list"
          class="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <template
            v-for="item in weeklySummary.items"
            :key="item.id || ''"
          >
            <SummaryRecordItem
              :id="item.id || ''"
              :tag="item.tag || ''"
              :amount="item.amount || 0"
              :date="item.date || ''"
              @click="$emit('onClickDeleteAmountRecord', $event)"
            />
          </template>
        </ul>
      </div>
    </TheCard>
  </TheCard>
</template>
