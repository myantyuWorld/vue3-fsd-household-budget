// stores/sharedState.js
import { defineStore } from 'pinia'
import type { components } from '@/shared/api/v1'

export const useAmountSummaryStore = defineStore('sharedState', {
  state: () => ({
    count: 0,
    summaries: {} as components['schemas']['KaimemoSummary'],
    shoppingRecords: {} as components['schemas']['SummarizeShoppingAmount']
  }),
  actions: {
    increment() {
      this.count++
    },
    mutation(summaries: components['schemas']['KaimemoSummary']) {
      this.summaries = summaries
    },
    mutationShoppingRecords(
      shoppingRecords: components['schemas']['SummarizeShoppingAmount']
    ) {
      this.shoppingRecords = shoppingRecords
    }
  },
  getters: {
    getCurrentWeekSummary: (state) => (operatingCurrentDate: Date) => {
      if (!state.shoppingRecords?.shoppingAmounts) {
        return null
      }

      const currentDate = new Date(operatingCurrentDate)
      const weekStart = new Date(currentDate)
      weekStart.setDate(weekStart.getDate() - weekStart.getDay())
      weekStart.setHours(0, 0, 0, 0)
      
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekEnd.getDate() + 6)
      weekEnd.setHours(23, 59, 59, 999)

      const weeklyShoppingAmounts = state.shoppingRecords.shoppingAmounts.filter(amount => {
        if (!amount.date) return false
        const amountDate = new Date(amount.date)
        return amountDate >= weekStart && amountDate <= weekEnd
      })

      if (weeklyShoppingAmounts.length === 0) {
        return null
      }

      const totalAmount = weeklyShoppingAmounts.reduce((sum, amount) => sum + (amount.amount || 0), 0)
      
      return {
        weekStart: weekStart.toISOString(),
        weekEnd: weekEnd.toISOString(),
        totalAmount,
        shoppingAmounts: weeklyShoppingAmounts
      }
    }
  }
})
