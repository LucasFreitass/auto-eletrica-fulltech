<template>
  <v-container class="custom-container">
    <v-card class="mx-auto" max-width="400">
      <v-img src="../assets/logo.png" class="logo"></v-img>

      <v-card-title class="text-center">
        <span class="headline">AUTO ELÉTRICA FULLTECH</span>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="cpf"
            label="CPF"
            placeholder="000.000.000-00"
            outlined
            required
          ></v-text-field>
          <v-btn-toggle>
            <v-btn @click="goToRoute" color="success">CADASTRAR</v-btn>
            <v-btn type="submit" color="success">ENTRAR</v-btn>
          </v-btn-toggle>
        </v-form>

        <v-alert v-if="errorMessage" type="error" outlined>
          {{ errorMessage }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        cpf: '',
        errorMessage: '',
      }
    },
    methods: {
      async login() {
        if (this.cpf !== '') {
          this.errorMessage = ''
          const isLogged = await this.$store.dispatch('auth/login', this.cpf)
          if (isLogged) {
            this.$router.push('/home')
          } else {
            this.errorMessage = 'Voce precisa criar um cadastro'
          }
        } else {
          this.errorMessage = 'digita um CPF ai filhão'
        }
      },
      goToRoute() {
        this.$router.push('/cadastro')
      },
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
      },
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

  .logo {
    width: 100px;
    margin: auto;
    display: block;
    padding-bottom: 16px;
  }

  .text-center {
    text-align: center;
  }

  .v-btn-toggle {
    display: flex;
    justify-content: space-between;
  }
</style>
