import firebase from 'firebase/compat'
import firestore = firebase.firestore

export interface RtcStateInterface{
  mode:'offer'|'answer'|null,
  iceServers: Array<{
    urls: Array<string>
  }>,
  iceCandidatePoolSize: number,
  peerConnection: RTCPeerConnection | null,
  localStream: null | MediaStream,
  remoteStream: null | MediaStream,
  roomRef: firestore.DocumentReference | undefined
}

function state (): RtcStateInterface {
  return {
    mode: null,
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
      }
    ],
    iceCandidatePoolSize: 10,
    peerConnection: null,
    localStream: null,
    remoteStream: new MediaStream(),
    roomRef: undefined
  }
}

export default state
