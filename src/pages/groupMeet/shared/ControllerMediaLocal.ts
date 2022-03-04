import { ControllerMedia } from 'pages/groupMeet/shared/ControllerMedia'

export class ControllerMediaLocal extends ControllerMedia {
  // eslint-disable-next-line no-use-before-define
  static instance: ControllerMediaLocal
  // constructor () {
  //   super()
  // }

  public static getInstance ():ControllerMediaLocal {
    if (!ControllerMediaLocal.instance) {
      ControllerMediaLocal.instance = new ControllerMediaLocal()
    }
    return ControllerMediaLocal.instance
  }

  async getConnectedDevices (type?: 'audioinput' | 'audiooutput' | 'videoinput') {
    const devices = await navigator.mediaDevices.enumerateDevices()
    if (type) return devices.filter(device => device.kind === type)
    else return devices
  }

  async checkPermisions () {
    return await navigator.permissions.query({ name: 'geolocation' })
  }

  async openCamera () {
    console.log('getConnectedDevices', await this.getConnectedDevices())
    console.log('checkPermisions', await this.checkPermisions())
    try {
      const auxMediaStream = await navigator.mediaDevices.getUserMedia({ video: { aspectRatio: 1.7777777778 }, audio: false })
      const videoTrack = auxMediaStream.getVideoTracks()
      if (!videoTrack[0]) throw new Error('Not Found Video Track')
      console.log('videotrack', videoTrack[0])
      this.mediaStreamTrackVideo = videoTrack[0]
    } catch (e) {
      console.error(e)
      // throw e
    }
  }

  async openAudio () {
    try {
      const auxMediaStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: { suppressLocalAudioPlayback: true, echoCancellation: true } })
      const audioTrack = auxMediaStream.getAudioTracks()
      if (!audioTrack[0]) throw new Error('Not Found Audio Track')
      console.log('audioTrack', audioTrack[0])
      this.mediaStreamTrackAudio = audioTrack[0]
    } catch (e) {
      console.error(e)
      // throw e
    }
  }
}
