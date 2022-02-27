
export const setOnTrackToPc = (pc:RTCPeerConnection, remoteStream: MediaStream|undefined) => {
  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream?.addTrack(track)
    })
  }
}
export const setTracksToPc = (stream: MediaStream|null, pc: RTCPeerConnection) => {
  if (!stream) return
  stream.getTracks().forEach((track) => {
    pc.addTrack(track, stream)
  })
}
