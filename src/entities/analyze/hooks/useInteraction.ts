import { ref } from 'vue'
import {
  getBase64DataFromCanvas,
  getBackCameraMediaStream,
  requestReceiptAnalyze,
} from './functions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { schema, type AnalyzeSchema } from '../types/schema'

export const useInteraction = (householdID: number) => {
  const videoRef = ref<HTMLVideoElement>()
  const stream = ref<MediaStream | null>(null)
  // TODO: レシート分析専用の、バリデーションのスキーマを作成する
  const { defineField, errors, handleSubmit, resetForm } = useForm<AnalyzeSchema>({
    validationSchema: toTypedSchema(schema),
  })

  const stopCamera = () => {
    stream.value?.getTracks().forEach((track) => track.stop())
  }

  const handleStartCamera = async () => {
    try {
      const backCamera = await getBackCameraMediaStream()
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

  const handleReceiptAnalyzeReception = handleSubmit(async (values) => {
    if (!videoRef.value) {
      console.error('videoRefがnullです')
      return Promise.resolve(false)
    }
    stopCamera()

    const data = await requestReceiptAnalyze(
      householdID,
      getBase64DataFromCanvas(videoRef.value),
      values.tag,
    )

    if (data) {
      console.log(data)
      resetForm()
      // TODO: 通知バナーを表示、とか、トースト表示、とかでもいいかも
    }

    return Promise.resolve(true)
  })

  return {
    videoRef,
    handleStartCamera,
    handleReceiptAnalyzeReception,
    stopCamera,
    defineField,
    errors,
  }
}
