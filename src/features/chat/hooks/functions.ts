import type { components } from '@/shared/api/v1'
import { formatDateFromDateTime } from '@/shared/util/string'

export const convertToChatMessagePresenter = (
  message: components['schemas']['ChatMessage']
) => {
  return {
    id: message.id || 0,
    user_id: message.userID || 0,
    user_name: message.userName || '',
    content: message.content || '',
    message_type: message.messageType || 'user',
    created_at: formatDateFromDateTime(new Date(message.createdAt || ''))
  }
}
