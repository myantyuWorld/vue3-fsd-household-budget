export const formatAmount = (amount: number) => {
  const formatter = new Intl.NumberFormat('ja-JP', {
    currency: 'JPY'
  })
  return formatter.format(amount)
}

export const formatDate = (dateString: string): string => {
  if (!dateString) {
    return 'no data'
  }

  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]

  return `${year}/${month}/${day}（${dayOfWeek}）`
}
export const formatYearMonth = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}/${month}`
}
export const formatDateFromDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]

  return `${year}/${month}/${day}（${dayOfWeek}）`
}

export const formatDateFromDateTime = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')

  return `${year}/${month}/${day}(${dayOfWeek}) ${hour}:${minute}`
}
