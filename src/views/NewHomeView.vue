<template>
  <div>
    <v-toolbar>
      <v-img
        alt="Fulltech Logo"
        class="shrink mr-2"
        contain
        src="../assets/logo.png"
        max-height="50"
        max-width="50"
      />
      <v-toolbar-title>AUTO ELÉTRICA FULLTECH</v-toolbar-title>
      <v-spacer></v-spacer>
      <h4>{{ this.getUser.admin === true ? 'ADMIN' : this.getUser.nome }}</h4>
      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>

    <v-btn color="success" to="/solicitar-serviço">SOLICITAR SERVIÇO</v-btn>
    <v-btn color="success" to="/dashboard">LISTA DE SERVIÇOS</v-btn>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {}
    },
    methods: {},
    computed: {
      ...mapGetters({
        getUser: 'user/getUser',
      }),
    },
  }
</script>

<style scoped></style>
