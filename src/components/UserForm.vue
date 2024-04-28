<template custom-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>CADASTRO DE CLIENTE</v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="addUser">
              <v-text-field
                v-model="User.nome"
                :rules="nameRules"
                label="Nome"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="User.cpf"
                label="000.000.000-00"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="User.email"
                label="email@gmail.com"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="User.telefone"
                label="(99) 9999-9999"
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
            <v-snackbar
              v-model="this.error"
              :value="true"
              absolute
              bottom
              color="red"
              center
              vertical
            >
              <div class="text-subtitle-1 pb-2">Usuário já cadastrado</div>

              <v-btn color="indigo" variant="text" @click="closeError">
                Close
              </v-btn>
            </v-snackbar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
 
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
  }
</style>
