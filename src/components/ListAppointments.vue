<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="appointments"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip color="green" dark>{{ getStatusName(item.status) }}</v-chip>
      </template>

      <template v-if="getUser.admin" slot="item.actions" slot-scope="{ item }">
        <v-icon @click="editAppointment(item)" class="mr-2">mdi-pencil</v-icon>
        <v-icon @click="deleteAppointment(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        headers: [],
      }
    },
    mounted() {
      this.headers = [
        { text: 'VEICULO', value: 'veiculo.modelo' },
        { text: 'COR', value: 'veiculo.cor' },
        { text: 'PLACA', value: 'veiculo.placa' },
        { text: 'SERVIÇOS', value: 'servicos.nome' },
        { text: 'STATUS', value: 'status' },
      ].concat(this.getUser.admin ? [{ text: 'AÇÕES', value: 'actions' }] : [])
    },
    created() {
      this.fetchAppointments()
    },
    methods: {
      fetchAppointments() {
        this.$store.dispatch('appointments/fetchAppointments', {
          isAdmin: this.getUser.admin,
          userId: this.getUser.id,
        })
      },
      getStatusName(status) {
        if (status === 0) return 'AGUARDANDO'
        if (status === 1) return 'EM ATENDIMENTO'
        if (status === 2) return 'FINALIZADO'
      },
      editAppointment(item) {
        // Add edit page route
        console.log('Edit item:', item)
      },
      deleteAppointment(appointment) {
        console.log('appointment', appointment)
        console.log('appointment id', appointment.id)

        this.$store.dispatch('appointments/deleteAppointment', {
          appointmentId: appointment.id,
          isAdmin: this.getUser.admin,
          userId: this.getUser.id,
        })
      },
    },
    computed: {
      ...mapState('appointments', {
        appointments: (state) => state.appointments,
      }),
      ...mapGetters({
        getUser: 'user/getUser',
      }),
    },
  }
</script>
