import {
  getCallDocById,
  listenChangesOfAnswerOfCallId,
  listenChangesOfCallId, listenChangesOfOfferOfCallId, saveAnswerOffCall,
  saveNewCall,
  saveOfferOffCall, updateCallById
} from 'pages/groupMeet/groupMeet-services'
import { computed, ref, onBeforeUnmount } from 'vue'
import { useStore } from 'src/store'
import { ControllerLocal } from 'pages/groupMeet/shared/ControllerLocal'
import { ControllerRemote } from 'pages/groupMeet/shared/ControllerRemote'

export const groupMeetApi = () => {
  const callId = computed({
    get: () => $store.state.groupMeetModule.callId,
    set: (value) => $store.commit('groupMeetModule/setCallId', value)
  })
  const $store = useStore()
  const pc = computed(() => $store.state.groupMeetModule.pc)
  const controllerLocal = ref(ControllerLocal.getInstance())
  const controllerMediaRemote = ref(ControllerRemote.getInstance())
  // Global State

  // 1. Setup media sources
  const setupMediaSources = async () => {
    await setupMediaLocal()
    setupMediaRemote()
  }
  const setupMediaLocal = async () => {
    console.log('setupMediaLocal')
    await controllerLocal.value.openCamera()
    await controllerLocal.value.openAudio()
    setTracksLocalToPc(controllerLocal.value.mediaStream, pc.value)
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
    console.log('setOnTrackRemoteToPc-----------------------------------Start')
    console.log('setOnTrackRemoteToPc-----------------------------------End', stream?.getTracks())
    pc.ontrack = (event) => {
      console.log('setOnTrackRemoteToPc', 'se activa evento pc.onTrack', event)
      // event.streams[0].getTracks().forEach((track) => {
      //   console.log('setOnTrackRemoteToPc', 'añade track', track)
      //   stream?.addTrack(track)
      // })
      controllerMediaRemote.value.setMediaStream(event.streams[0])
      console.log('setOnTrackRemoteToPc-----------------------------------End', stream?.getTracks())
    }
  }
  const setTracksLocalToPc = (stream: MediaStream|null, pc: RTCPeerConnection) => {
    if (!stream) return
    console.log('setTracksLocalToPc')
    // const videoTrack = stream.getVideoTracks()
    // if (videoTrack.length >= 1) {
    //   void cameraSender.replaceTrack(videoTrack[0])
    // }
    //
    // const audioTrack = stream.getAudioTracks()
    // if (audioTrack.length >= 1) void audioSender.replaceTrack(audioTrack[0])

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream)
    })
  }
  onBeforeUnmount(() => {
    console.log('unbeforemounted')
  })
  return {
    controllerLocal,
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
