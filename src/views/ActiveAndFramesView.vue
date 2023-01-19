<template>
<!--  <TabContainer :use-border="true" class="search sticky" title="search bar" :default-activation="true">-->
<!--    <SearchBar :render-data="renderData"></SearchBar>-->
<!--  </TabContainer>-->
  <div v-for="(window, index) in renderData.windows" :key="index">
<!--  TODO: replace tabs for other BAR like parent  -->
    <TabContainer :title="'current tab: ' + window.name" :default-activation="true">
      <CurrentActiveTabs :window="window"></CurrentActiveTabs>
    </TabContainer>
  </div>
</template>

<script>
import TabContainer from "@/components/v2/TabContainer";
import CurrentActiveTabs from "@/components/v2/CurrentActiveTabs";

export default {
  name: "ActiveAndFramesView",
  props: ['renderData'],
  components: {CurrentActiveTabs, TabContainer}
}
</script>

<style scoped>

.sticky{
  position: sticky !important;
  top: 20px;
  z-index: 100000;
}

</style>