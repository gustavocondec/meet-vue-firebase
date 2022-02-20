import { Module } from 'vuex'
import { StateInterface } from 'src/store'
import state, { RtcStateInterface } from './state'
import mutations from './mutations'
import actions from './actions'

const rtcModule: Module<RtcStateInterface, StateInterface> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default rtcModule
