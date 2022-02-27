import {
  getCallDocById,
  listenChangesOfAnswerOfCallId,
  listenChangesOfCallId, listenChangesOfOfferOfCallId, saveAnswerOffCall,
  saveNewCall,
  saveOfferOffCall, updateCallById
} from 'pages/groupMeet/groupMeet-services'
import { computed } from 'vue'
import { useStore } from 'src/store'
import { getDefaultUserMedia } from 'pages/groupMeet/controllerMedia'
import { setOnTrackToPc, setTracksToPc } from 'pages/controllerPeerConnection'
import { useQuasar } from 'quasar'

export const groupMeetApi = () => {
  const callId = computed({
    get: () => $store.state.groupMeetModule.callId,
    set: (value) => $store.commit('groupMeetModule/setCallId', value)
  })
  const $store = useStore()
  const $quasar = useQuasar()
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
    await setupMediaLocal()
    setupMediaRemote()
  }
  const setupMediaLocal = async () => {
    try {
      localStream.value = await getDefaultUserMedia()
      setTracksToPc(localStream.value, pc.value)
    } catch (e) {
      $quasar.notify({ type: 'negative', message: 'No se pudo acceder a la camara o microfono', timeout: 10000 })
    }
  }
  const setupMediaRemote = () => {
    remoteStream.value = new MediaStream()
    setOnTrackToPc(pc.value, remoteStream.value)
  }
  // 2. Create Offer
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

  // 3. Answer
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
    setupMediaSources,
    setupMediaLocal,
    setupMediaRemote,
    createOffer,
    answerButton,
    localStream,
    remoteStream
  }
}
