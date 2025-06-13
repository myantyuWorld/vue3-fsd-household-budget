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
  }
})
