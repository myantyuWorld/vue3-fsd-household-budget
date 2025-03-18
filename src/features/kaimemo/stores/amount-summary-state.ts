// stores/sharedState.js
import { defineStore } from 'pinia'
import type { components } from '@/shared/api/v1'

export const useAmountSummaryStore = defineStore('sharedState', {
  state: () => ({
    count: 0,
    summaries: {} as components['schemas']['KaimemoSummary'],
  }),
  actions: {
    increment() {
      this.count++
    },
    mutation(summaries: components['schemas']['KaimemoSummary']) {
      this.summaries = summaries
    },
  },
})
