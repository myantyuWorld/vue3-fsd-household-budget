<script setup lang="ts">
import { TheForm } from '@/shared/ui'
import { formatAmount } from '@/shared/util/string'
import { computed } from 'vue'

const props = defineProps<{
  startDate: string
  endDate: string
  weeklyAmount: number
}>()

const formattedWeeklyAmount = computed(() => {
  return formatAmount(props.weeklyAmount)
})
</script>

<template>
  <div class="flex items-center justify-between mb-2">
    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
      {{ startDate }} ~ {{ endDate }}
    </h5>
  </div>
  <div class="flex justify-end">
    <div class="pt-4 pb-4">
      <TheForm :label="formattedWeeklyAmount" size="4xl">
        <span class="self-end text-xl">円</span>
      </TheForm>
    </div>
  </div>
</template>
