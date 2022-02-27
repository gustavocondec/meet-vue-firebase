<template>
  <div style="background: blanchedalmond">
    <div class="meet-container">
      <q-btn
        @click="setupMediaSources"
        label="Iniciar Camara"
      />
      <q-btn
        @click="createOffer"
        label="Crear Oferta"
      />
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
    <q-input
      v-model="callId"
      label="Codigo de sala"
    />
    <q-btn
      @click="answerButton"
      label="Join Room"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import {
  listenChangesOfCallId,
  listenChangesOfAnswerOfCallId, listenChangesOfOfferOfCallId, getCallDocById,
  saveAnswerOffCall,
  saveNewCall,
  saveOfferOffCall, updateCallById
} from 'pages/groupMeet/groupMeet-services'
import { getDefaultUserMedia } from 'pages/groupMeet/controllerMedia'
import { setOnTrackToPc, setTracksToPc } from 'pages/controllerPeerConnection'
import { useStore } from 'src/store'

export default defineComponent({
  name: 'PageMeet',
  setup () {
    const callId = computed({
      get: () => $store.state.groupMeetModule.callId,
      set: (value) => $store.commit('groupMeetModule/setCallId', value)
    })
    const $store = useStore()
    const pc = computed(() => $store.state.groupMeetModule.pc)

    // Global State
    const localStream = computed({
      get: () => $store.state.groupMeetModule.localStream,
      set: (value) => $store.commit('groupMeetModule/setLocalStream', value)
    })
    const remoteStream = computed({
      get: () => $store.state.groupMeetModule.remoteStream,
      set: (value) => $store.commit('groupMeetModule/setRemoteStream', value)
    })
    // 1. Setup media sources
    const setupMediaSources = async () => {
      localStream.value = await getDefaultUserMedia()
      setTracksToPc(localStream.value, pc.value)

      remoteStream.value = new MediaStream()
      setOnTrackToPc(pc.value, remoteStream.value)
    }

    const createOffer = async () => {
      // Create offer
      const offerDescription = await pc.value.createOffer()
      await pc.value.setLocalDescription(offerDescription)

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type
      }

      callId.value = await saveNewCall({ offer })

      // Get candidates for caller, save to db
      pc.value.onicecandidate = (event) => {
        if (event.candidate) void saveOfferOffCall(callId.value, event.candidate.toJSON())
      }

      listenChangesOfCallId(callId.value, (newCallDoc) => {
        if (!pc.value.currentRemoteDescription && newCallDoc?.answer) {
          console.log('Set remote description: ', newCallDoc.answer)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const answerDescription = new RTCSessionDescription(newCallDoc?.answer)
          void pc.value.setRemoteDescription(answerDescription)
        }
      })
      listenChangesOfAnswerOfCallId(callId.value, (candidate) => {
        void pc.value.addIceCandidate(candidate)
      })
    }

    // 3. Answer the call with the unique ID
    const answerButton = async () => {
      pc.value.onicecandidate = (event) => {
        if (event.candidate) void saveAnswerOffCall(callId.value, event.candidate.toJSON())
      }
      const callData = await getCallDocById(callId.value)

      const offerDescription = callData?.offer as RTCSessionDescriptionInit

      await pc.value.setRemoteDescription(new RTCSessionDescription(offerDescription))

      const answerDescription = await pc.value.createAnswer()
      await pc.value.setLocalDescription(answerDescription)

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp
      }

      await updateCallById(callId.value, { answer })

      listenChangesOfOfferOfCallId(callId.value, (data) => {
        void pc.value.addIceCandidate(data)
      })
    }

    return {
      pc,
      callId,
      localStream,
      remoteStream,
      setupMediaSources,
      createOffer,
      answerButton
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
