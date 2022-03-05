import {
  getCallDocById,
  listenChangesOfAnswerOfCallId,
  listenChangesOfCallId, listenChangesOfOfferOfCallId, saveAnswerOffCall,
  saveNewCall,
  saveOfferOffCall, updateCallById
} from 'pages/groupMeet/groupMeet-services'
import { computed, ref, onBeforeUnmount } from 'vue'
import { useStore } from 'src/store'
import { ControllerMediaLocal } from 'pages/groupMeet/shared/ControllerMediaLocal'
import { ControllerMediaRemote } from 'pages/groupMeet/shared/ControllerMediaRemote'

export const groupMeetApi = () => {
  const callId = computed({
    get: () => $store.state.groupMeetModule.callId,
    set: (value) => $store.commit('groupMeetModule/setCallId', value)
  })
  const $store = useStore()
  const pc = computed(() => $store.state.groupMeetModule.pc)
  const controllerMediaLocal = ref(ControllerMediaLocal.getInstance())
  const controllerMediaRemote = ref(ControllerMediaRemote.getInstance())
  // Global State

  // 1. Setup media sources
  const setupMediaSources = async () => {
    await setupMediaLocal()
    setupMediaRemote()
  }
  const setupMediaLocal = async () => {
    console.log('setupMediaLocal')
    await controllerMediaLocal.value.openCamera()
    await controllerMediaLocal.value.openAudio()
    setTracksLocalToPc(controllerMediaLocal.value.mediaStream, pc.value)
  }
  const setupMediaRemote = () => {
    console.log('setupMediaRemote')
    setOnTrackRemoteToPc(pc.value, controllerMediaRemote.value.mediaStream)
  }
  // 2. Create Offer
  const createOffer = async () => {
    console.log('createOffer.')
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
      console.log('createOffer pc.onicecandidate', event)
      if (event.candidate) {
        console.log('createOffer pc.onicecandidate', event.candidate)
        void saveOfferOffCall(callId.value, event.candidate.toJSON())
      }
    }

    listenChangesOfCallId(callId.value, (newCallDoc) => {
      console.log('listenChangesOfCallid')
      if (!pc.value.currentRemoteDescription && newCallDoc?.answer) {
        const answerDescription = new RTCSessionDescription(newCallDoc?.answer as RTCSessionDescriptionInit)
        void pc.value.setRemoteDescription(answerDescription)
      }
    })
    listenChangesOfAnswerOfCallId(callId.value, (candidate) => {
      console.log('listenChangesOfAnswerOfCallId')
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

  const setOnTrackRemoteToPc = (pc:RTCPeerConnection, stream: MediaStream|undefined) => {
    console.log('setOnTrackRemoteToPc configura')
    pc.ontrack = (event) => {
      console.log('setOnTrackRemoteToPc', 'se activa evento pc.onTrack', event)
      // event.streams[0].getTracks().forEach((track) => {
      //   console.log('setOnTrackRemoteToPc', 'añade track', track)
      //   stream?.addTrack(track)
      // })
      controllerMediaRemote.value.setMediaStream(event.streams[0])
    }
  }
  const setTracksLocalToPc = (stream: MediaStream|null, pc: RTCPeerConnection) => {
    console.log('setTracksLocalToPc')
    if (!stream) return
    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream)
    })
  }
  onBeforeUnmount(() => {
    console.log('unbeforemounted')
  })
  return {
    controllerMediaLocal,
    controllerMediaRemote,
    pc,
    callId,
    setupMediaSources,
    setupMediaLocal,
    setupMediaRemote,
    createOffer,
    answerButton
  }
}
