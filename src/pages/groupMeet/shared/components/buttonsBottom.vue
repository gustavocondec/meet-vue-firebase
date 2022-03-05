<template>
  <div class="container-buttons">
    <micro
      class="container-buttons__button"
      v-model:is-audio-active="isAudioActive"
    />
    <camera
      class="container-buttons__button"
      v-model:is-video-active="isVideoActive"
    />
    <button-share-pantalla v-show="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Micro from 'pages/groupMeet/shared/components/buttonMicro.vue'
import Camera from 'pages/groupMeet/shared/components/buttonCamera.vue'
import ButtonSharePantalla from 'pages/groupMeet/shared/components/buttonSharePantalla.vue'
import { groupMeetApi } from 'pages/groupMeet/shared/api-composition'

export default defineComponent({
  name: 'MeetButtonsBottom',
  components: {
    ButtonSharePantalla,
    Camera,
    Micro
  },
  setup () {
    const isAudioActive = ref(false)
    const isVideoActive = ref(false)

    const {
      pc,
      controllerMediaLocal
    } = groupMeetApi()

    // ---------- Block Audio Start
    const senderAudio = pc.value.getSenders().find((sender) => sender?.track?.kind === 'audio')
    watch(isAudioActive, async (newValue) => {
      if (!senderAudio) return
      if (newValue) {
        await controllerMediaLocal.value.openAudio()
        await senderAudio.replaceTrack(controllerMediaLocal.value.mediaStreamTrackAudio)
      } else {
        console.log('se null')
        await senderAudio.replaceTrack(null)
        controllerMediaLocal.value.removeTrackAudio()
      }
    }, {
      immediate: true
    })
    // ----------Block Audio End

    // ----------Block Video Start
    const senderCamera = pc.value.getSenders().find((sender) => sender?.track?.kind === 'video')
    watch(isVideoActive, async (newValue) => {
      console.log('buttonCamera', newValue)
      if (!senderCamera) return
      if (newValue) {
        console.log('buttonCamera ->Set true')
        await controllerMediaLocal.value.openCamera()
        await senderCamera.replaceTrack(controllerMediaLocal.value.mediaStreamTrackVideo)
      } else {
        console.log('buttonCamera ->Set false')
        await senderCamera.replaceTrack(null)
        if (!controllerMediaLocal.value.mediaStreamTrackVideo) return
        controllerMediaLocal.value.mediaStreamTrackVideo.enabled = false
        controllerMediaLocal.value.mediaStreamTrackVideo.stop()
        controllerMediaLocal.value.removeTrackVideo()
      }
    }, {
      immediate: true
    })
    // ----------Block Video Enda

    return {
      isAudioActive,
      isVideoActive
    }
  }
})
</script>

<style lang="sass" scoped>
.container-buttons
  width: 100%
  padding: 15px 2%
  display: flex
  flex-direction: row
  justify-content: center
  &__button
    margin-left: 10px
    margin-right: 10px

</style>
