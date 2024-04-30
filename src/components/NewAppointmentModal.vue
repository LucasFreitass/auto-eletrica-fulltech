<template>
  <v-dialog v-model="show" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Novo atendimento</span>
        <div class="custom-spacer"></div>
        <v-btn icon @click.stop="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step :complete="step > 1" step="1">Cliente</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="step > 2" step="2">Serviço</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card-text>
              <v-form @submit.prevent="checkCpf">
                <v-text-field
                  v-model="cpf"
                  label="CPF"
                  placeholder="000.000.000-00"
                  outlined
                  required
                  :readonly="currentUser && !currentUser.admin"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-alert v-if="errorMessage" type="error" outlined>
              {{ errorMessage }}
            </v-alert>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" variant="text" @click="checkCpf">
                CONTINUAR
              </v-btn>
            </v-card-actions>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card-text>
              <v-form ref="form">
                <v-row>
                  <v-col md="8" sm="12">
                    <v-text-field
                      v-model="veiculo.modelo"
                      label="Modelo do Veículo"
                      placeholder="PALIO"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col md="4" sm="6">
                    <v-text-field
                      v-model="veiculo.cor"
                      label="Cor do Veículo"
                      placeholder="BRANCO"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="8" sm="12">
                    <v-text-field
                      v-model="veiculo.placa"
                      label="Placa do Veículo"
                      placeholder="QIJ-4114"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col md="4" sm="6">
                    <v-menu
                      ref="menuYear"
                      :close-on-content-click="true"
                      v-model="menuYear"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date"
                          label="Ano do Veículo"
                          v-on="on"
                          readonly
                          outlined
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        reactive
                        show-current
                        ref="picker"
                        v-model="date"
                        min="1950-NaN-NaN"
                        max="2025-NaN-NaN"
                        no-title
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="8" sm="12">
                    <v-select
                      v-model="atendimento.servicos"
                      :items="services"
                      item-text="nome"
                      item-value="id"
                      label="Serviços"
                      chips
                      multiple
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col md="4" sm="6">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="atendimento.data"
                          label="Data do Atendimento"
                          readonly
                          outlined
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="atendimento.data"
                        no-title
                        scrollable
                        color="green lighten-1"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="success" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="success"
                          @click="$refs.menu.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>

            <v-row class="custom-save-row">
              <v-col cols="2">
                <v-btn @click="step = 1">VOLTAR</v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn @click="saveAppointment" color="success">
                  CRIAR ORDEM DE SERVIÇO
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
  import services from '@/plugins/_modules/services'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return this.defaultData()
    },
    mounted() {
      this.fetchServices(), this.setCpf()
    },
    methods: {
      defaultData() {
        return {
          cpf: '',
          errorMessage: '',
          step: 1,
          user: undefined,
          veiculo: {
            modelo: '',
            placa: '',
            cor: '',
            ano: null,
          },
          atendimento: {
            data: null,
            servicos: [],
          },
          services: [],
          menu: false,
          menuYear: false,
        }
      },
      async checkCpf() {
        if (this.cpf !== '') {
          this.errorMessage = ''
          const user = await this.$store.dispatch('user/findByCPF', {
            cpf: this.cpf,
          })
          if (user) {
            this.user = user
            this.step = 2
          } else {
            this.errorMessage = 'Usuário não cadastrado'
          }
        } else {
          this.errorMessage = 'Digite um CPF válido'
        }
      },
      async fetchServices() {
        await this.$store.dispatch('services/fetchServices')
        this.services = this.getServices
      },
      async saveAppointment() {
        const createdAppointment = await this.$store.dispatch(
          'appointments/createAppointment',
          {
            atendimento: this.atendimento,
            veiculo: this.veiculo,
            user: this.user,
          }
        )
        if (!!createdAppointment) {
          await this.$store.dispatch('appointments/fetchAppointments', {
            isAdmin: this.user.admin,
            userId: this.user.id,
          })
          this.show = false
        } else console.log('ERROR')
      },
      resetData() {
        Object.assign(this.$data, this.defaultData(), {
          services: this.services,
        })
        this.setCpf()
      },
      setCpf() {
        if (this.currentUser && !this.currentUser.admin) {
          this.cpf = this.currentUser.cpf
        }
      },
    },
    props: {
      value: Boolean,
      currentUser: Object,
    },
    computed: {
      show: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
          if (!value) {
            this.resetData()
          }
        },
      },
      ...mapGetters({
        getServices: 'services/getServices',
      }),
      date: {
        get: function () {
          return this.veiculo.ano
        },
        set: function (newValue) {
          this.veiculo.ano = newValue.split('-')[0]
        },
      },
    },
    watch: {
      menuYear(val) {
        val &&
          this.$nextTick(
            () => (this.$refs.picker.internalActivePicker = 'YEAR')
          )
      },
    },
  }
</script>

<style scoped>
  .custom-spacer {
    width: 500px;
  }
</style>
