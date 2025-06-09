<script setup lang="ts">
import { useInteraction } from '@/pages/login/hooks/useInteraction'

const { isLoading, onClickLogin } = useInteraction()
</script>

<template>
  <div class="min-h-screen bg-primary-bg flex flex-col items-center justify-center p-4">
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
        <span v-if="isLoading" class="flex items-center gap-2 text-white">
          <i-mdi-loading class="animate-spin h-5 w-5" />
          ログイン中...
        </span>
        <span v-else class="text-white">LINEでログイン</span>
      </button>
    </div>

    <!-- HACK: 今後、お知らせを追加する場合はここに追加する -->
    <div
      class="mt-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-h-[400px] overflow-y-auto"
    >
      <h3
        class="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 py-2"
      >
        お知らせ
      </h3>
      <div class="space-y-4">
        <div class="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
          <p class="text-base font-bold text-green-800 dark:text-green-200">2025/06/XX</p>
          <p class="text-base font-bold text-green-800 dark:text-green-200">
            🎉 レシート分析結果を買い物金額行から閲覧できるようになりました！
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-200">
            買い物金額行をタップすることで、レシート分析結果を閲覧できます。
          </p>
        </div>
      </div>
      <hr class="my-4 border-gray-200 dark:border-gray-700" />
      <div class="space-y-4">
        <div class="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
          <p class="text-base font-bold text-green-800 dark:text-green-200">2025/06/06</p>
          <p class="text-base font-bold text-green-800 dark:text-green-200">
            🎉 レシート解析機能が追加されました！
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-200">
            レシートの分析を実施した者を支出に反映する機能を追加しました。
            <br />
            ※但し、分析結果の買い物のレシート、品物リスト表示機能はまだ実装していません。
          </p>
        </div>
      </div>
      <hr class="my-4 border-gray-200 dark:border-gray-700" />
      <div class="space-y-4">
        <div class="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
          <p class="text-base font-bold text-green-800 dark:text-green-200">2025/06/01</p>
          <p class="text-base font-bold text-green-800 dark:text-green-200">
            🎉 システムからのお知らせを表示できるようになりました！
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-200">
            今後は、この部分に新機能や、バグ修正のお知らせを表示します。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
