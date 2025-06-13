<script setup lang="ts">
  import type { components } from '@/shared/api/v1'
  import { ShoppingCategoryIcon } from '@/entities/shopping'

  defineProps<{
    shoppingMemo: components['schemas']['ShoppingMemo']
  }>()

  defineEmits<{
    click: [id: number]
  }>()
</script>

<template>
  <div
    class="card flex items-center justify-between hover:shadow-lg transition-shadow duration-300 m-4"
  >
    <div class="flex items-center gap-4">
      <div class="bg-primary-bg rounded-full">
        <ShoppingCategoryIcon
          :categoryName="shoppingMemo.category.name"
          class="text-primary"
        />
      </div>
      <div>
        <p class="font-medium text-gray-800">
          {{ shoppingMemo.title }}
        </p>
        <p class="text-sm text-gray-600">
          {{ shoppingMemo.memo }}
        </p>
      </div>
    </div>
    <div>
      <button
        @click="$emit('click', shoppingMemo.id)"
        class="text-primary hover:text-primary-dark p-2 rounded-full hover:bg-primary-bg transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="transform hover:rotate-90 transition-transform duration-300"
        >
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
