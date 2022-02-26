import { ActionTree, Module, MutationTree } from 'vuex'
import { StateInterface } from 'src/store'

export interface groupMeetStateInterface {
  name:string
}

function state (): groupMeetStateInterface {
  return {
    name: 'hola'
  }
}

const mutations: MutationTree<groupMeetStateInterface> = {

}

const actions: ActionTree<groupMeetStateInterface, StateInterface> = {

}

const groupMeetModule: Module<groupMeetStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  mutations,
  state
}

export default groupMeetModule
