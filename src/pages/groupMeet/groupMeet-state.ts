import { ActionTree, Module, MutationTree } from 'vuex'
import { StateInterface } from 'src/store'
import { getConnectedDevices, openAudioInput, openCamera, openShareMonitor } from 'pages/groupMeet/controllerMedia'
import { Notify } from 'quasar'
import { IMeet } from 'pages/groupMeet/shared/IGroupMeet'

export interface groupMeetStateInterface {
  myStream: IMeet,
  streamReceived: Array<IMeet>
}

function state (): groupMeetStateInterface {
  return {
    myStream: {} as IMeet,
    streamReceived: []
  }
}

const mutations: MutationTree<groupMeetStateInterface> = {
  setMyStreamAudioInput (state:groupMeetStateInterface, value: MediaStream | null) {
    state.myStream.streamAudio = value
  },
  setMyStreamCamera (state: groupMeetStateInterface, value: MediaStream | null) {
    state.myStream.streamCamera = value
  },
  setMyStreamMonitor (state: groupMeetStateInterface, value: MediaStream|null) {
    state.myStream.streamMonitor = value
  },
  stopMyStreamMonitor (state: groupMeetStateInterface) {
    if (state.myStream.streamMonitor) {
      const monitorTracks = state.myStream.streamMonitor.getVideoTracks()
      if (monitorTracks.length > 0) {
        monitorTracks[0].stop()
        state.myStream.streamMonitor.removeTrack(monitorTracks[0])
        state.myStream.streamMonitor = null
      }
    }
  },
  stopMyStreamCamera (state: groupMeetStateInterface) {
    if (state.myStream.streamCamera) {
      const videosTracks = state.myStream.streamCamera.getVideoTracks()
      if (videosTracks.length > 0) {
        videosTracks[0].stop()
        state.myStream.streamCamera.removeTrack(videosTracks[0])
        state.myStream.streamCamera = null
      }
    }
  },
  stopMyStreamAudio (state: groupMeetStateInterface) {
    if (state.myStream.streamAudio) {
      const inputsAudiosTracks = state.myStream.streamAudio.getAudioTracks()
      if (inputsAudiosTracks.length > 0) {
        inputsAudiosTracks[0].stop()
        state.myStream.streamAudio.removeTrack(inputsAudiosTracks[0])
        state.myStream.streamAudio = null
      }
    }
  }
}

const actions: ActionTree<groupMeetStateInterface, StateInterface> = {
  openDefaultAudioInput (context) {
    void getConnectedDevices('audioinput')
      .then((audioinputs) => {
        if (audioinputs.length === 0) {
          Notify.create({
            type: 'negative',
            message: 'No se hallo ningun Microfono'
          })
        } else {
          console.log('open default audio')
          const defaultInput = audioinputs.find(ai => ai.deviceId === 'default')
          void openAudioInput(defaultInput ? 'default' : audioinputs[0].deviceId)
            .then(value => {
              console.log('se abre')
              context.commit('setMyStreamAudioInput', value)
            })
        }
      })
      .catch(() => {
        Notify.create({
          type: 'negative',
          message: 'Error Abriendo el microfono'
        })
      })
  },
  closeDefaultInputAudio (context) {
    context.commit('stopMyStreamAudio')
  },
  openDefaultCamera (context) {
    void getConnectedDevices('videoinput')
      .then(async (videoinputs) => {
        if (videoinputs.length === 0) {
          Notify.create({
            type: 'negative',
            message: 'No se hallo ninguna camara'
          })
        } else {
          const defaultVideo = videoinputs.find(v => v.deviceId === 'default')
          const camera = await openCamera(defaultVideo ? 'default' : videoinputs[0].deviceId)
          context.commit('setMyStreamCamera', camera)
        }
      })
      .catch((e) => {
        Notify.create({
          type: 'negative',
          message: `Error Abriendo la camara: ${String(e)}`,
          timeout: 10000
        })
      })
  },
  closeDefaultCamera (context) {
    context.commit('stopMyStreamCamera')
  },
  async openMonitor (context) {
    try {
      const mediAstream = await openShareMonitor()
      context.commit('setMyStreamMonitor', mediAstream)
    } catch (e) {
      Notify.create({
        type: 'negative',
        message: 'Error compartiendo pantalla.'
      })
    }
  },
  closeMonitor (context) {
    context.commit('stopMyStreamMonitor')
  }
}

const groupMeetModule: Module<groupMeetStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  mutations,
  state
}

export default groupMeetModule
