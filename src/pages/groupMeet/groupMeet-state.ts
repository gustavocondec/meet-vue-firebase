import { ActionTree, Module, MutationTree } from 'vuex'
import { StateInterface } from 'src/store'
const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
    }
  ],
  iceCandidatePoolSize: 10
}
export interface groupMeetStateInterface {
  pc: RTCPeerConnection,
  localStream: MediaStream | null,
  remoteStream: MediaStream | null
}

function state (): groupMeetStateInterface {
  return {
    pc: new RTCPeerConnection(servers),
    localStream: null,
    remoteStream: null
  }
}

const mutations: MutationTree<groupMeetStateInterface> = {
  setLocalStream (state, payload: MediaStream|null) {
    state.localStream = payload
  },
  setRemoteStream (state, payload: MediaStream|null) {
    state.remoteStream = payload
  }
}

const actions: ActionTree<groupMeetStateInterface, StateInterface> = {

}

const groupMeetModule: Module<groupMeetStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  mutations,
  state
}

export default groupMeetModule
