<template>
  <div>
    <tool-bar />
    <show-home />
  </div>
</template>

<script>
  import ShowHome from '../components/ShowHome'
  import ToolBar from '../components/ToolBar'

  export default {
    components: {
      ShowHome,
      ToolBar,
    },
  }
</script>
