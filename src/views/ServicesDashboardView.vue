<template>
  <div>
    <tool-bar />
    <services-dashboard />
  </div>
</template>

<script>
  import ToolBar from '../components/ToolBar'
  import ServicesDashboard from '../components/ServicesDashboard'

  export default {
    components: {
      ToolBar,
      ServicesDashboard,
    },
  }
</script>
