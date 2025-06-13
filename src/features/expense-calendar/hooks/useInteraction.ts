import { ref } from 'vue'

export const useInteraction = () => {
  const calenderAttributes = ref([
    {
      date: '2025-06-10',
      key: 'test',
      attributes: {
        color: 'red',
        content: 'test'
      },
      customData: {
        color: 'red',
        description: 'test'
      }
    }
  ])

  return {
    calenderAttributes
  }
}
