import { useAmountSummaryStore } from '@/features/kaimemo'
import { onMounted, ref } from 'vue'
import { createCalenderItem } from './function'

interface Props {
  id: () => string
}

export const useInteraction = ({ id }: Props) => {
  const calenderAttributes = ref([{}])

  onMounted(() => {
    // TODO : 現状のAPIの作りだと、使わないが、将来的に使用するかもなので、コメアウト
    console.log(id)

    const store = useAmountSummaryStore()
    const calenderItems = (store.summaries.weeklySummaries || [])
      .flatMap(summary => summary.items || [])
      .map(item => createCalenderItem(item))
      .filter(item => Object.keys(item).length > 0)

    calenderAttributes.value = calenderItems
  })

  return {
    calenderAttributes
  }
}
