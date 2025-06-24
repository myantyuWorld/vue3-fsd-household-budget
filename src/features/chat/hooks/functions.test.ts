import { describe, it, expect } from 'vitest'
import { convertToChatMessagePresenter } from './functions'
import type { components } from '@/shared/api/v1'

describe('convertToChatMessagePresenter', () => {
  it('ChatMessageをChatMessagePresenterに正しく変換する', () => {
    const mockChatMessage: components['schemas']['ChatMessage'] = {
      id: 1,
      userID: 123,
      userName: 'テストユーザー',
      content: 'こんにちは！',
      messageType: 'user',
      createdAt: '2025-06-20T12:00:00Z'
    }

    const result = convertToChatMessagePresenter(mockChatMessage)

    expect(result).toEqual({
      id: 1,
      user_id: 123,
      user_name: 'テストユーザー',
      content: 'こんにちは！',
      message_type: 'user',
      created_at: '2025/06/20(金) 21:00'
    })
  })

  it('AIアシスタントのメッセージも正しく変換する', () => {
    const mockAIMessage: components['schemas']['ChatMessage'] = {
      id: 2,
      userID: 0,
      userName: 'AI Assistant',
      content: '家計について分析しました。',
      messageType: 'ai',
      createdAt: '2025-06-20T12:01:00Z'
    }

    const result = convertToChatMessagePresenter(mockAIMessage)

    expect(result).toEqual({
      id: 2,
      user_id: 0,
      user_name: 'AI Assistant',
      content: '家計について分析しました。',
      message_type: 'ai',
      created_at: '2025/06/20(金) 21:01'
    })
  })

  it('空のコンテンツでも正しく変換する', () => {
    const mockEmptyMessage: components['schemas']['ChatMessage'] = {
      id: 3,
      userID: 456,
      userName: '空メッセージユーザー',
      content: '',
      messageType: 'user',
      createdAt: '2025-06-20T12:02:00Z'
    }

    const result = convertToChatMessagePresenter(mockEmptyMessage)

    expect(result).toEqual({
      id: 3,
      user_id: 456,
      user_name: '空メッセージユーザー',
      content: '',
      message_type: 'user',
      created_at: '2025/06/20(金) 21:02'
    })
  })

  it('長いコンテンツでも正しく変換する', () => {
    const longContent = 'これは非常に長いメッセージです。'.repeat(100)
    const mockLongMessage: components['schemas']['ChatMessage'] = {
      id: 4,
      userID: 789,
      userName: '長文ユーザー',
      content: longContent,
      messageType: 'user',
      createdAt: '2025-06-20T12:03:00Z'
    }

    const result = convertToChatMessagePresenter(mockLongMessage)

    expect(result).toEqual({
      id: 4,
      user_id: 789,
      user_name: '長文ユーザー',
      content: longContent,
      message_type: 'user',
      created_at: '2025/06/20(金) 21:03'
    })
  })
})
