<template>
  <div style="background: blanchedalmond">
    <div class="meet-container">
      <div class="meet-container__central">
        <p>Local</p>
        <my-item-call
          :stream-video="controllerMedia.mediaStream"
        />
      </div>
      <div
        class="meet-container__float"
      >
        <p>Remote</p>
        <my-item-call
          :stream-video="remoteStream"
        />
      </div>
    </div>
    <p>{{ callId }}</p>
    <meet-buttons-bottom />
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { defineComponent, onBeforeMount } from 'vue'
import { groupMeetApi } from 'pages/groupMeet/shared/components/api-composition'
import MeetButtonsBottom from 'pages/groupMeet/meet/components/buttonsBottom.vue'
import MyItemCall from 'pages/groupMeet/shared/components/myItemCall.vue'
import { existCallId } from 'pages/groupMeet/groupMeet-services'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'PageMeet',
  components: { MyItemCall, MeetButtonsBottom },

  setup () {
    const { controllerMedia, remoteStream, callId, setupMediaLocal, setupMediaRemote, answerButton } = groupMeetApi()
    const $route = useRoute()
    const $quasar = useQuasar()
    onBeforeMount(async () => {
      console.log('onbefore mount meet')
      if (!callId.value) {
        callId.value = String($route.params.callId)
        if (!await existCallId(callId.value)) return $quasar.notify({ type: 'negative', message: 'No existe un Meet con ese Id' })
        if (await existCallId(callId.value)) {
          await setupMediaLocal()
          setupMediaRemote()
          await answerButton()
        } else {
          console.info('No existe calls con ese Id')
        }
      }
    })

    return {
      controllerMedia,
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
