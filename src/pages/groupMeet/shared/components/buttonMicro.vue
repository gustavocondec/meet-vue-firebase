<template>
  <icon-microphone
    @click.prevent="isActive=!isActive"
    :is-active="isActive"
    style="cursor:pointer;"
    type="control"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { groupMeetApi } from 'pages/groupMeet/shared/components/api-composition'
import IconMicrophone from 'components/icons/iconMicrophone.vue'

export default defineComponent({
  name: 'ButtonMicro',
  components: { IconMicrophone },
  setup () {
    const isActive = ref(true)
    const { pc, controllerMedia } = groupMeetApi()
    const senderAudio = pc.value.getSenders().find((sender) => sender?.track?.kind === 'audio')

    watch(isActive, async (newValue) => {
      if (!senderAudio) return
      if (newValue) {
        await controllerMedia.value.openAudio()
        await senderAudio.replaceTrack(controllerMedia.value.mediaStreamTrackAudio)
      } else {
        console.log('se null')
        await senderAudio.replaceTrack(null)
        controllerMedia.value.removeTrackAudio()
      }
    })

    return {
      isActive
    }
  }
})
</script>

<style lang="sass" scoped>

</style>
