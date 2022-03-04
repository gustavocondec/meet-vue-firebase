<template>
  <div class="meet-page">
    <div
      class="meet-page__container"
      style="color: white"
    >
      <div class="meet-page__container__central">
        <my-item-call
          :stream-video="mediaStreamRemoteVideo"
          :stream-audio="mediaStreamRemoteAudio"
          type="remote"
          name="Llamada"
        />
      </div>
      <div class="meet-page__container__float">
        <my-item-call
          :stream-video="mediaStreamLocalVideo"
          :stream-audio="mediaStreamLocalAudio"
          type="local"
          name="Tú"
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
    const { pc, controllerMediaLocal, controllerMediaRemote, callId, setupMediaLocal, setupMediaRemote, answerButton } = groupMeetApi()
    const $route = useRoute()
    const $quasar = useQuasar()
    const $store = useStore()

    const mediaStreamLocalVideo = computed(() => {
      if (controllerMediaLocal.value.mediaStreamTrackVideo) {
        const mediaAux = new MediaStream()
        mediaAux.addTrack(controllerMediaLocal.value.mediaStreamTrackVideo)
        return mediaAux
      } else return null
    })
    const mediaStreamLocalAudio = computed(() => {
      if (controllerMediaLocal.value.mediaStreamTrackAudio) {
        const mediaAux = new MediaStream()
        mediaAux.addTrack(controllerMediaLocal.value.mediaStreamTrackAudio)
        return mediaAux
      } else return null
    })
    const mediaStreamRemoteVideo = computed(() => {
      if (controllerMediaRemote.value.mediaStreamTrackVideo) {
        const mediaAux = new MediaStream()
        mediaAux.addTrack(controllerMediaRemote.value.mediaStreamTrackVideo)
        return mediaAux
      } else return null
    })
    const mediaStreamRemoteAudio = computed(() => {
      if (controllerMediaRemote.value.mediaStreamTrackAudio) {
        const mediaAux = new MediaStream()
        mediaAux.addTrack(controllerMediaRemote.value.mediaStreamTrackAudio)
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
      mediaStreamRemoteVideo,
      mediaStreamRemoteAudio,
      mediaStreamLocalVideo,
      mediaStreamLocalAudio,
      controllerMediaLocal,
      controllerMediaRemote,
      callId,
      pc
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
