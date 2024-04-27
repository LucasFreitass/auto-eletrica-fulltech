<template>
  <v-container custom-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>
            CADASTRO DE CLIENTE
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              @submit.prevent="addUser"
            >
              <v-text-field v-model="User.nome" :rules="nameRules" label="Nome" outlined required></v-text-field>
              <v-text-field v-model="User.cpf" label="000.000.000-00"  outlined></v-text-field>
              <v-text-field v-model="User.email" label="email@gmail.com"  outlined></v-text-field>
              <v-text-field v-model="User.telefone" label="(99) 9999-9999"  outlined></v-text-field>
              <v-btn type="submit" color="success">CADASTRAR</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      User: {
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        admin: false,
        nameRules: [
          v => !!v || 'Name is required'
        ],
      }
    }
  },
  methods: {
    addUser() {
      this.$store.dispatch('user/addUser', this.User)
    }
  }
}
</script>

<style scoped>
.custom-container {
  background-image: url(../assets/background.png);
  background-size: cover;
}
</style>