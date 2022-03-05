<template>
  <div class="container-video">
    <MyItemCall
      class="container-video__video"
      :stream-audio="mediaStreamLocalAudio"
      :stream-video="mediaStreamLocalVideo"
      type="local"
      name="Tú"
    />
    <meet-buttons-bottom class="container-video__buttons" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MyItemCall from 'pages/groupMeet/shared/components/myItemCall.vue'
import MeetButtonsBottom from 'pages/groupMeet/shared/components/buttonsBottom.vue'

export default defineComponent({
  name: 'PreMeetContainerVideo',
  components: {
    MeetButtonsBottom,
    MyItemCall
  },
  setup () {
    const mediaStreamLocalAudio = ref<MediaStream|null>(null)
    const mediaStreamLocalVideo = ref<MediaStream|null>(null)

    return {
      mediaStreamLocalAudio,
      mediaStreamLocalVideo
    }
  }
})
</script>

<style lang="sass" scoped>
.container-video
  position: relative
  overflow: hidden

  &__video
    width: 100%
    height: 100%

  &__buttons
    width: 100%
    position: absolute
    bottom: 2%
</style>
