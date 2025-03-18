import { onMounted, ref } from 'vue'

export const useInteraction = () => {
  const shareUrl = ref('')

  onMounted(() => {
    const tempUserID = crypto.randomUUID()
    shareUrl.value = window.location.href + `kaimemo?share=${tempUserID}`

    localStorage.setItem('tempUserID', tempUserID)
  })

  const onClickShare = () => {
    navigator.share({
      title: 'kaimemo!',
      text: 'リンクを共有し、買い物メモを共有しよう！',
      url: shareUrl.value,
    })
  }
  return {
    shareUrl,
    onClickShare,
  }
}
