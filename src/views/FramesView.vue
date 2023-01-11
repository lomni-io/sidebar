<template>
  <TabContainer title="search bar" :default-activation="true">
    <SearchBar :render-data="renderData"></SearchBar>
  </TabContainer>
  <TabContainer title="frames" :default-activation="true">
    <FramesContainer :frames="renderData.frames"></FramesContainer>
  </TabContainer>
</template>

<script>
import TabContainer from "@/components/v2/TabContainer";
import SearchBar from "@/components/v2/SearchBar";
import FramesContainer from "@/components/v2/FramesContainer";

export default {
  name: "FramesView",
  props: ['renderData'],
  components: {FramesContainer, TabContainer,SearchBar}
}
</script>

<style scoped>

</style>