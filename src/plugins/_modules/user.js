import api from '../_api'

const state = {
  data: {}
}

const mutations = {
  SET_USER_DATA(state, userData) {
    state.data = userData
  }
}

const actions = {
  setUserData({ commit }, userData) {
    commit('SET_USER_DATA', userData)
  },
  async addUser({ commit }, user) {
    try {
      const sanitizedUser = {
        nome: user.nome.trim(),
        cpf: user.cpf,
        email: user.email.toLowerCase().trim(),
        telefone: user.telefone.trim(),
        admin: false
      }

      await api.Usuario.Post(sanitizedUser)
    } catch (error) {
      console.error('Failed to add user:', error)
    }
  }
}
  
  const getters = {
    getUser: state => state.data
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }