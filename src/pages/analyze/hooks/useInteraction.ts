import type { ReceiptAnalyze } from '@/shared/types/receipt'
import { onMounted, ref } from 'vue'

export const useInteraction = () => {
  const receiptAnalyzes = ref<ReceiptAnalyze[]>([])

  onMounted(() => {
    // TODO: バックエンドから取得すること
    receiptAnalyzes.value = [
      {
        id: '1',
        receiptImageURL:
          'https://www.isp21.co.jp/wp-content/uploads/solution/library/library02-1.jpg',
        analyzeStatus: 'finished',
        transferStatus: 'finished',
        date: '2021-01-01',
        totalAmount: 99999,
        items: [
          {
            name: 'Item 1',
            price: 100,
          },
        ],
      },
      {
        id: '2',
        receiptImageURL:
          'https://www.isp21.co.jp/wp-content/uploads/solution/library/library02-1.jpg',
        analyzeStatus: 'finished',
        transferStatus: 'pending',
        date: '2021-01-01',
        totalAmount: 99999,
        items: [
          {
            name: 'Item 1',
            price: 100,
          },
        ],
      },
    ]
  })

  return {
    receiptAnalyzes,
  }
}
