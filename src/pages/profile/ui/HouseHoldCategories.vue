<script setup lang="ts">
  import { TheCard, PlusButton } from '@/shared/ui'
  import CategoryLimits from './CategoryLimits.vue'
  import type { components } from '@/shared/api/v1'
  import { ref } from 'vue'

  defineProps<{
    householdBook: components['schemas']['HouseholdBook']
  }>()

  defineEmits<{
    click: [householdBookID: number]
  }>()

  const isShow = ref(false)
  const onClickShow = () => {
    console.log('aaa')
    isShow.value = !isShow.value
  }
</script>

<template>
  <TheCard
    class="bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:scale-[1.01] transition-all duration-300"
  >
    <div class="p-2">
      <div class="flex items-center justify-between mb-3">
        <div>
          <h3
            class="text-xl font-semibold text-gray-800 dark:text-gray-200 tracking-tight"
          >
            カテゴリー別予算
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
            各カテゴリーの月間予算上限を設定
          </p>
        </div>
        <button
          @click="onClickShow"
          class="text-white transition-colors duration-300 transform hover:rotate-180"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <template v-if="isShow">
        <CategoryLimits :categoryLimits="householdBook.categoryLimit" />
      </template>
      <div class="flex justify-end mt-6">
        <PlusButton
          @click="$emit('click', householdBook.id)"
          :isFixed="false"
        />
      </div>
    </div>
  </TheCard>
</template>
