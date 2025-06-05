import { POST } from '@/shared/api'

export const getBase64DataFromCanvas = (videoRef: HTMLVideoElement) => {
  const canvas = document.createElement('canvas')
  canvas.width = videoRef.videoWidth
  canvas.height = videoRef.videoHeight
  const context = canvas.getContext('2d')
  context?.drawImage(videoRef, 0, 0, canvas.width, canvas.height)

  const base64 = canvas.toDataURL('image/jpeg')
  console.log('撮影した画像のbase64:', base64)

  return base64
}

export const getBackCameraMediaStream = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  const videoDevices = devices.filter((device) => device.kind === 'videoinput')
  const backCamera =
    videoDevices.find((device) => device.label.toLowerCase().includes('back')) || videoDevices[0]

  return backCamera
}

export const requestReceiptAnalyze = async (
  householdID: number,
  base64: string,
  categoryID: number,
) => {
  const { data, error } = await POST('/openai/analyze/{householdID}/receipt/reception', {
    body: {
      imageData: base64,
      categoryID: categoryID,
    },
    params: {
      path: { householdID },
    },
  })

  if (error) {
    console.error(error)
    return
  }

  return data
}
