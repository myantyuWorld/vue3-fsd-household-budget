export type ChatMessagePresenter = {
  id: number
  user_id: number
  user_name: string
  content: string
  message_type: 'user' | 'ai'
  created_at: string
}
