import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useKaimemoSummary } from '../useKaimemoSummary'
import type { components } from '@/shared/api/v1'

// モックセッションストア
const mockSessionStore = {
  user: {
    householdBooks: [
      {
        id: 1,
        title: 'テスト家計簿',
        categoryLimit: [
          {
            id: 1,
            category: { id: 1, name: '食費', color: '#FF0000' },
            limitAmount: 30000
          },
          {
            id: 2,
            category: { id: 2, name: '交通費', color: '#00FF00' },
            limitAmount: 10000
          }
        ]
      }
    ]
  }
}

// モック
vi.mock('@/entities/session/model/session-store', () => ({
  useSessionStore: () => mockSessionStore
}))

vi.mock('@/features/kaimemo', () => ({
  useAmountSummaryStore: () => ({
    mutationShoppingRecords: vi.fn()
  })
}))

// API呼び出しのモック
vi.mock('@/shared/api', () => ({
  GET: vi.fn().mockResolvedValue({ data: null, error: null }),
  DELETE: vi.fn().mockResolvedValue({ error: null }),
  PUT: vi.fn().mockResolvedValue({ error: null })
}))

// フォームのモック
vi.mock('vee-validate', () => ({
  useForm: () => ({
    defineField: () => [vi.fn(), {}],
    errors: {},
    handleSubmit: (fn: unknown) => fn
  })
}))

// 分析スキーマのモック
vi.mock('@/features/analyze', () => ({
  analyzeSchema: {},
  type: 'AnalyzeSchema'
}))

describe('useKaimemoSummary 編集機能', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('初期状態では編集モーダルが閉じている', () => {
    const {
      isOpenEditModal,
      editRecord
    } = useKaimemoSummary()

    expect(isOpenEditModal.value).toBe(false)
    expect(editRecord.value).toBeNull()
  })

  it('onClickEditAmountRecord で編集モーダルが開き、編集対象レコードが設定される', () => {
    const {
      onClickEditAmountRecord,
      isOpenEditModal,
      editRecord
    } = useKaimemoSummary()

    const testRecord: components['schemas']['ShoppingRecord'] = {
      id: 123,
      amount: 1500,
      date: '2024-01-15',
      memo: 'テストメモ',
      category: { id: 1, name: '食費', color: '#FF0000' },
      analyze_id: 0
    }

    onClickEditAmountRecord(testRecord)

    expect(isOpenEditModal.value).toBe(true)
    expect(editRecord.value).toEqual(testRecord)
  })

  it('onClickCloseEditAmountModal で編集モーダルが閉じて編集対象レコードがクリアされる', () => {
    const {
      onClickEditAmountRecord,
      onClickCloseEditAmountModal,
      isOpenEditModal,
      editRecord
    } = useKaimemoSummary()

    const testRecord: components['schemas']['ShoppingRecord'] = {
      id: 123,
      amount: 1500,
      date: '2024-01-15',
      memo: 'テストメモ',
      category: { id: 1, name: '食費', color: '#FF0000' },
      analyze_id: 0
    }

    // 編集モーダルを開く
    onClickEditAmountRecord(testRecord)
    expect(isOpenEditModal.value).toBe(true)
    expect(editRecord.value).toEqual(testRecord)

    // 編集モーダルを閉じる
    onClickCloseEditAmountModal()
    expect(isOpenEditModal.value).toBe(false)
    expect(editRecord.value).toBeNull()
  })

  it('編集モーダルが開いている間、正しい編集対象レコードが保持される', () => {
    const {
      onClickEditAmountRecord,
      editRecord
    } = useKaimemoSummary()

    const testRecord1: components['schemas']['ShoppingRecord'] = {
      id: 123,
      amount: 1500,
      date: '2024-01-15',
      memo: 'テストメモ1',
      category: { id: 1, name: '食費', color: '#FF0000' },
      analyze_id: 0
    }

    const testRecord2: components['schemas']['ShoppingRecord'] = {
      id: 456,
      amount: 2000,
      date: '2024-01-16',
      memo: 'テストメモ2',
      category: { id: 2, name: '交通費', color: '#00FF00' },
      analyze_id: 0
    }

    // 最初のレコードで編集モーダルを開く
    onClickEditAmountRecord(testRecord1)
    expect(editRecord.value).toEqual(testRecord1)

    // 別のレコードで編集モーダルを開く（既存のモーダルが置き換わる）
    onClickEditAmountRecord(testRecord2)
    expect(editRecord.value).toEqual(testRecord2)
  })
})