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
        d="M18 10.48V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.48l4 3.98v-11l-4 3.98zm-2-.79V18H4V6h12v3.69z"
      />
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
        d="M18 10.48V6c0-1.1-.9-2-2-2H6.83l2 2H16v7.17l2 2v-1.65l4 3.98v-11l-4 3.98zM16 16L6 6 4 4 2.81 2.81 1.39 4.22l.85.85C2.09 5.35 2 5.66 2 6v12c0 1.1.9 2 2 2h12c.34 0 .65-.09.93-.24l2.85 2.85 1.41-1.41L18 18l-2-2zM4 18V6.83L15.17 18H4z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { groupMeetApi } from 'pages/groupMeet/shared/components/api-composition'

export default defineComponent({
  name: 'ButtonCamera',
  setup () {
    const isActive = ref(true)
    const { localStream, pc } = groupMeetApi()
    const senderCamera = pc.value.getSenders().find((sender) => sender?.track?.kind === 'video')

    // const backupAudioTrack:MediaStreamTrack
    watch(isActive, async (newValue) => {
      if (!localStream.value) return
      const videoTracks = localStream.value.getVideoTracks()
      if (!videoTracks[0]) return
      if (!senderCamera) return
      if (newValue) {
        console.log('auxTrackCamera')
        const auxMediaDevices = await navigator.mediaDevices.getUserMedia({ audio: false, video: true })
        const auxTrackVideos = auxMediaDevices.getVideoTracks()
        await senderCamera.replaceTrack(auxTrackVideos[0])
      } else {
        await senderCamera.replaceTrack(null)
        if (senderCamera.track) {
          senderCamera.track.enabled = false
          senderCamera.track.stop()
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
