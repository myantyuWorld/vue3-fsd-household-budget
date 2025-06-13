<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h2 class="text-xl font-bold text-gray-900">
                Kaimemo!管理者画面
              </h2>
            </div>
          </div>
          <div class="flex items-center">
            <router-link
              to="/"
              class="text-gray-600 hover:text-gray-900"
            >
              ホームに戻る
            </router-link>
          </div>
        </div>
      </div>
    </header>
    <nav class="bg-gray-800 fixed left-0 top-16 h-full w-64">
      <div class="px-4 py-6">
        <div class="space-y-4">
          <router-link
            to="/admin/informations"
            class="block text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
            お知らせ管理
          </router-link>
        </div>
      </div>
    </nav>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ml-64">
      <slot></slot>
    </div>
  </div>
</template>
