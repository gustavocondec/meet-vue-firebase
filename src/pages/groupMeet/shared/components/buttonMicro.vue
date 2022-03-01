<template>
  <div
    :class="{'class-item':true, 'class-item--active':isActive, 'class-item--inactive':!isActive}"
    @click.prevent="isActive=!isActive"
  >
    <svg
      v-show="isActive"
      fill="white"
      focusable="false"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z"
      />
      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
    </svg>
    <svg
      v-show="!isActive"
      fill="white"
      focusable="false"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M11 5c0-.55.45-1 1-1s1 .45 1 1v5.17l1.82 1.82c.11-.31.18-.64.18-.99V5c0-1.66-1.34-3-3-3S9 3.34 9 5v1.17l2 2V5zM2.81 2.81L1.39 4.22l11.65 11.65c-.33.08-.68.13-1.04.13-2.76 0-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c.57-.08 1.12-.24 1.64-.46l5.14 5.14 1.41-1.41L2.81 2.81zM19 11h-2c0 .91-.26 1.75-.69 2.48l1.46 1.46A6.921 6.921 0 0 0 19 11z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { groupMeetApi } from 'pages/groupMeet/shared/components/api-composition'

export default defineComponent({
  name: 'ButtonMicro',
  setup () {
    const isActive = ref(true)
    const { localStream, pc } = groupMeetApi()
    const senderAudio = pc.value.getSenders().find((sender) => sender?.track?.kind === 'audio')

    watch(isActive, async (newValue) => {
      if (!localStream.value) return
      const audioTracks = localStream.value.getAudioTracks()
      if (!audioTracks[0]) return
      if (!senderAudio) return
      if (newValue) {
        const auxMediaDevices = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        const auxTrackAudio = auxMediaDevices.getAudioTracks()
        console.log('set,', auxTrackAudio[0])
        await senderAudio.replaceTrack(auxTrackAudio[0])
      } else {
        console.log('se null')
        await senderAudio.replaceTrack(null)
        if (senderAudio.track) {
          senderAudio.track.enabled = false
          senderAudio.track.stop()
        }
      }
    })

    return {
      isActive
    }
  }
})
</script>

<style lang="sass" scoped>
.class-item
  border-radius: 50%
  display: inline-flex
  padding: 1.4rem
  cursor: pointer
  transition: ease-in all 0.2s

  &--active
    border: 2px solid white

  &--inactive
    background: #d93025
    border: 2px solid #d93025

  &:hover
    opacity: 0.8
</style>
