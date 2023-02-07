<template>
  <ToolBar class="toolbar" :frames="frames" :groups-data="groupsData" :search="search" :tags="tags"></ToolBar>
  <div class="active-frame-container">
    <div v-for="(frame, index) in window.pinneds" :key="index">
      <ActiveFrameUnit :frame="frame"></ActiveFrameUnit>
    </div>

    <!--  TABS HERE  -->
    <NestedFrames :frames="window.tabs"></NestedFrames>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ActiveFrameUnit from "@/components/v2/ActiveFrameUnit.vue";
import ToolBar from "@/components/v2/ToolBar.vue";
import NestedFrames from "@/components/v2/NestedTabs.vue";


export default defineComponent( {
  name: "CurrentActiveTabs",
  props: ['window', 'tags', 'frames', 'search', 'groupsData'],
  components: {NestedFrames, ToolBar, ActiveFrameUnit},
  data(){
    return {

    }
  },
  methods: {

  }
})

</script>

<style scoped>

.active-frame-container{
  padding: 5px;
}

.toolbar{
  position: sticky !important;
  top: 0;
  z-index: 100000;
}

</style>