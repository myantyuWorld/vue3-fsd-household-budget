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
  <TheCard>
    <div class="flex flex-row">
      <div class="basis-32 flex items-center text-2xl" @click="$emit('onClickPrev')">＜</div>
      <div class="basis-224 m-2">
        <SummaryRecordHeader
          :startDate="weekStart"
          :endDate="weekEnd"
          :weeklyAmount="weeklySummary.totalAmount"
        />
      </div>
      <div class="flex items-center text-2xl" @click="$emit('onClickNext')">＞</div>
    </div>

    <TheCard>
      <div class="flow-root overflow-auto">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          <template v-for="item in weeklySummary.items" :key="item.id">
            <SummaryRecordItem
              :id="item.id"
              :tag="item.tag"
              :amount="item.amount"
              :date="item.date"
              @click="$emit('onClickDeleteAmountRecord', $event)"
            />
          </template>
        </ul>
      </div>
    </TheCard>
  </TheCard>
</template>
