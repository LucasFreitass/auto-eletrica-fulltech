<template>
  <v-container fluid class="custom-container">
    <v-card >
      <v-col class="justify-center">
      <v-img src="../assets/logo.png" class="logo"></v-img>
    </v-col>

    <v-col class="justify-center">
      <v-card-title class="text-center">
        <span class="headline">AUTO ELÉTRICA FULLTECH</span>
      </v-card-title>
    </v-col>
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
            <div class="custom-spacer"></div>
            <v-btn type="submit" color="success">ENTRAR</v-btn>
          </v-btn-toggle>
        </v-form>
        <v-col class="justify-center">
        <v-alert v-if="errorMessage" type="error" outlined>
          
          {{ errorMessage }}
        </v-alert>
      </v-col>
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
            this.errorMessage = 'CPF não encontrado. Por favor, crie um cadastro.'
          }
        } else {
          this.errorMessage = 'Digite um CPF válido'
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

  .custom-spacer {
    width: 20px;
  }

  .custom-container {
    background-image: url(../assets/background.png);
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: 70px;
    margin: auto;
    display: block;
   
  }

  .text-center {
    text-align: center;
  }

  .v-btn-toggle {
    display: flex;
    justify-content: space-between;
  }

  .v-card {
    min-width: 300px;
    min-height: 400px;
    border-radius: 20px;
    margin: auto;
    overflow: hidden;
    padding: 32px 16px;
  }
</style>
