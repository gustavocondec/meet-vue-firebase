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
import { groupMeetApi } from 'pages/groupMeet/shared/api-composition'
import IconMicrophone from 'components/icons/iconMicrophone.vue'

export default defineComponent({
  name: 'ButtonMicro',
  components: { IconMicrophone },
  setup () {
    const isActive = ref(false)
    const { pc, controllerMediaLocal } = groupMeetApi()
    const senderAudio = pc.value.getSenders().find((sender) => sender?.track?.kind === 'audio')

    watch(isActive, async (newValue) => {
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

    return {
      isActive
    }
  }
})
</script>

<style lang="sass" scoped>

</style>
