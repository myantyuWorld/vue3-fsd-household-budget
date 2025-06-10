<script setup lang="ts">
import type { components } from '@/shared/api/v1'
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  CalendarApp,
  createCalendar,
  createViewMonthAgenda,
  createViewMonthGrid,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { shallowRef, watch } from 'vue'

const props = defineProps<{
  shoppingAmounts: components['schemas']['SummarizeShoppingAmount']['shoppingAmounts']
}>()

const calendarApp = shallowRef<CalendarApp>()

//https://schedule-x.dev/docs/frameworks/vue
// onMountedで描画されないっぽい、描画後、なにか変更を加えると描画されるっぽい
watch(
  () => props.shoppingAmounts,
  (newAmounts) => {
    if (!newAmounts || newAmounts.length === 0) return

    calendarApp.value = createCalendar({
      selectedDate: new Date().toISOString().split('T')[0],
      views: [createViewMonthGrid(), createViewMonthAgenda()],
      events: newAmounts.map((shoppingAmount) => ({
        id: shoppingAmount.id,
        title: shoppingAmount.category.name + ' ' + shoppingAmount.amount.toLocaleString(),
        description: shoppingAmount.memo ?? '',
        start: shoppingAmount.date,
        end: shoppingAmount.date,
      })),
    })
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <ScheduleXCalendar
      v-if="calendarApp"
      :calendar-app="calendarApp"
      class="schedule-x-calendar"
      :is-dark="true"
    />
  </div>
</template>

<style scoped>
.schedule-x-calendar {
  width: 100%;
  height: 100%;
}
</style>
