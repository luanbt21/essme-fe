export interface Auth {
  status: boolean
}

const state = () => ({
  status: false
})

const getters = {}

const actions = {}

const mutations = {
  auth(state: Auth, status: boolean) {
    state.status = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
