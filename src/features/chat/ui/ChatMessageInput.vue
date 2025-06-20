<script setup lang="ts">
  const newMessage = defineModel<string>('newMessage', { required: true })

  defineEmits<{
    sendMessage: [message: string]
  }>()
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 pb-32"
  >
    <div class="max-w-4xl mx-auto px-4 py-4">
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div class="flex gap-3">
          <input
            v-model="newMessage"
            @keyup.enter="$emit('sendMessage', newMessage)"
            placeholder="例: 今月の支出ってなんでこう多いんだろう？"
            class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <button
            @click="$emit('sendMessage', newMessage)"
            :disabled="!newMessage?.trim()"
            class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <span>送信</span>
          </button>
        </div>

        <!-- ヒント -->
        <div class="mt-3 text-xs text-gray-500 dark:text-gray-400">
          💡 よくある質問:
          「今月の支出分析」「節約のコツ」「予算管理のアドバイス」
        </div>
      </div>
    </div>
  </div>
</template>
