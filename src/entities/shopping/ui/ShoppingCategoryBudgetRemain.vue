<script setup lang="ts">
  import type { components } from '@/shared/api/v1'
  import { computed } from 'vue'

  const props = defineProps<{
    categoryAmount: components['schemas']['CategoryAmount']
    limitAmount: number
    selectedCategoryNumber: number
  }>()

  const availableAmount = computed(() => {
    return props.limitAmount - props.categoryAmount.amount
  })

  defineEmits<{
    clickCategoryLimit: [categoryID: number]
  }>()

  const isSelected = computed(() => {
    return props.selectedCategoryNumber === props.categoryAmount.category.id
  })
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-2"
    :class="{
      'bg-green-200 border-green-500 ring-2 ring-green-500': isSelected,
      'border-transparent hover:border-gray-200': !isSelected
    }"
  >
    <div
      class="text-center space-y-2"
      @click="$emit('clickCategoryLimit', categoryAmount.category.id)"
    >
      <p class="text-lg text-gray-500 dark:text-gray-400">
        {{ categoryAmount.category.name }}
      </p>
      <div class="space-y-1">
        <p class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          ¥{{ categoryAmount.amount.toLocaleString() }}
        </p>
        <p
          :class="[
            'text-sm',
            availableAmount > 5000
              ? 'text-green-500 dark:text-green-400'
              : availableAmount > 2000
                ? 'text-yellow-500 dark:text-yellow-400'
                : 'text-red-500 dark:text-red-400'
          ]"
        >
          残り ¥{{ availableAmount.toLocaleString() }}
        </p>
      </div>
    </div>
  </div>
</template>
