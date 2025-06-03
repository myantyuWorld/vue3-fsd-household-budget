export type ReceiptAnalyze = {
  id: string
  receiptImageURL: string
  date: string
  totalAmount: number
  items: ReceiptAnalyzeItem[]
}

export type ReceiptAnalyzeItem = {
  name: string
  price: number
}
