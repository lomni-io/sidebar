<template>
  <ul>
    <li class="active">Tabs</li>
    <li>Frames</li>
    <li>Sync</li>
  </ul>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent( {
  name: "NavBar"
})

</script>

<style scoped lang="scss">

ul{
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid var(--background_input_border);
  background-color: var(--background_input);
  color: var(--text_color);
  font-size: 0.8em;
}
li{
  cursor: pointer;
  height: 21px;
  background-color: var(--background_input);
  /*border-right: 1px solid var(--background_input_border);*/
  padding: 2px 10px 2px 10px;
  &.active{
    filter: var(--hover);
    background-color: var(--background_dark);
  }
  &:hover {
    filter: var(--hover);
  }
}

</style>