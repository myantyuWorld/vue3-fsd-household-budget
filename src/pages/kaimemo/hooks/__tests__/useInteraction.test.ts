import { describe, it, expect, vi } from 'vitest'
import { useInteraction } from '../useInteraction'
import { ref } from 'vue'

// Vueのライフサイクルフックをモック
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: vi.fn()
  }
})

// モックの設定
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    currentRoute: {
      value: {
        query: {
          share: 'test-user-id'
        }
      }
    }
  }))
}))

vi.mock('vee-validate', () => ({
  useForm: vi.fn(() => ({
    defineField: vi.fn(),
    errors: ref({}),
    handleSubmit: vi.fn((fn) => fn),
    setValues: vi.fn()
  }))
}))

// WebSocketのモック（最小限）
class MockWebSocket {
  onmessage: ((event: MessageEvent) => void) | null = null
  send = vi.fn()
  close = vi.fn()
}

// グローバルWebSocketのモック
vi.stubGlobal('WebSocket', MockWebSocket)

// localStorageのモック（最小限）
vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn()
})

describe('useInteraction', () => {
  it('初期化時に正しく設定される', () => {
    const { items, isOpenModal, selectedFilters, loading } = useInteraction()
    
    expect(items.value).toBeUndefined()
    expect(isOpenModal.value).toBe(false)
    expect(selectedFilters.value).toEqual([])
    expect(loading.value).toBe(true)
  })

  it('onClickOpenAddItemModalが呼ばれると、isOpenModalがtrueになる', () => {
    const { isOpenModal, onClickOpenAddItemModal } = useInteraction()
    
    onClickOpenAddItemModal()
    
    expect(isOpenModal.value).toBe(true)
  })

  it('onClickCloseAddItemModalが呼ばれると、isOpenModalがfalseになる', () => {
    const { isOpenModal, onClickCloseAddItemModal } = useInteraction()
    
    // まずtrueに設定
    isOpenModal.value = true
    
    onClickCloseAddItemModal()
    
    expect(isOpenModal.value).toBe(false)
  })

  it('filteredItemsが正しく計算される', () => {
    const { items, selectedFilters, filteredItems } = useInteraction()
    
    // 初期データを設定
    items.value = [
      { id: '1', name: '牛乳', tag: '食費', done: false },
      { id: '2', name: 'パン', tag: '食費', done: false },
      { id: '3', name: '洗剤', tag: '日用品', done: false }
    ]
    
    // フィルターがない場合は全てのアイテムが返される
    expect(filteredItems.value).toEqual(items.value)
    
    // フィルターを設定
    selectedFilters.value = ['食費']
    
    // フィルターに一致するアイテムのみが返される
    expect(filteredItems.value).toEqual([
      { id: '1', name: '牛乳', tag: '食費', done: false },
      { id: '2', name: 'パン', tag: '食費', done: false }
    ])
  })
}) 