import { onBeforeMount, ref } from 'vue'
import { nextTick } from 'vue'
import type { ChatMessagePresenter } from '../types/chat-message'

export const useInteraction = () => {
  const messages = ref<ChatMessagePresenter[]>([])
  const newMessage = ref('')
  const isLoading = ref(false)
  const messagesContainer = ref<HTMLElement>()
  let ws: WebSocket

  const sendMessage = async () => {
    if (!newMessage.value.trim() || isLoading.value) return

    ws.send(
      JSON.stringify({
        methodType: 'register',
        householdID: 1,
        message: newMessage.value
      })
    )

    messages.value.push({
      id: 1,
      user_id: 1,
      user_name: 'ユーザー',
      content: newMessage.value,
      message_type: 'user',
      created_at: new Date().toISOString()
    })

    newMessage.value = ''
    scrollToBottom()
  }

  const scrollToBottom = async () => {
    await nextTick()
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  }

  onBeforeMount(async () => {
    const wsUrl = `${import.meta.env.VITE_WEBSOCKET_URL_CHAT}?householdID=1`

    try {
      ws = new WebSocket(wsUrl)
      ws.onopen = event => {
        console.log('WebSocket接続が開きました:', event)
      }
      ws.onmessage = event => {
        messages.value.push(JSON.parse(event.data))
      }
      ws.onerror = error => {
        console.error('WebSocketエラー:', error)
      }
      ws.onclose = event => {
        console.log('WebSocket接続が閉じられました:', event)
        console.log('閉じられた理由:', event.code, event.reason)
      }
    } catch (error) {
      console.error('WebSocket接続エラー:', error)
    }
  })

  return {
    messages,
    newMessage,
    isLoading,
    messagesContainer,
    sendMessage,
    scrollToBottom
  }
}
