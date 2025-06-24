<script setup lang="ts">
  import type { ChatMessagePresenter } from '../types/chat-message'
  import { formatDateFromDateTime } from '@/shared/util/string'

  defineProps<{
    message: ChatMessagePresenter
  }>()
</script>

<template>
  <div
    :class="[
      'bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-1 mb-4',
      message.message_type === 'user'
        ? 'ml-auto max-w-[80%]'
        : 'mr-auto max-w-[80%]'
    ]"
  >
    <div class="flex items-start gap-3">
      <!-- アバター -->
      <div class="flex-shrink-0">
        <div
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm',
            message.message_type === 'user'
              ? 'bg-indigo-600 dark:bg-indigo-500'
              : 'bg-green-600 dark:bg-green-500'
          ]"
        >
          <span v-if="message.message_type === 'user'">
            {{ message.user_name?.charAt(0) || 'U' }}
          </span>
          <span v-else>🤖</span>
        </div>
      </div>

      <!-- メッセージコンテンツ -->
      <div class="flex-1 min-w-0">
        <!-- ヘッダー情報 -->
        <div class="flex gap-2 flex-nowrap items-center min-w-0 mb-2">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ message.user_name || 'AI Assistant' }}
          </p>
          <span
            v-if="message.message_type === 'ai'"
            class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 whitespace-nowrap min-w-[48px] justify-center"
          >
            AI回答
          </span>
          <p class="text-xs text-gray-400 dark:text-gray-500">
            {{ formatDateFromDateTime(new Date(message.created_at)) }}
          </p>
        </div>

        <!-- メッセージ本文 -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <p class="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
            {{ message.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
