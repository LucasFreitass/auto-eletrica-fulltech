<template>
  <v-container>
    <NewAppointmentModal v-model="showNewAppointmentModal" />
    <v-data-table
      :headers="headers"
      :items="getAppointments"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-btn icon color="green" @click="openModal">
            <v-icon>mdi-plus</v-icon>
          </v-btn>

          <v-btn icon @click="reloadPage">
            <v-icon>mdi-reload</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.servicos`]="{ item }">
        <div
          v-for="service in item.servicos"
          :key="service.id"
          class="d-flex align-center"
        >
          <span>
            {{ service.nome }}
            <v-icon :color="statusServices[service.status].color">
              {{ statusServices[service.status].name }}
            </v-icon>
          </span>
        </div>
      </template>
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
  import { mapGetters } from 'vuex'
  import NewAppointmentModal from './NewAppointmentModal'
  import { statusAppointment, statusServices } from '../constants/constant'

  export default {
    data() {
      return {
        headers: [],
        showNewAppointmentModal: false,
        statusServices,
      }
    },
    components: {
      NewAppointmentModal,
    },
    mounted() {
      this.headers = [
        { text: 'VEICULO', value: 'veiculo.modelo' },
        { text: 'COR', value: 'veiculo.cor' },
        { text: 'PLACA', value: 'veiculo.placa' },
        { text: 'SERVIÇOS', value: 'servicos' },
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
        return statusAppointment[status]
      },
      editAppointment(item) {
        // Add edit page route
        console.log('Edit item:', item)
      },
      deleteAppointment(appointment) {
        this.$store.dispatch('appointments/deleteAppointment', {
          appointmentId: appointment.id,
          isAdmin: this.getUser.admin,
          userId: this.getUser.id,
        })
      },
      openModal() {
        this.showNewAppointmentModal = true
      },
      reloadPage() {
        window.location.reload()
      },
    },
    computed: {
      ...mapGetters({
        getUser: 'user/getUser',
      }),
      ...mapGetters({
        getAppointments: 'appointments/getAppointments',
      }),
    },
  }
</script>
