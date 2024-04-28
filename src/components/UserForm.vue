<template>
  <v-container class="custom-container">
    <v-snackbar
      v-model="this.error"
      :value="true"
      absolute
      top
      right
      color="red"
      vertical
    >
      <div class="text-subtitle-1 pb-2">Usuário já cadastrado</div>

      <v-btn color="indigo" variant="text" @click="closeError">Close</v-btn>
    </v-snackbar>
    <v-card>
      <v-card-title>CADASTRO DE CLIENTE</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="addUser">
          <v-text-field
            v-model="User.nome"
            :rules="nameRules"
            label="Nome"
            placeholder="Nome do Cliente"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="User.cpf"
            label="CPF"
            placeholder="000.000.000-00"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="User.email"
            label="E-mail"
            placeholder="email@gmail.com"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="User.telefone"
            label="Telefone"
            placeholder="(99) 9999-9999"
            outlined
            required
          ></v-text-field>
          <v-checkbox
            v-if="this.getUser.admin"
            label="Admin"
            v-model="User.admin"
            outlined
          ></v-checkbox>

          <v-btn type="submit" color="success">CADASTRAR</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        User: {
          nome: '',
          cpf: '',
          email: '',
          telefone: '',
          admin: false,
        },
        nameRules: [(v) => !!v || 'Name is required'],
        error: '',
      }
    },
    methods: {
      async addUser() {
        this.error = ''
        const isUserAdd = await this.$store.dispatch('user/addUser', this.User)
        if (isUserAdd) {
          this.$router.push('/')
        } else {
          this.error = true
        }
      },
      closeError() {
        this.error = false
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
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .v-card {
    max-width: 600px;
    margin: auto;
    overflow: hidden;
  }

  .v-card-title {
    background-color: #f5f5f5;
    color: #424242;
    text-transform: uppercase;
  }

  .v-card-text {
    padding: 16px;
  }

  .v-text-field {
    margin-bottom: 10px;
  }

  .v-btn {
    width: 100%;
    border-radius: 4px;
    margin-top: 20px;
  }
</style>
