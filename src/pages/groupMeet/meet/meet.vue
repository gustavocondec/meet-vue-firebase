<template>
  <div class="meet-page">
    <div class="meet-page__container">
      <div class="meet-page__container__central">
        <my-item-call
          :stream-video="controllerMedia.mediaStream"
        />
      </div>
      <div class="meet-page__container__float">
        <my-item-call
          :stream-video="remoteStream"
        />
      </div>
    </div>
    <meet-buttons-bottom class="meet-page__buttons" />
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
import { useStore } from 'src/store'

export default defineComponent({
  name: 'PageMeet',
  components: { MyItemCall, MeetButtonsBottom },

  setup () {
    const { pc, controllerMedia, remoteStream, callId, setupMediaLocal, setupMediaRemote, answerButton } = groupMeetApi()
    const $route = useRoute()
    const $quasar = useQuasar()
    const $store = useStore()
    onBeforeMount(async () => {
      console.log('onbefore mount meet')
      switch ($store.state.groupMeetModule.role) {
        case 'answer': {
          break
        }
        case 'offer': {
          break
        }
        default: {
          callId.value = String($route.params.callId)
          if (!await existCallId(callId.value)) return $quasar.notify({ type: 'negative', message: 'No existe un Meet con ese Id' })
          if (await existCallId(callId.value)) {
            await setupMediaLocal()
            setupMediaRemote()
            await answerButton()
            console.log('senders', pc.value.getSenders())
          } else {
            console.info('No existe calls con ese Id')
          }
          break
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
.meet-page
  background-color: black
  min-height: 95vh
  height: 95vh
  display: flex
  flex-direction: column
  &__container
    width: 100%
    height: 100%
    position: relative
    &__central
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
      align-content: center
      width: 100%
      height: 100%
      padding-left: 2%
      padding-right: 2%
    &__float
      position: absolute
      width: 15%
      bottom: 0%
      right: 3%

  &__buttons

</style>
