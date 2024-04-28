<template>
  <v-container class="custom-container" >
    <v-card class="mx-auto" max-width="400">
      <v-card-title class="primary">
        <span class="headline">Login</span>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="cpf" label="000.000.000-00"  outlined required></v-text-field>
          <v-btn @click="goToRoute" color="success">CADASTRAR</v-btn>
          <v-btn type="submit" color="success">ENTRAR</v-btn>
        </v-form>
        
        <v-alert v-if="errorMessage" type="error" outlined>{{ errorMessage }}</v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cpf: '',
      errorMessage: ''
    }
  },
  methods: {
    async login() {
      if (this.cpf !== '') {
        this.errorMessage = ''
        await this.$store.dispatch('auth/login', this.cpf)
        this.$router.push('/home')
      } else {
        this.errorMessage = 'digita um CPF ai filhão'
      }
    },
    goToRoute() {
      this.$router.push('/cadastro')
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>

<style scoped>
.custom-container {
  background-image: url(../assets/background.png);
  background-size: cover;
}

.custom-card {
  border-radius: 20px;
  padding: 20px;
}
</style>