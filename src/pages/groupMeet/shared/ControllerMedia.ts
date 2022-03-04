export class ControllerMedia {
  readonly mediaStream: MediaStream
  private _mediaStreamTrackVideo: MediaStreamTrack|null = null
  private _mediaStreamTrackAudio: MediaStreamTrack|null = null
  constructor () {
    this.mediaStream = new MediaStream()
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
