<script setup lang="ts">
import { BaseModal, PrimaryButton, SecondaryButton } from '@/shared/ui'
import { POST } from '@/shared/api'
import { ref, watch } from 'vue'

const props = defineProps<{
  householdID: number
  isOpenReceiptAnalyzeModal: boolean
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const stream = ref<MediaStream | null>(null)

const emit = defineEmits<{
  (e: 'closeModal'): void
}>()

const onClickCloseReceiptAnalyzeModal = () => {
  stream.value?.getTracks().forEach((track) => track.stop())
  emit('closeModal')
}

watch(
  () => props.isOpenReceiptAnalyzeModal,
  async (newVal) => {
    if (newVal) {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter((device) => device.kind === 'videoinput')
        const backCamera =
          videoDevices.find((device) => device.label.toLowerCase().includes('back')) ||
          videoDevices[0]

        stream.value = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: backCamera?.deviceId,
            facingMode: 'environment',
          },
        })

        if (videoRef.value) {
          videoRef.value.srcObject = stream.value
          await videoRef.value.play()
        }
      } catch (error) {
        console.error('カメラの起動に失敗しました:', error)
      }
    }
  },
)

const handleReceiptAnalyzeReception = async () => {
  console.log('receipt analyze reception')
  if (!videoRef.value) {
    console.error('videoRefがnullです')
    return
  }

  const canvas = document.createElement('canvas')
  canvas.width = videoRef.value.videoWidth
  canvas.height = videoRef.value.videoHeight
  const context = canvas.getContext('2d')
  context?.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height)

  const base64 = canvas.toDataURL('image/jpeg')
  console.log('撮影した画像のbase64:', base64)

  stream.value?.getTracks().forEach((track) => track.stop())

  const { data, error } = await POST('/openai/analyze/{householdID}/receipt/reception', {
    body: {
      imageData: base64,
    },
    params: {
      path: { householdID: props.householdID },
    },
  })

  if (error) {
    console.error(error)
    return
  }

  if (data) {
    console.log(data)
  }

  emit('closeModal')
}
</script>

<template>
  <BaseModal
    title="レシート分析"
    :isOpen="isOpenReceiptAnalyzeModal"
    @closeModal="onClickCloseReceiptAnalyzeModal"
    class="backdrop-blur-md"
    verticalPosition="top-0"
    horizontalPosition="left-0"
  >
    <template #modalBody>
      <video ref="videoRef" autoplay playsinline class="w-full h-full"></video>
    </template>
    <template #buttons>
      <div class="flex justify-end gap-4">
        <SecondaryButton
          @click="onClickCloseReceiptAnalyzeModal"
          class="px-6 py-3 rounded-xl hover:bg-primary-bg transition-all duration-300 transform hover:scale-105"
        >
          閉じる
        </SecondaryButton>

        <PrimaryButton
          @click="handleReceiptAnalyzeReception"
          class="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-lg"
        >
          分析
        </PrimaryButton>
      </div>
    </template>
  </BaseModal>
</template>
