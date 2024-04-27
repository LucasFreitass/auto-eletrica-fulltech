<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="services"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip color="green" dark>{{ getStatusName(item.status) }}</v-chip>
      </template>

      <template slot="item.actions" slot-scope="{ item }">
        <v-icon @click="editItem(item)" class="mr-2">mdi-pencil</v-icon>
        <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>


<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      headers: [
        { text: 'Nome', value: 'nome' },
        { text: 'Valor', value: 'valor' },
        { text: 'SERVIÇOS', value: 'nome' },
        { text: 'STATUS', value: 'status' },
        { text: 'AÇÕES', value: 'actions' }
      ],
    }
  },
  created() {
    this.fetchServices()
  },
  methods: {
    fetchServices() {
      this.$store.dispatch('services/fetchServices')
    },
    getStatusName(status) {
      if (status === 0) return 'AGUARDANDO'
      if (status === 1) return 'EM ATENDIMENTO'
      if (status === 2) return 'FINALIZADO'
    },
    editItem(item) {
      // Add edit page route
      console.log('Edit item:', item)
    },
    deleteItem(item) {
      // call Vuex action to delete item
      console.log('Delete item:', item)
    }
  },
  computed: {
    ...mapState('services', {
      services: state => state.services
    }),
  },
}
</script>
