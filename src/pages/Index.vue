<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <video
        ref="localVideo"
        autoplay
        controls="false"
        playsinline
      />
    </div>
    <div>
      <video
        ref="remoteVideo"
        autoplay
        controls="false"
        playsinline
      />
    </div>
  </q-page>
</template>

<script lang="ts">

import { defineComponent, onMounted, ref } from 'vue'
import { getConnectedDevices, openShareMonitor } from './groupMeet/shared/components/controllerMedia'

export default defineComponent({
  name: 'PageIndex',
  setup () {
    const localVideo = ref<HTMLVideoElement | null>(null)
    const remoteVideo = ref<HTMLVideoElement | null>(null)

    onMounted(async () => {
      const camera = await getConnectedDevices('videoinput')
      if (camera.length === 0) return

      // const stream = await openCamera(camera[0].deviceId, 1280, 720)

      // if (stream && videoDoc.value) videoDoc.value.srcObject = stream

      const pantalla = await openShareMonitor()
      if (pantalla && localVideo.value) localVideo.value.srcObject = pantalla
    })
    return {
      localVideo,
      remoteVideo
    }
  }
})
</script>
