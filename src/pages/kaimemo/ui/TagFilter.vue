<script setup lang="ts">
  import type { components } from '@/shared/api/v1.d'
  defineProps<{
    categoryLimit: components['schemas']['CategoryLimit'][]
  }>()

  const selectedFilters = defineModel<number>()

  const clickFilter = (id: number) => {
    selectedFilters.value = selectedFilters.value === id ? undefined : id
  }
</script>

<template>
  <ul
    class="flex flex-wrap gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
  >
    <template
      v-for="item in categoryLimit"
      :key="item.id"
    >
      <li
        class="flex-1 min-w-[100px] border-2 border-gray-200 dark:border-gray-700 rounded-lg"
      >
        <button
          @click="clickFilter(item.category.id)"
          class="w-full flex items-center justify-center gap-2 p-2 rounded-lg transition-all duration-200"
          :class="[
            selectedFilters === item.category.id
              ? 'bg-primary-bg dark:bg-primary-dark/30 ring-2 ring-primary-light dark:ring-primary-light text-white dark:text-primary-light font-bold'
              : 'hover:bg-primary-bg dark:hover:bg-primary-dark/30 text-white dark:text-primary-light'
          ]"
        >
          <span class="text-sm">
            {{ item.category.name }}
          </span>
        </button>
      </li>
    </template>
  </ul>
</template>
