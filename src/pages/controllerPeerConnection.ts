
export const setOnTrackRemoteToPc = (pc:RTCPeerConnection, remoteStream: MediaStream|undefined) => {
  console.log('setOnTrackRemoteToPc')
  pc.ontrack = (event) => {
    console.log('setOnTrackRemoteToPc', 'se activa evento pc.onTrack', event)
    event.streams[0].getTracks().forEach((track) => {
      console.log('setOnTrackRemoteToPc', 'añade track', track)
      remoteStream?.addTrack(track)
    })
  }
}
export const setTracksLocalToPc = (stream: MediaStream|null, pc: RTCPeerConnection) => {
  if (!stream) return
  console.log('setTracksLocalToPc')
  stream.getTracks().forEach((track) => {
    console.log('setTracksLocalToPc', track)
    pc.addTrack(track, stream)
  })
}
