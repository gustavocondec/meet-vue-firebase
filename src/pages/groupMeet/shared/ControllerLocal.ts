export class ControllerLocal {
  // eslint-disable-next-line no-use-before-define
  static instance: ControllerLocal
  readonly mediaStream
  private _mediaStreamTrackVideo: MediaStreamTrack|null = null
  private _mediaStreamTrackAudio: MediaStreamTrack|null = null
  constructor () {
    this.mediaStream = new MediaStream()
  }

  public static getInstance ():ControllerLocal {
    if (!ControllerLocal.instance) {
      ControllerLocal.instance = new ControllerLocal()
    }
    return ControllerLocal.instance
  }

  async getConnectedDevices (type?: 'audioinput' | 'audiooutput' | 'videoinput') {
    const devices = await navigator.mediaDevices.enumerateDevices()
    if (type) return devices.filter(device => device.kind === type)
    else return devices
  }

  async openCamera () {
    const auxMediaStream = await navigator.mediaDevices.getUserMedia({ video: { aspectRatio: 1.7777777778 }, audio: false })
    const videoTrack = auxMediaStream.getVideoTracks()
    if (!videoTrack[0]) throw new Error('Not Found Video Track')
    this.mediaStreamTrackVideo = videoTrack[0]
  }

  async openAudio () {
    const auxMediaStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: { suppressLocalAudioPlayback: true, echoCancellation: true } })
    const audioTrack = auxMediaStream.getAudioTracks()
    if (!audioTrack[0]) throw new Error('Not Found Audio Track')
    this.mediaStreamTrackAudio = audioTrack[0]
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
    this._mediaStreamTrackVideo = null
  }

  set mediaStreamTrackAudio (trackAudio: MediaStreamTrack|null) {
    if (!trackAudio) this.removeTrackAudio()
    else this.mediaStream.addTrack(trackAudio)
    this._mediaStreamTrackAudio = trackAudio
  }

  get mediaStreamTrackAudio () {
    return this._mediaStreamTrackAudio
  }

  removeTrackAudio () {
    if (this._mediaStreamTrackAudio) this.mediaStream.removeTrack(this._mediaStreamTrackAudio)
    this._mediaStreamTrackAudio = null
  }
}
