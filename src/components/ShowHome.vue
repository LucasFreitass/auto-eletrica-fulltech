<template>
  <v-container fluid class="custom-container">
    <v-btn-toggle>
      <v-btn outlined color="#05571D" to="/solicitar-serviço"><strong>SOLICITAR SERVIÇO</strong></v-btn>
      <v-btn outlined color="#05571D" to="/appointments"><strong>LISTA DE SERVIÇOS</strong></v-btn>
      <v-btn v-if="this.getUser.admin" outlined color="#05571D" to="/cadastro">
        <strong>CADASTRAR USUÁRIO</strong>
      </v-btn>
    </v-btn-toggle>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {}
    },
    methods: {
      logout() {
        this.$store.dispatch('auth/logout')
        this.$router.push('/login')
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

  .v-btn-toggle {
    width: 100%;
    margin: auto;
  }

  .v-btn {
    flex: 1;
    border-radius: 4px;
  }
</style>
