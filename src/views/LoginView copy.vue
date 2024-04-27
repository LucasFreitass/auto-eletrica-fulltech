<template>
  <v-container class="text-center my-4 custom-container">
    <v-row class="justify-center">
      <v-card rounded="xl">
        <v-img alt="Fulltech Logo"  src="../assets/logo.png" max-height="100" max-width="100" />
        
        <v-card-title >
          AUTO ELÉTRICA FULLTECH
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field v-model="cpf" label="000.000.000-00"  outlined></v-text-field>
            <v-btn @click="goToRoute" color="success">CADASTRAR</v-btn>
            <v-btn type="submit" color="success">ENTRAR</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cpf: ''
    }
  },
  created() {
    this.verifyLogin()
  },
  methods: {
    login() {
      this.$store.dispatch('verifyLogin', this.cpf)
    },
    goToRoute() {
      this.$router.push('/cadastro')
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