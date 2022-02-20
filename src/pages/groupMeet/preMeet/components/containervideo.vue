<template>
  <div class="container-video">
    <MyItemCall
      class="container-video__video"
      :stream-audio="streamAudio"
      :stream-video="streamVideo"
    />
    <buttonsbottom class="container-video__buttons" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import MyItemCall from 'pages/groupMeet/shared/components/myItemCall.vue'
import Buttonsbottom from 'pages/groupMeet/preMeet/components/buttonsbottom.vue'
import { useStore } from 'src/store'

export default defineComponent({
  name: 'PreMeetContainerVideo',
  components: {
    Buttonsbottom,
    MyItemCall
  },
  setup () {
    const $store = useStore()
    const streamAudio = computed(():MediaStream | null => $store.state.groupMeetModule.myStream.streamAudio)
    const streamVideo = computed((): MediaStream | null => $store.state.groupMeetModule.myStream.streamCamera)
    return {
      streamAudio,
      streamVideo
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
