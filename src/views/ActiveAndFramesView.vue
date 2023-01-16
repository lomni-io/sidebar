<template>
  <TabContainer :use-border="true" class="search sticky" title="search bar" :default-activation="true">
    <SearchBar :render-data="renderData"></SearchBar>
  </TabContainer>
  <div v-for="(window, index) in renderData.windows" :key="index">
    <TabContainer :use-border="true" :title="'current tab: ' + window.name" :default-activation="true">
      <CurrentTabs :window="window"></CurrentTabs>
    </TabContainer>
  </div>
  <TabContainer title="frames" :default-activation="true">
    <FramesContainer :render-data="renderData"></FramesContainer>
  </TabContainer>
</template>

<script>
import TabContainer from "@/components/v2/TabContainer";
import SearchBar from "@/components/v2/SearchBar";
import CurrentTabs from "@/components/v2/CurrentActiveTabs";
import FramesContainer from "@/components/v2/FramesContainer";

export default {
  name: "ActiveAndFramesView",
  props: ['renderData'],
  components: {FramesContainer, CurrentTabs, TabContainer,SearchBar}
}
</script>

<style scoped>

.sticky{
  position: sticky !important;
  top: 20px;
  z-index: 100000;
}

</style>