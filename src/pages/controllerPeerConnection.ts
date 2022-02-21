
export const setOnTrackToPc = (pc:RTCPeerConnection, remoteStream: MediaStream|undefined) => {
  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream?.addTrack(track)
    })
  }
}
