<script setup lang="ts">
import { Calendar } from 'v-calendar'
import 'v-calendar/style.css'
import { useInteraction } from '../hooks/useInteraction'
const props = defineProps<{
  date: string
}>()

const { calenderAttributes } = useInteraction({ id: () => props.date })
</script>

<template>
  <Calendar :date="props.date" expanded :attributes="calenderAttributes" />
</template>

<style>
.vc-title {
  font-size: 1.5rem;
}

.vc-day-content {
  height: 80px;
}
</style>
