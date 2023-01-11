<template>
  <NavBar></NavBar>
  <SearchContainer v-if="renderData" :render-data="renderData"></SearchContainer>
</template>

<script lang="ts">

const renderData = require('./renderData.json')

import {defineComponent} from "vue";
import NavBar from "@/components/v2/NavBar.vue";
import SearchContainer from "@/components/v2/search/SearchContainer.vue";

export default defineComponent( {
  name: "SidebarView",
  components: {SearchContainer, NavBar},
  computed: {
    renderData(){
      return renderData
    }
  }
})

</script>

<style scoped>

</style>