export class ControllerMedia {
  mediaStream
  private _mediaStreamTrackVideo: MediaStreamTrack|null = null
  private _mediaStreamTrackAudio: MediaStreamTrack|null = null
  constructor () {
    this.mediaStream = new MediaStream()
  }

  async openCamera () {
    const auxMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    const videoTrack = auxMediaStream.getVideoTracks()
    if (!videoTrack[0]) throw new Error('Not Found Video Track')
    this.mediaStreamTrackVideo = videoTrack[0]
  }

  async openAudio () {
    const auxMediaStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true })
    const audioTrack = auxMediaStream.getAudioTracks()
    if (!audioTrack[0]) throw new Error('Not Found Audio Track')
    this.mediaStreamAudio = audioTrack[0]
  }

  set mediaStreamTrackVideo (trackVideo: MediaStreamTrack | null) {
    if (!trackVideo) this.removeTrackVideo()
    else this.mediaStream.addTrack(trackVideo)
    this._mediaStreamTrackVideo = trackVideo
  }

  get mediaStreamTrackVideo () {
    return this._mediaStreamTrackVideo
  }

  removeTrackVideo () {
    if (this._mediaStreamTrackVideo) this.mediaStream.removeTrack(this._mediaStreamTrackVideo)
  }

  set mediaStreamAudio (trackAudio: MediaStreamTrack|null) {
    if (!trackAudio) this.removeMediaStreamAudio()
    else this.mediaStream.addTrack(trackAudio)
    this._mediaStreamTrackAudio = trackAudio
  }

  get mediaStreamAudio () {
    return this._mediaStreamTrackAudio
  }

  removeMediaStreamAudio () {
    if (this._mediaStreamTrackAudio) this.mediaStream.removeTrack(this._mediaStreamTrackAudio)
  }
}
