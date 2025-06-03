<script setup lang="ts">
import { ReceiptAnalyzeList } from '@/entities/analyze'
import { useInteraction } from '../hooks/useInteraction'
import { HouseholdTile } from '@/entities/household'
import { useSessionStore } from '@/entities/session/model/session-store'
import { computed, ref } from 'vue'
import type { components } from '@/shared/api/v1'

const { receiptAnalyzes } = useInteraction()
const sessionStore = useSessionStore()
const householdBooks = computed(() => {
  return sessionStore.user.householdBooks
})

const selectedHouseholdBook = ref<components['schemas']['HouseholdBook']>(
  sessionStore.user.householdBooks[0],
)
</script>
<template>
  <HouseholdTile :householdBooks="householdBooks" v-model="selectedHouseholdBook" />

  <div class="max-w-4xl mx-auto p-4">
    <ReceiptAnalyzeList :receiptAnalyzes="receiptAnalyzes" />
  </div>
</template>
