<template>
  <div style="background: blanchedalmond">
    <div class="meet-container">
      <div class="meet-container__central">
        <p>Local</p>
        <my-item-call
          :stream-video="localStream"
        />
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
    <p>{{ callId }}</p>
    <meet-buttons-bottom />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { groupMeetApi } from 'pages/groupMeet/api-composition'
import MeetButtonsBottom from 'pages/groupMeet/meet/components/buttonsBottom.vue'
import MyItemCall from 'pages/groupMeet/shared/components/myItemCall.vue'

export default defineComponent({
  name: 'PageMeet',
  components: { MyItemCall, MeetButtonsBottom },

  setup () {
    const { localStream, remoteStream, callId } = groupMeetApi()

    return {
      localStream,
      remoteStream,
      callId
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
