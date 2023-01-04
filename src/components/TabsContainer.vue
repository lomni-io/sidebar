<template>
 <div id="tabs" class="tabs">
    <slot></slot>
 </div>
</template>

<script>
export default {
  name: "TabsContainer",
  components: {},
}
</script>

<style scoped lang="scss">

/* Accordion styles */
.tabs {
  box-shadow: 0 4px 4px -2px rgba(0,0,0,0.5);
  overflow: hidden;
}


</style>