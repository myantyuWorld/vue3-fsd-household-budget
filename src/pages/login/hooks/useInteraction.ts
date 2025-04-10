import { ref } from 'vue'

export const useInteraction = () => {
    const isLoading = ref(false)

    const onClickLogin = async () => {
        isLoading.value = true
        try {
            // TODO : 環境変数化する
            location.href = 'http://localhost:3000/line/login'
        } catch (error) {
            console.error('Login failed:', error)
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        onClickLogin
    }
}