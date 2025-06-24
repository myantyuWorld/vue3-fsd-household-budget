<script setup lang="ts">
  import type { ChatMessagePresenter } from '../types/chat-message'
  import ChatMessage from './ChatMessage.vue'

  defineProps<{
    messages: ChatMessagePresenter[]
  }>()
</script>

<template>
  <div class="flex-1 max-w-4xl mx-auto px-4 py-6 w-full">
    <div
      ref="messagesContainer"
      class="space-y-4 h-full overflow-y-auto"
    >
      <ChatMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </div>
  </div>
</template>
