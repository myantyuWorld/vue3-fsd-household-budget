export type ReceiptAnalyze = {
  id: string
  receiptImageURL: string
  analyzeStatus: 'pending' | 'finished'
  transferStatus: 'pending' | 'finished'
  date: string
  totalAmount: number
  items: ReceiptAnalyzeItem[]
}

export type ReceiptAnalyzeItem = {
  name: string
  price: number
}
