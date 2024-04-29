import api from '../_api'

const state = {
  data: {},
}

const mutations = {
  SET_USER_DATA(state, userData) {
    state.data = userData
  },
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
        admin: user.admin,
      }
      const isUserExist = await api.Usuario.GetByCpf(user.cpf)
      if (!isUserExist) {
        await api.Usuario.Post(sanitizedUser)

        return true
      }
      return false
    } catch (error) {
      console.error('Failed to add user:', error)
    }
  },
  async findByCPF({}, { cpf }) {
    const user = await api.Usuario.GetByCpf(cpf)
    if (!user) {
      return undefined
    }
    return user
  },
}

const getters = {
  getUser: (state) => state.data,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
