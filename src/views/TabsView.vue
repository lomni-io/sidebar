<template>
  <TabContainer title="search bar" :default-activation="true">
    <SearchBar :render-data="renderData"></SearchBar>
  </TabContainer>
  <div v-for="(window, index) in renderData.windows" :key="index">
    <TabContainer :title="'current tab: ' + window.name" :default-activation="true">
      <CurrentTabs :window="window"></CurrentTabs>
    </TabContainer>
  </div>
</template>

<script>
import TabContainer from "@/components/v2/TabContainer";
import SearchBar from "@/components/v2/SearchBar";
import CurrentTabs from "@/components/v2/CurrentActiveTabs";

export default {
  name: "TabsView",
  props: ['renderData'],
  components: {CurrentTabs, TabContainer,SearchBar}
}
</script>

<style scoped>

</style>