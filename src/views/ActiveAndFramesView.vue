<template>
  <div v-if="renderData.windows && renderData.windows.length === 1">
    <CurrentActiveTabs :window="renderData.windows[0]" :tags="renderData.tags" :search="renderData.search" :frames="renderData.frames"></CurrentActiveTabs>
  </div>
  <div v-if="renderData.windows && renderData.windows.length > 1">
    <div v-for="(window, index) in renderData.windows" :key="index">
      <!--  TODO: replace tabs for other BAR like parent  -->
      <TabContainer :title="'current tab: ' + window.name" :default-activation="true">
        <CurrentActiveTabs :window="window" :tags="renderData.tags" :search="renderData.search" :frames="renderData.frames"></CurrentActiveTabs>
      </TabContainer>
    </div>
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


</style>