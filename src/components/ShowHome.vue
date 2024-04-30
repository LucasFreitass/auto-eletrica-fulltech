<template>
  <v-container fluid class="custom-container">
    <NewAppointmentModal
      v-model="showNewAppointmentModal"
      :currentUser="getUser"
    />
    <v-btn-toggle>
      <v-btn outlined color="#05571D" @click="openNewAppointmentModal">
        <strong>SOLICITAR SERVIÇO</strong>
      </v-btn>
    </v-btn-toggle>
    <div class="custom-spacer"></div>
    <v-btn-toggle>
      <v-btn dark outlined color="#05571D" to="/appointments" background="red">
        <strong>LISTA DE SERVIÇOS</strong>
      </v-btn>
    </v-btn-toggle>
    <div v-if="this.getUser.admin" class="custom-spacer"></div>
    <v-btn-toggle>
      <v-btn v-if="this.getUser.admin" outlined color="#05571D" to="/cadastro">
        <strong>CADASTRAR USUÁRIO</strong>
      </v-btn>
    </v-btn-toggle>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import NewAppointmentModal from './NewAppointmentModal'

  export default {
    data() {
      return {
        showNewAppointmentModal: false,
      }
    },
    components: {
      NewAppointmentModal,
    },
    methods: {
      logout() {
        this.$store.dispatch('auth/logout')
        this.$router.push('/login')
      },
      openNewAppointmentModal() {
        this.showNewAppointmentModal = true
      },
    },
    computed: {
      ...mapGetters({
        getUser: 'user/getUser',
      }),
    },
  }
</script>

<style scoped>
  .custom-container {
    background-image: url(../assets/background.png);
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .custom-spacer {
    width: 20px;
  }
</style>
