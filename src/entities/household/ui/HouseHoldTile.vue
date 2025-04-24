<script setup lang="ts">
import type { components } from '@/shared/api/v1';

defineProps<{
  householdBooks: components['schemas']['HouseholdBook'][]
}>()

const selectedHouseholdBook = defineModel<components['schemas']['HouseholdBook'] | null>('modelValue')
</script>

<template>
  <div class="m-4">
    <div class="relative">
      <div class="flex overflow-x-auto gap-4 pb-4">
        <div
          v-for="householdBook in householdBooks"
          :key="householdBook.id"
          @click="selectedHouseholdBook = householdBook"
          class="p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 min-w-[150px] flex-shrink-0 shadow-sm"
          :class="[
            selectedHouseholdBook?.id === householdBook.id
              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 shadow-md'
              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700/50'
          ]"
        >
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ householdBook.title }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ householdBook.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
