<template>
  <v-btn-toggle>
    <v-btn color="success" to="/solicitar-serviço">SOLICITAR SERVIÇO</v-btn>
    <v-btn color="success" to="/dashboard">LISTA DE SERVIÇOS</v-btn>
    <v-btn v-if="this.getUser.admin" color="success" to="/cadastro">
      CADASTRAR USUÁRIO
    </v-btn>
  </v-btn-toggle>
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
  .v-btn-toggle {
    width: 100%;
    margin: auto;
  }

  .v-btn {
    flex: 1;
    border-radius: 4px;
  }
</style>
