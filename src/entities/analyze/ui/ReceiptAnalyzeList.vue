<script setup lang="ts">
import type { ReceiptAnalyze } from '@/shared/types/receipt'
import { computed, ref } from 'vue'
import ReceiptAnalyzeItem from './ReceiptAnalyzeItem.vue'

const props = defineProps<{
  receiptAnalyzes: ReceiptAnalyze[]
}>()

const showPending = ref(false)

const filteredReceiptAnalyzes = computed(() => {
  if (!showPending.value) {
    return props.receiptAnalyzes
  }

  return props.receiptAnalyzes.filter((receiptAnalyze) => {
    return receiptAnalyze.transferStatus === 'pending'
  })
})

const onClickShowPending = () => {
  showPending.value = !showPending.value
}
</script>

<template>
  <div class="flex flex-col gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer" @click="onClickShowPending" />
          <div
            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
          ></div>
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >「未移行」のみ表示する</span
          >
        </label>
      </div>
    </div>

    <hr class="border-gray-200 dark:border-gray-700 my-2" />

    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
      レシートの分析を実施した者を支出に反映する場合は、<br />
      「詳細を見る」ボタンを押して「移行」ボタンを押してね。
    </span>
  </div>

  <div class="flex flex-col gap-2 my-4">
    <ReceiptAnalyzeItem
      v-for="receiptAnalyze in filteredReceiptAnalyzes"
      :key="receiptAnalyze.id"
      :receiptAnalyze="receiptAnalyze"
    />
  </div>
</template>
