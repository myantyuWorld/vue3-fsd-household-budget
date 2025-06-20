import { onBeforeMount, onMounted, ref } from 'vue'
import { nextTick } from 'vue'
import type { ChatMessagePresenter } from '../types/chat-message'
// import { POST } from '@/shared/api'

export const useInteraction = () => {
  const messages = ref<ChatMessagePresenter[]>([])
  const newMessage = ref('')
  const isLoading = ref(false)
  const messagesContainer = ref<HTMLElement>()
  let ws: WebSocket

  // メッセージ送信
  const sendMessage = async () => {
    if (!newMessage.value.trim() || isLoading.value) return

    console.log(newMessage.value)

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

  // 最下部にスクロール
  const scrollToBottom = async () => {
    await nextTick()
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  }

  onBeforeMount(async () => {
    const wsUrl = `${import.meta.env.VITE_WEBSOCKET_URL_CHAT}?householdID=1`
    console.log('WebSocket接続URL:', wsUrl)
    console.log(
      '環境変数 VITE_WEBSOCKET_URL_CHAT:',
      import.meta.env.VITE_WEBSOCKET_URL_CHAT
    )

    try {
      ws = new WebSocket(wsUrl)
      console.log('WebSocketインスタンス作成:', ws)

      ws.onopen = event => {
        console.log('WebSocket接続が開きました:', event)
      }

      ws.onmessage = event => {
        console.log('WebSocketメッセージ受信:', JSON.parse(event.data))

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

  // const fetchMessages = async (offset: number = 0) => {
  //   const { data, error } = await GET('/chat/messages', {
  //     params: {
  //       path: {
  //         householdID: 1
  //       },
  //       query: {
  //         limit: 10,
  //         offset: offset
  //       }
  //     }
  //   })
  //   if (error) {
  //     console.error(error)
  //     return []
  //   }

  //   return data
  // }

  // 初期メッセージ
  onMounted(async () => {
    console.log('初期メッセージ')
    ws.send(
      JSON.stringify({
        methodType: 'fetch',
        householdID: 1,
        limit: 10,
        offset: 0
      })
    )
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
