<template>
  <div class="meet-page">
    <div class="meet-page__container">
      <div class="meet-page__container__central">
        <my-item-call
          :stream-video="mediaStreamVideo"
        />
      </div>
      <div class="meet-page__container__float">
        <my-item-call
          :stream-video="controllerMediaRemote.mediaStream"
        />
      </div>
    </div>
    <meet-buttons-bottom class="meet-page__buttons" />
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { defineComponent, onBeforeMount, computed } from 'vue'
import { groupMeetApi } from 'pages/groupMeet/shared/api-composition'
import MeetButtonsBottom from 'pages/groupMeet/meet/components/buttonsBottom.vue'
import MyItemCall from 'pages/groupMeet/shared/components/myItemCall.vue'
import { existCallId } from 'pages/groupMeet/groupMeet-services'
import { useQuasar } from 'quasar'
import { useStore } from 'src/store'

export default defineComponent({
  name: 'PageMeet',
  components: { MyItemCall, MeetButtonsBottom },

  setup () {
    const { pc, controllerLocal, controllerMediaRemote, callId, setupMediaLocal, setupMediaRemote, answerButton } = groupMeetApi()
    const $route = useRoute()
    const $quasar = useQuasar()
    const $store = useStore()

    const mediaStreamVideo = computed(() => {
      if (controllerLocal.value.mediaStreamTrackVideo) {
        const mediaAux = new MediaStream()
        mediaAux.addTrack(controllerLocal.value.mediaStreamTrackVideo)
        return mediaAux
      } else return null
    })

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
      mediaStreamVideo,
      controllerLocal,
      controllerMediaRemote,
      callId
    }
  }
})
</script>

<style scoped lang="sass">
.meet-page
  background-color: #202124
  min-height: 95vh
  height: 95vh
  display: flex
  flex-direction: column
  &__container
    position: relative
    height: 90%
    display: flex
    flex-direction: column
    justify-content: center
    &__central
      width: 100%
      padding-left: 2%
      padding-right: 2%
    &__float
      position: absolute
      width: 35%
      max-height: 25%
      overflow: hidden
      bottom: 0
      right: 3%
  &__buttons
@media only screen and (min-width: 650px)
  .meet-page
    &__container
      &__float
        width: 25%
@media only screen and (min-width: 1000px)
  .meet-page
    &__container
      &__float
        width: 20%
@media only screen and (min-width: 1400px)
  .meet-page
    &__container
      &__float
        width: 15%
</style>
