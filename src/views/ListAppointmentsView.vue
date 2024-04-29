<template>
  <div>
    <tool-bar />
    <list-appointments />
  </div>
</template>

<script>
  import ToolBar from '../components/ToolBar'
  import ListAppointments from '../components/ListAppointments'

  export default {
    components: {
      ToolBar,
      ListAppointments,
    },
  }
</script>
