import { ref } from 'vue'

export const useModal = (initialValue = false) => {
  const isOpen = ref(initialValue)
  const openModal = () => {
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
  }
  return { isOpen, openModal, closeModal }
}
