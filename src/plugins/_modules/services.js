import api from '../_api'

const state = {
  services: [],
}

const mutations = {
  SET_SERVICES(state, services) {
    state.services = services
  },
}

const actions = {
  async fetchServices({ commit }) {
    try {
      const result = await api.Servico.GetAll()

      commit('SET_SERVICES', result)

      return result
    } catch (error) {
      console.log('There was an error:', error)
    }
  },
}

const getters = {
  getServices: (state) => state.services,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
