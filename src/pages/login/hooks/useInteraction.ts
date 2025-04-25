import { ref } from 'vue'

export const useInteraction = () => {
  const isLoading = ref(false)

  const onClickLogin = async () => {
    isLoading.value = true
    try {
      location.href = `${import.meta.env.VITE_API_BASE_URL}/line/login`
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    onClickLogin,
  }
}
