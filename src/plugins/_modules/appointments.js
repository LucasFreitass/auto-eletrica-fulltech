import api from '../_api'

const state = {
  appointments: [],
}

const mutations = {
  SET_APPOINTMENTS(state, appointments) {
    state.appointments = appointments
  },
}

const actions = {
  async fetchAppointments({ commit }, { isAdmin, userId }) {
    try {
      const response = isAdmin
        ? await api.Atendimento.GetAll()
        : await api.Atendimento.GetAllByUser(userId)

      commit('SET_APPOINTMENTS', response)
    } catch (error) {
      console.log('There was an error:', error.response)
    }
  },
  async deleteAppointment({ dispatch }, { appointmentId, isAdmin, userId }) {
    if (!isAdmin) {
      return 
    }

    await api.Atendimento.Delete(appointmentId)
    await dispatch('fetchAppointments', { isAdmin, userId })
  },
  async updateAppointment({ dispatch }, { appointmentId, isAdmin, userId, newData }) {
    if (!isAdmin) {
      return 
    }
    
    await api.Atendimento.Patch(appointmentId, newData)
    await dispatch('fetchAppointments', { isAdmin, userId })
  },
}

const getters = {
  getAppointments: (state) => state.appointments,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
