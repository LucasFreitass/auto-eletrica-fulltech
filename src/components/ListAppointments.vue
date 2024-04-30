<template>
  <v-container class="custom-container">
    <NewAppointmentModal
      v-model="showNewAppointmentModal"
      :currentUser="getUser"
    />
    <EditAppointmentModal
      v-model="showEditAppointmentModal"
      :appointment.sync="selectedAppointment"
    />
    <v-data-table
      dark
      :headers="headers"
      :items="filteredAppointments"
      :items-per-page="5"
      class="elevation-1 custom-table"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-row class="justify-space-between">
            <v-col cols="3">
              <v-btn
                outlined
                icon
                color="green"
                @click="openNewAppointmentModal"
                class="custom-spacer"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn outlined icon @click="reloadPage" class="custom-spacer">
                <v-icon>mdi-reload</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="mr-3"
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="d-flex justify-end">
              <v-btn outlined to="/">VOLTAR</v-btn>
            </v-col>
          </v-row>
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
            <v-icon :color="statusServicesIcons[service.status].color">
              {{ statusServicesIcons[service.status].name }}
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
  import EditAppointmentModal from './EditAppointmentModal'
  import { statusAppointment, statusServicesIcons } from '../constants/constant'

  export default {
    data() {
      return {
        headers: [],
        showNewAppointmentModal: false,
        showEditAppointmentModal: false,
        statusServicesIcons,
        selectedAppointment: {},
        search: '',
      }
    },
    components: {
      NewAppointmentModal,
      EditAppointmentModal,
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
        this.selectedAppointment = item
        this.showEditAppointmentModal = true
      },
      deleteAppointment(appointment) {
        this.$store.dispatch('appointments/deleteAppointment', {
          appointmentId: appointment.id,
          isAdmin: this.getUser.admin,
          userId: this.getUser.id,
        })
      },
      openNewAppointmentModal() {
        this.showNewAppointmentModal = true
      },
      openEditAppointmentModal() {
        this.showEditAppointmentModal = true
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
      filteredAppointments() {
        if (!this.search.trim()) {
          return this.getAppointments
        }
        return this.getAppointments.filter((item) => {
          return Object.keys(item).some((key) => {
            const value = item[key]
            if (typeof value === 'object') {
              return JSON.stringify(value)
                .toLowerCase()
                .includes(this.search.toLowerCase())
            }
            return String(value)
              .toLowerCase()
              .includes(this.search.toLowerCase())
          })
        })
      },
    },
  }
</script>

<style scoped>
  ::v-deep .v-data-table th {
    background-color: #757070;
  }
  ::v-deep .v-data-table .v-data-table__wrapper table tr {
    background-color: #757070;
  }
  ::v-deep .v-toolbar__content {
    background-color: #757070;
  }
  ::v-deep .v-data-footer {
    background-color: #757070;
  }

  .custom-table {
    padding: 32px 16px;
  }

  ::v-deep .custom-table .v-data-table-header,
  ::v-deep .custom-table .v-data-table__wrapper table tbody tr td,
  ::v-deep .custom-table .v-data-footer {
    color: white;
    font-weight: bold;
  }

  .custom-spacer {
    margin: 0 16px;
  }

  .custom-container {
    padding-top: 30px;
  }

  .theme--dark.v-data-table {
    background-color: #757070;
  }
</style>
