import { ControllerMedia } from 'pages/groupMeet/shared/ControllerMedia'

export class ControllerMediaRemote extends ControllerMedia {
  // eslint-disable-next-line no-use-before-define
  static instance: ControllerMediaRemote
  // constructor () {
  //   super()
  // }
  public static getInstance ():ControllerMediaRemote {
    if (!ControllerMediaRemote.instance) {
      ControllerMediaRemote.instance = new ControllerMediaRemote()
    }
    return ControllerMediaRemote.instance
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
}
