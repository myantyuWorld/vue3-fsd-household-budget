import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useKaimemoSummary } from '../useKaimemoSummary'
import { ref } from 'vue'

// モックの設定
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    onMounted: vi.fn(),
    watch: vi.fn()
  }
})

vi.mock('@/shared/api', () => ({
  GET: vi.fn(),
  POST: vi.fn(),
  DELETE: vi.fn()
}))

vi.mock('@vee-validate/zod', () => ({
  toTypedSchema: vi.fn()
}))

vi.mock('vee-validate', () => ({
  useForm: vi.fn(() => ({
    defineField: vi.fn(() => [ref(''), {}]),
    errors: ref({}),
    handleSubmit: vi.fn(fn => fn)
  }))
}))

vi.mock('@/features/kaimemo', () => ({
  useAmountSummaryStore: vi.fn(() => ({
    mutationShoppingRecords: vi.fn(),
    getCurrentWeekSummary: vi.fn(() => null)
  }))
}))

vi.mock('@/entities/session/model/session-store', () => ({
  useSessionStore: vi.fn(() => ({
    user: {
      userID: 'test-user-id',
      householdBooks: [
        {
          id: 1,
          name: 'テスト家計簿',
          categoryLimit: [
            { category: { id: 1, name: '食費' }, limitAmount: 30000 },
            { category: { id: 2, name: '日用品' }, limitAmount: 10000 }
          ]
        }
      ]
    }
  }))
}))

vi.mock('@/features/analyze', () => ({
  analyzeSchema: {},
  type: 'AnalyzeSchema'
}))

describe('useKaimemoSummary', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('ソート機能', () => {
    it('初期状態では sortByAmount が false である', () => {
      const { sortByAmount } = useKaimemoSummary()
      expect(sortByAmount.value).toBe(false)
    })

    it('onClickToggleSortByAmount を呼ぶと sortByAmount が切り替わる', () => {
      const { sortByAmount, onClickToggleSortByAmount } = useKaimemoSummary()
      
      expect(sortByAmount.value).toBe(false)
      
      onClickToggleSortByAmount()
      expect(sortByAmount.value).toBe(true)
      
      onClickToggleSortByAmount()
      expect(sortByAmount.value).toBe(false)
    })
  })

  describe('selectedShoppingAmounts computed', () => {
    it('sortByAmount が false の場合、元の順序で返される', () => {
      const { selectedShoppingAmounts, summarizeShoppingAmounts, sortByAmount } = useKaimemoSummary()
      
      // テストデータを設定
      const mockShoppingAmounts = [
        { id: 1, amount: 100, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-01', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } },
        { id: 2, amount: 300, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-02', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } },
        { id: 3, amount: 200, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-03', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } }
      ]
      
      summarizeShoppingAmounts.value = {
        shoppingAmounts: mockShoppingAmounts,
        totalAmount: 600,
        categoryAmounts: []
      }
      
      sortByAmount.value = false
      
      expect(selectedShoppingAmounts.value).toEqual(mockShoppingAmounts)
    })

    it('sortByAmount が true の場合、金額の降順で返される', () => {
      const { selectedShoppingAmounts, summarizeShoppingAmounts, sortByAmount } = useKaimemoSummary()
      
      // テストデータを設定
      const mockShoppingAmounts = [
        { id: 1, amount: 100, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-01', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } },
        { id: 2, amount: 300, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-02', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } },
        { id: 3, amount: 200, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-03', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } }
      ]
      
      summarizeShoppingAmounts.value = {
        shoppingAmounts: mockShoppingAmounts,
        totalAmount: 600,
        categoryAmounts: []
      }
      
      sortByAmount.value = true
      
      const expected = [
        { id: 2, amount: 300, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-02', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } },
        { id: 3, amount: 200, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-03', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } },
        { id: 1, amount: 100, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-01', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } }
      ]
      
      expect(selectedShoppingAmounts.value).toEqual(expected)
    })

    it('カテゴリフィルターが適用されている場合でも、ソートが正しく動作する', () => {
      const { selectedShoppingAmounts, summarizeShoppingAmounts, sortByAmount, selectedCategoryNumber } = useKaimemoSummary()
      
      // テストデータを設定
      const mockShoppingAmounts = [
        { id: 1, amount: 100, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-01', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } },
        { id: 2, amount: 300, category: { id: 2, name: '日用品', color: '#00FF00' }, date: '2025-01-02', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } },
        { id: 3, amount: 200, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-03', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } },
        { id: 4, amount: 400, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-04', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } }
      ]
      
      summarizeShoppingAmounts.value = {
        shoppingAmounts: mockShoppingAmounts,
        totalAmount: 1000,
        categoryAmounts: []
      }
      
      // カテゴリ1でフィルター
      selectedCategoryNumber.value = 1
      sortByAmount.value = true
      
      const expected = [
        { id: 4, amount: 400, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-04', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } },
        { id: 3, amount: 200, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-03', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } },
        { id: 1, amount: 100, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-01', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } }
      ]
      
      expect(selectedShoppingAmounts.value).toEqual(expected)
    })

    it('データが空の場合、空配列を返す', () => {
      const { selectedShoppingAmounts, summarizeShoppingAmounts, sortByAmount } = useKaimemoSummary()
      
      summarizeShoppingAmounts.value = undefined
      sortByAmount.value = true
      
      expect(selectedShoppingAmounts.value).toEqual([])
    })

    it('同じ金額の場合、元の順序を保持する', () => {
      const { selectedShoppingAmounts, summarizeShoppingAmounts, sortByAmount } = useKaimemoSummary()
      
      // 同じ金額のテストデータを設定
      const mockShoppingAmounts = [
        { id: 1, amount: 100, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-01', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } },
        { id: 2, amount: 200, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-02', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } },
        { id: 3, amount: 100, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-03', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } }
      ]
      
      summarizeShoppingAmounts.value = {
        shoppingAmounts: mockShoppingAmounts,
        totalAmount: 400,
        categoryAmounts: []
      }
      
      sortByAmount.value = true
      
      const expected = [
        { id: 2, amount: 200, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-02', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } },
        { id: 1, amount: 100, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-01', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } },
        { id: 3, amount: 100, category: { id: 1, name: '食費', color: '#FF0000' }, date: '2025-01-03', memo: '', analyze_id: 0, receipt_analyze_results: { id: 0, totalAmount: 0, receiptImageURL: '', items: [] } }
      ]
      
      expect(selectedShoppingAmounts.value).toEqual(expected)
    })
  })

})