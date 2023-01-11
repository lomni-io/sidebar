<template>
  <TabContainer title="search bar" :default-activation="true">
    <SearchBar :render-data="renderData"></SearchBar>
  </TabContainer>
  <div v-for="(window, index) in renderData.windows" :key="index">
    <TabContainer :title="'current tab: ' + window.name" :default-activation="true">
      <CurrentTabs :window="window"></CurrentTabs>
    </TabContainer>
  </div>
  <TabContainer title="frames" :default-activation="true">
    <FramesContainer></FramesContainer>
  </TabContainer>
</template>

<script>
import TabContainer from "@/components/v2/search/TabContainer";
import SearchBar from "@/components/v2/search/SearchBar";
import CurrentTabs from "@/components/v2/search/CurrentActiveTabs";
import FramesContainer from "@/components/v2/search/FramesContainer";

export default {
  name: "SearchContainer",
  props: ['renderData'],
  components: {FramesContainer, CurrentTabs, TabContainer,SearchBar}
}
</script>

<style scoped>

</style>