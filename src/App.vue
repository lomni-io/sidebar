<template>
  <SidebarView></SidebarView>
</template>

<style lang="scss">

* {
  --background-primary: #DADADAFF;
}

h1{
  color: var(--blue);
}

input{
  background-color: var(--background_input);
  color: var(--text_color);
  border-color: transparent;
}



body{
  background-color: var(--background_main);
  margin: 0;
  overflow : auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--bg1);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--gray_1);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--gray_1);
}

</style>
<script>
import SidebarView from "@/views/SidebarView";
export default {
  components: {SidebarView}
}
</script>