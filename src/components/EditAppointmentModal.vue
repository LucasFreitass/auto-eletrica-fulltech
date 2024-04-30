<template>
  <v-dialog v-model="show" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Editar Serviços</span>
        <v-btn icon @click.stop="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-btn icon color="green">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-data-table :headers="headers" :items="newServices" hide-default-footer>
        <template v-slot:[`item.status`]="{ item }">
          <v-select
            :items="StatusServices"
            v-model="item.status"
            item-text="status"
            item-value="id"
            label=""
          ></v-select>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon @click="deleteService(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <v-btn text @click.stop="show = false">CANCELAR</v-btn>

      <v-btn @click="updatedAppointment" color="success">SALVAR</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
  import { StatusServices } from '../constants/constant'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        headers: [
          { text: 'Nome', value: 'nome', sortable: false },
          { text: 'Status do Serviço', value: 'status', sortable: false },
          { text: 'Excluir', value: 'actions', sortable: false },
        ],
        StatusServices,
        newServices: null,
      }
    },
    watch: {
      appointment: {
        handler(newAppointment) {
          if (newAppointment && newAppointment.servicos) {
            this.newServices = JSON.parse(
              JSON.stringify(newAppointment.servicos)
            )
          }
        },
        immediate: true,
      },
    },
    methods: {
      async updatedAppointment() {
        const newAppointment = {
          ...this.appointment,
          servicos: this.newServices,
        }
        const updateAppointment = await this.$store.dispatch(
          'appointments/updateAppointment',
          {
            appointmentData: newAppointment,
            appointmentId: this.appointment.id,
            isAdmin: this.getUser.admin,
            userId: this.getUser.id,
          }
        )

        console.log('updateAppointment', { updateAppointment })
        if (!!updateAppointment) {
          this.show = false

          // ABRIR O TOOLTIP FALANDO ATENDIMENTO ATUALIZADO COM SUCESSO!
        } else console.log('ERROR')
        // MANTER A MODAL ABERTA E MOSTRAR TOOLTIP DE ERRO
      },
      deleteService(item) {
        this.newServices = this.newServices.filter(
          (servico) => servico.id !== item.id
        )
      },
      resetData() {
        this.newServices = JSON.parse(JSON.stringify(this.appointment.servicos))
      },
    },
    props: {
      value: Boolean,
      appointment: Object,
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
        getUser: 'user/getUser',
      }),
    },
  }
</script>
