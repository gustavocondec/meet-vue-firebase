export class ControllerRemote {
  // eslint-disable-next-line no-use-before-define
  static instance: ControllerRemote
  readonly mediaStream
  private _mediaStreamTrackVideo: MediaStreamTrack|null = null
  private _mediaStreamTrackAudio: MediaStreamTrack|null = null
  constructor () {
    this.mediaStream = new MediaStream()
  }

  public static getInstance ():ControllerRemote {
    if (!ControllerRemote.instance) {
      ControllerRemote.instance = new ControllerRemote()
    }
    return ControllerRemote.instance
  }

  setMediaStream (stream:MediaStream) {
    stream.getTracks().forEach((track) => {
      if (track.kind === 'audio') {
        this.removeTrackAudio()
        this.mediaStreamTrackAudio = track
      }
      if (track.kind === 'video') {
        this.removeTrackVideo()
        this.mediaStreamTrackVideo = track
      }
    })
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
