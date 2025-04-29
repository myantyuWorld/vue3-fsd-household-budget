<script setup lang="ts">
import type { components } from '@/shared/api/v1'

defineProps<{
  householdBooks: components['schemas']['HouseholdBook'][]
}>()

const selectedHouseholdBook = defineModel<components['schemas']['HouseholdBook'] | null>(
  'modelValue',
)
</script>

<template>
  <div class="m-4">
    <div class="flex overflow-x-auto gap-4">
      <div
        v-for="householdBook in householdBooks"
        :key="householdBook.id"
        @click="selectedHouseholdBook = householdBook"
        class="card p-4 cursor-pointer transition-all duration-300 min-w-[150px] flex-shrink-0"
        :class="[
          selectedHouseholdBook?.id === householdBook.id
            ? 'border-2 border-primary bg-gradient-to-br from-primary-bg to-primary-light/20 shadow-soft'
            : 'hover:border-2 hover:border-primary-light hover:bg-primary-bg/30',
        ]"
      >
        <h3 class="text-lg font-medium text-gray-800">{{ householdBook.title }}</h3>
        <p class="text-sm text-gray-600 mt-2">{{ householdBook.description }}</p>
      </div>
    </div>
  </div>
</template>
