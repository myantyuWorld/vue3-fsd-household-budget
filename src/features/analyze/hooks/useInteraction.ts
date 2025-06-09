import type { components } from '@/shared/api/v1'
import { ref } from 'vue'

export const useInteraction = () => {
  const receiptAnalyze = ref<components['schemas']['ReceiptAnalyzeResult']>({
    id: 0,
    totalAmount: 0,
    receiptImageURL:
      'https://micro-receipt-analyzer-receiptimagebucket-yx100uktqwj2.s3.ap-southeast-1.amazonaws.com/0067ed71-285a-4f17-99c9-ffb866ef7abc-2-1-20250605150005.jpg',
    items: [
      {
        id: 0,
        name: 'ホゲホゲ',
        amount: 100,
      },
      {
        id: 1,
        name: 'フガフガ',
        amount: 9999,
      },
      {
        id: 2,
        name: 'ホゲホゲ3',
        amount: 10000,
      },
      {
        id: 3,
        name: 'ホゲホゲ4',
        amount: 10000,
      },
      {
        id: 4,
        name: 'ホゲホゲ5',
        amount: 10000,
      },
      {
        id: 5,
        name: 'ホゲホゲ6',
        amount: 10000,
      },
      {
        id: 6,
        name: 'ホゲホゲ7',
        amount: 10000,
      },
      {
        id: 7,
        name: 'ホゲホゲ8',
        amount: 10000,
      },
      {
        id: 8,
        name: 'ホゲホゲ9',
        amount: 10000,
      },
      {
        id: 9,
        name: 'ホゲホゲ10',
        amount: 10000,
      },
    ],
  })

  return {
    receiptAnalyze,
  }
}
