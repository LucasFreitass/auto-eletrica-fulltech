<template>
  <v-container fluid class="custom-container">
    <v-card class="nx-auto">
      <v-row class="justify-space-between align-center">
        <div></div>
        <v-card-title>CADASTRO DE CLIENTE</v-card-title>

        <v-btn icon @click="close">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-row>
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
            v-mask="'###.###.###-##'"
            @keydown="allowOnlyNumbers"
            outlined
            required
            :rules="cpfRules"
          ></v-text-field>
          <v-text-field
            v-model="User.email"
            label="E-mail"
            placeholder="email@gmail.com"
            outlined
            required
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            v-model="User.telefone"
            label="Telefone"
            placeholder="(99) 99999-9999"
            v-mask="'(##) #####-####'"
            @keydown="allowOnlyNumbers"
            outlined
            required
            :rules="telefoneRules"
          ></v-text-field>
          <v-checkbox
            v-if="this.getUser.admin"
            label="Admin"
            v-model="User.admin"
            outlined
          ></v-checkbox>

          <v-btn class="custom-button" type="submit" color="success">
            CADASTRAR
          </v-btn>
        </v-form>
        <v-alert v-if="error" type="error" outlined>
          {{ error }}
        </v-alert>
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

        error: '',

        nameRules: [(v) => !!v || 'O nome é obrigatório'],
        cpfRules: [
          (v) => !!v || 'O CPF é obrigatório',
          (v) =>
            /^(?:\d{3}\.){2}\d{3}-\d{2}$/.test(v) ||
            'Formato de CPF inválido. Use o formato xxx.xxx.xxx-xx',
        ],
        emailRules: [
          (v) => !!v || 'O email é obrigatório',
          (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'E-mail inválido',
        ],
        telefoneRules: [
          (v) => !!v || 'O telefone é obrigatório',
          (v) =>
            /^\(\d{2}\) \d{4,5}-\d{4}$/.test(v) ||
            'Formato de telefone inválido. Use o formato (xx) xxxx-xxxx ou (xx) xxxxx-xxxx',
        ],
      }
    },
    methods: {
      async addUser() {
        this.error = ''
        if (this.$refs.form.validate()) {
          const isUserAdd = await this.$store.dispatch(
            'user/addUser',
            this.User
          )
          if (isUserAdd) {
            this.$router.push('/login')
            this.$refs.form.resetValidation()
          } else {
            this.error = 'Usuário já existe'
          }
        } else {
          this.error = 'Preencha todos os campos corretamente.'
        }
      },
      closeError() {
        this.error = false
        this.$refs.form.resetValidation()
      },
      async close() {
        await this.$router.push('/login')
        if (!!this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      },
      allowOnlyNumbers(event) {
        if (
          !/[0-9]/.test(event.key) &&
          event.key !== 'Backspace' &&
          event.key !== 'Tab'
        ) {
          event.preventDefault()
        }
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
    min-width: 500px;
    border-radius: 20px;
    padding: 40px;
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

  .custom-button {
    width: 100%;
  }
</style>
