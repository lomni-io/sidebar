<template>
  <div id="authenticate">
    <input v-model="ghAccessKey">
    <input v-model="ghGistID">
  </div>
</template>

<script>
export default {
  name: "AuthenticateView",
  data() {
    return {
      ghAccessKey: '',
      ghGistID: ''
    }
  },
}
</script>

<style scoped>

</style>