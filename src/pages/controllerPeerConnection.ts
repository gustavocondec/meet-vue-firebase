
export const setOnTrackToPc = (pc:RTCPeerConnection, remoteStream: MediaStream|undefined) => {
  console.log('setOnTrackToPc')
  pc.ontrack = (event) => {
    console.log('setOnTrackToPc', 'se activa evento pc.onTrack')
    event.streams[0].getTracks().forEach((track) => {
      console.log('setOnTrackToPc', 'añade track', track)
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
