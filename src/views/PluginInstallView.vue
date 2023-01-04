<template>
  <h1>How to install lomni plugin</h1>
</template>

<script>
export default {
  name: "PluginInstallView",
  mounted() {
    if (this.port){
      window.location.href = '/radar';
    }
  }
}
</script>

<style scoped>

</style>