<script setup lang="ts">
import { useInteraction } from '@/pages/login/hooks/useInteraction';

const {
  isLoading,
  onClickLogin
} = useInteraction()
</script> 

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
    <div class="text-center space-y-8">
      <h2 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
        MyHouseHold
      </h2>
      <div class="space-y-2">
        <p class="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
          家計簿の管理を簡単に。LINEアカウントでログインして、あなたの家計簿管理を始めましょう。
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
          複数の家計簿を作成したり、カテゴリを自由にカスタマイズして、あなたのライフスタイルに合わせた家計簿管理が可能です。
        </p>
      </div>
      <button
        @click="onClickLogin"
        class="group relative w-full max-w-xs flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
        :disabled="isLoading"
      >
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <i-mdi-line class="h-6 w-6 text-green-300 group-hover:text-green-200 transition-colors duration-300" />
        </span>
        <span v-if="isLoading" class="flex items-center gap-2">
          <i-mdi-loading class="animate-spin h-5 w-5" />
          ログイン中...
        </span>
        <span v-else>LINEでログイン</span>
      </button>
    </div>
  </div>
</template>
