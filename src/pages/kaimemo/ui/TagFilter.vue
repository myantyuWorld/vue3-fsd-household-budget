<script setup lang="ts">
const selectedFilters = defineModel<string[]>()
</script>

<template>
  <ul
    class="flex items-center w-full text-sm font-medium text-gray-900 bg-white  border-gray-200  sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
  >
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
      <div class="flex items-center ps-3">
        <input
          id="vue-checkbox-list"
          type="checkbox"
          value="食費"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          v-model="selectedFilters"
        />
        <label
          for="vue-checkbox-list"
          class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >食費</label
        >
      </div>
    </li>
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
      <div class="flex items-center ps-3">
        <input
          id="react-checkbox-list"
          type="checkbox"
          value="日用品"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          v-model="selectedFilters"
        />
        <label
          for="react-checkbox-list"
          class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >日用品</label
        >
      </div>
    </li>
  </ul>
</template>
