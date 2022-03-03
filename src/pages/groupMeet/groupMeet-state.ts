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
  callId: string,
  role:'offer'|'answer'|null
}

function state (): groupMeetStateInterface {
  return {
    pc: new RTCPeerConnection(servers),
    callId: '',
    role: null
  }
}

const mutations: MutationTree<groupMeetStateInterface> = {
  setRole (state, payload: 'offer'|'answer'|null) {
    state.role = payload
  },
  setCallId (state, payload: string) {
    state.callId = payload
  },
  restart (state) {
    state.pc = new RTCPeerConnection(servers)
    state.callId = ''
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
