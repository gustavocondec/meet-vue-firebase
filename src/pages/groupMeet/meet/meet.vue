<template>
  <div style="background: blanchedalmond">
    <div class="meet-container">
      <div class="meet-container__central">
        <p>Local</p>
        <video
          :srcObject="localStream"
          autoplay
          playsinline
        />
      </div>
      <div
        class="meet-container__float"
      >
        <p>Remote</p>
        <video
          :srcObject="remoteStream"
          autoplay
          playsinline
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { groupMeetApi } from 'pages/groupMeet/api-composition'

export default defineComponent({
  name: 'PageMeet',
  components: {},

  setup () {
    const { localStream, remoteStream } = groupMeetApi()

    return {
      localStream,
      remoteStream
    }
  }
})
</script>

<style scoped lang="sass">
.meet-container
  width: 100%
  display: flex
  flex-direction: row
  &__central
    width: 50%
  &__float
    width: 50%

</style>
