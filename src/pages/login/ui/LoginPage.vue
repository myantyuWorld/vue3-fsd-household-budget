<script setup lang="ts">
  import { useInteraction } from '@/pages/login/hooks/useInteraction'

  const { isLoading, onClickLogin } = useInteraction()
</script>

<template>
  <div
    class="min-h-screen bg-primary-bg flex flex-col items-center justify-center p-4"
  >
    <div class="card w-full max-w-md text-center space-y-8">
      <h2
        class="text-4xl font-bold bg-gradient-to-r from-primary via-primary-dark to-primary-light bg-clip-text text-transparent"
      >
        Kaimemo！
      </h2>
      <div class="space-y-2">
        <p class="text-sm text-gray-600 max-w-xs mx-auto">
          家計簿の管理を簡単に。LINEアカウントでログインして、あなたの家計簿管理を始めましょう。
        </p>
        <p class="text-sm text-gray-600 max-w-xs mx-auto">
          複数の家計簿を作成したり、カテゴリを自由にカスタマイズして、あなたのライフスタイルに合わせた家計簿管理が可能です。
        </p>
      </div>
      <button
        @click="onClickLogin"
        class="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-xl bg-gradient-to-r from-[#06C755] to-[#00B900] hover:from-[#00B900] hover:to-[#06C755] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#06C755] transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
        :disabled="isLoading"
      >
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <i-mdi-line
            class="h-6 w-6 text-white group-hover:text-white transition-colors duration-300"
          />
        </span>
        <span
          v-if="isLoading"
          class="flex items-center gap-2 text-white"
        >
          <i-mdi-loading class="animate-spin h-5 w-5" />
          ログイン中...
        </span>
        <span
          v-else
          class="text-white"
        >
          LINEでログイン
        </span>
      </button>
    </div>
  </div>
</template>
