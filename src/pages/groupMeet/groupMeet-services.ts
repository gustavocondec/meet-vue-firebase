import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import firestore = firebase.firestore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
firebase.initializeApp(process.env.fb)

export const getCallDocById = async (callId:string) => {
  const callDoc = await firebase.firestore().doc(`calls/${callId}`).get()
  if (!callDoc.exists) throw new Error('No Existe un call con el id' + callId)
  return callDoc.data()
}

export const saveNewCall = async (data: {offer: {sdp: string | undefined, type: RTCSdpType}}) => {
  const refDoc = await firebase.firestore().collection('calls').add(data)
  return refDoc.id
}

export const updateCallById = async (callId:string, data:object) => {
  await firebase.firestore().doc(`calls/${callId}`).update(data)
}
export const saveOfferOffCall = async (callId:string, data:RTCIceCandidateInit) => {
  const refOffer = firebase.firestore().doc(`calls/${callId}`).collection('offerCandidates')
  const refDoc = await refOffer.add(data)
  return refDoc.id
}
export const saveAnswerOffCall = async (callId:string, data: RTCIceCandidateInit) => {
  const refAnswer = firebase.firestore().doc(`calls/${callId}`).collection('answerCandidates')
  const refDoc = await refAnswer.add(data)
  return refDoc.id
}

// Listen to changes off call doc
export const listenChangesOfCallId = (callId:string, callback:(data: firestore.DocumentData | undefined)=>void) => {
  return firebase.firestore().doc(`calls/${callId}`)
    .onSnapshot((snapshot) => {
      const newData = snapshot.data()
      callback(newData)
    })
}

export const listenChangesOfAnswerOfCallId = (callId:string, callback:(candidate: RTCIceCandidate)=>void) => {
  return firebase.firestore().doc(`calls/${callId}`).collection('answerCandidates')
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const newData = change.doc.data()
          const rtc = new RTCIceCandidate(newData)
          callback(rtc)
        }
      })
    })
}

export const listenChangesOfOfferOfCallId = (callId:string, callback: (data:RTCIceCandidate)=>void) => {
  return firebase.firestore().doc(`calls/${callId}`).collection('offerCandidates')
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const newData = change.doc.data()
          const rtc = new RTCIceCandidate(newData)
          callback(rtc)
        }
      })
    })
}
