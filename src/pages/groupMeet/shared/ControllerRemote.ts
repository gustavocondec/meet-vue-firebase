export class ControllerRemote {
  // eslint-disable-next-line no-use-before-define
  static instance: ControllerRemote
  mediaStream
  constructor () {
    this.mediaStream = new MediaStream()
  }

  public static getInstance ():ControllerRemote {
    if (!ControllerRemote.instance) {
      ControllerRemote.instance = new ControllerRemote()
    }
    return ControllerRemote.instance
  }
}
