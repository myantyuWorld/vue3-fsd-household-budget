<script setup lang="ts">
import { BaseModal, PrimaryButton, SecondaryButton, TheForm } from '@/shared/ui'
import { useInteraction } from '../hooks/useInteraction'
import { ref, watch } from 'vue'
import type { components } from '@/shared/api/v1'
import { requestReceiptAnalyze } from '../hooks/functions'

const props = defineProps<{
  householdID: number
  isOpenReceiptAnalyzeModal: boolean
  categories: components['schemas']['CategoryLimit'][]
}>()

const emit = defineEmits<{
  (e: 'closeModal'): void
}>()

const { stopCamera, defineField, errors } = useInteraction(props.householdID)

const videoRef = ref<HTMLVideoElement | null>(null)
const stream = ref<MediaStream | null>(null)

const [tag, tagProps] = defineField('tag')

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
        console.log(backCamera)
        // const backCamera: MediaDeviceInfo | undefined = await getBackCameraMediaStream()
        stream.value = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: backCamera?.deviceId,
            facingMode: 'environment',
          },
        })

        videoRef.value!.srcObject = stream.value
        await videoRef.value!.play()
      } catch (error) {
        console.error('カメラの起動に失敗しました:', error)
      }
    }
  },
)

const onClickAnalyzeReceipt = async () => {
  console.log('onClickAnalyzeReceipt')

  if (!videoRef.value) {
    console.error('videoRefがnullです')
    return
  }
  stopCamera()

  const canvas = document.createElement('canvas')
  canvas.width = videoRef.value.videoWidth
  canvas.height = videoRef.value.videoHeight
  const context = canvas.getContext('2d')
  context?.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height)

  const base64 = canvas.toDataURL('image/jpeg')
  console.log('撮影した画像のbase64:', base64)

  const data = await requestReceiptAnalyze(props.householdID, base64, tag.value)

  if (data) {
    console.log(data)
    // TODO: 通知バナーを表示、とか、トースト表示、とかでもいいかも
  }

  emit('closeModal')
}

const onClickCloseReceiptAnalyzeModal = () => {
  stopCamera()
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
      {{ videoRef }}
      {{ videoRef?.videoWidth }}
      {{ videoRef?.videoHeight }}
      <video ref="videoRef" autoplay playsinline class="w-full h-full"></video>
      <TheForm label="カテゴリ">
        <select
          class="w-full p-4 border border-primary-light rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light bg-white/90 text-base"
          :class="{ 'border-red-500 bg-red-50/80': errors.tag }"
          v-model="tag"
          v-bind="tagProps"
        >
          <template v-for="categoryLimit in categories" :key="categoryLimit.category.id">
            <option :value="categoryLimit.category.id">
              {{ categoryLimit.category.name }}
            </option>
          </template>
        </select>
        <p class="mt-2 text-sm text-red-600">{{ errors.tag }}</p>
      </TheForm>
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
          @click="onClickAnalyzeReceipt"
          class="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-lg"
        >
          分析
        </PrimaryButton>
      </div>
    </template>
  </BaseModal>
</template>
