import { GET } from '@/shared/api'
import type { components } from '@/shared/api/v1'
import { onMounted, ref } from 'vue'

export const useInteraction = () => {
  const information = ref<components['schemas']['Information'][]>()
  const selectedInformation = ref<components['schemas']['Information']>()
  const isOpenInformationModal = ref(false)
  const isOpenUpdatePublishInformationModal = ref(false)
  const isOpenDeleteConfirmModal = ref(false)

  onMounted(async () => {
    console.log('onMounted')

    const { data, error } = await GET('/admin/informations', {
      params: {},
    })
    if (error) console.log(error)
    information.value = data
  })

  const handleInformationModal = {
    open: () => {
      isOpenInformationModal.value = true
    },
    close: () => {
      isOpenInformationModal.value = false
    },
  }

  const handleUpdatePublishInformationModal = {
    open: (id: number) => {
      console.log('open', id)
      selectedInformation.value = information.value?.find((info) => info.id === id)
      isOpenUpdatePublishInformationModal.value = true
    },
    close: () => {
      isOpenUpdatePublishInformationModal.value = false
    },
  }

  const handleDeleteConfirmModal = {
    open: (id: number) => {
      console.log('open', id)
      selectedInformation.value = information.value?.find((info) => info.id === id)
      isOpenDeleteConfirmModal.value = true
    },
    close: () => {
      isOpenDeleteConfirmModal.value = false
    },
  }

  return {
    information,
    selectedInformation,
    isOpenInformationModal,
    isOpenUpdatePublishInformationModal,
    isOpenDeleteConfirmModal,
    handleInformationModal,
    handleUpdatePublishInformationModal,
    handleDeleteConfirmModal,
  }
}
