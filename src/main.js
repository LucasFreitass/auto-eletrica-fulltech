import Vue from 'vue'
import { VueMaskDirective } from 'v-mask'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'
import vuetify from './plugins/vuetify'
import api from './plugins/_api'
import './plugins/axios'

Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.directive('mask', VueMaskDirective)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
