<script setup lang="ts">
import { useInteraction } from '@/pages/login/hooks/useInteraction';

const {
  isLoading,
  onClickLogin
} = useInteraction()
</script> 

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          買い物メモアプリ
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          LINEアカウントでログイン
        </p>
      </div>
      <div class="mt-8">
        <button
          @click="onClickLogin"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          :disabled="isLoading"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <i-mdi-line class="h-5 w-5 text-green-500 group-hover:text-green-400" />
          </span>
          <span v-if="isLoading">ログイン中...</span>
          <span v-else>LINEでログイン</span>
        </button>
      </div>
    </div>
  </div>
</template>

