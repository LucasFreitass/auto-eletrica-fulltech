import Vue from 'vue'
import Vuex from 'vuex'
import auth from './_modules/auth'
import user from './_modules/user'
import services from './_modules/services'
import VuexPersist from 'vuex-persist'
import appointments from './_modules/appointments'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'Fulltech',
  storage: window.localStorage,
})

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    user,
    services,
    appointments,
  },
  plugins: [vuexPersist.plugin],
})
