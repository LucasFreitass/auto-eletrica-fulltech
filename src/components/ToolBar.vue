<template>
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
    <h4>{{ this.getUser.admin ? 'ADMIN' : this.getUser.nome }}</h4>
    <v-btn icon @click="logout">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-toolbar>
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

<style scoped></style>
