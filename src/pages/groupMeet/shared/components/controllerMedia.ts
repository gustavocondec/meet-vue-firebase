export async function getConnectedDevices (type?: 'audioinput' | 'audiooutput' | 'videoinput') {
  const devices = await navigator.mediaDevices.enumerateDevices()
  if (type) return devices.filter(device => device.kind === type)
  else return devices
}

// Open camera with at least minWidth and minHeight capabilities
export async function openCamera (cameraId: string) {
  const constraints: MediaStreamConstraints = {
    audio: false,
    video: {
      deviceId: cameraId,
      echoCancellation: true,
      width: {
        min: 640,
        ideal: 1280
      },
      height: {
        min: 480,
        ideal: 720
      },
      frameRate: {
        min: 24,
        ideal: 30,
        max: 60
      }
    }
  }
  return await navigator.mediaDevices.getUserMedia(constraints)
}

// Open camera with at least minWidth and minHeight capabilities
export async function openAudioInput (inputaudioId: string) {
  return await navigator.mediaDevices.getUserMedia({
    video: false,
    audio: {
      deviceId: inputaudioId,
      echoCancellation: true
    }

  })
}

export async function openShareMonitor () {
  const constraints: DisplayMediaStreamConstraints = {
    video: {
      width: 1280,
      height: 720
    }
  }
  return await navigator.mediaDevices.getDisplayMedia(constraints)
}

export const getDefaultUserMedia = async () => {
  const userMedia = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: {
      echoCancellation: true,
      suppressLocalAudioPlayback: true
    }
  })
  return userMedia
}
