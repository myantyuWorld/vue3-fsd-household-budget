<script setup lang="ts">
  import {
    ChatHeader,
    ChatMessageInput,
    ChatMessageList
  } from '@/features/chat'
  import { useInteraction } from '@/features/chat/hooks/useInteraction'

  const {
    messages,
    newMessage,
    isLoading,
    messagesContainer,
    sendMessage,
    scrollToBottom
  } = useInteraction()
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <ChatHeader />

    <ChatMessageList
      :messages="messages"
      :messages-container="messagesContainer"
      :scroll-to-bottom="scrollToBottom"
    />

    <ChatMessageInput
      v-model:new-message="newMessage"
      :is-loading="isLoading"
      @send-message="sendMessage"
    />
  </div>
</template>
