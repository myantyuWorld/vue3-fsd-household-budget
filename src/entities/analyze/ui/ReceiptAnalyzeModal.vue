<script setup lang="ts">
import { BaseModal, PrimaryButton, SecondaryButton, TheForm } from '@/shared/ui'
import { useInteraction } from '../hooks/useInteraction'
import { watch } from 'vue'
import type { components } from '@/shared/api/v1'

const props = defineProps<{
  householdID: number
  isOpenReceiptAnalyzeModal: boolean
  categories: components['schemas']['CategoryLimit'][]
}>()

const emit = defineEmits<{
  (e: 'closeModal'): void
}>()

const { videoRef, stream, handleReceiptAnalyzeReception, stopCamera, defineField, errors } =
  useInteraction(props.householdID)

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

const onClickAnalyzeReceipt = async () => {
  console.log('onClickAnalyzeReceipt')

  const result = await handleReceiptAnalyzeReception()
  if (result) {
    emit('closeModal')
  }
}

const onClickCloseReceiptAnalyzeModal = () => {
  stopCamera()
  emit('closeModal')
}
</script>

<template>
  {{ videoRef }}
  {{ videoRef?.videoWidth }}
  {{ videoRef?.videoHeight }}
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
