<template>
  <div class="container">
    <div v-for="(frame, index) in window.pinneds" :key="index">
      <FrameDropArea></FrameDropArea>
      <FrameUnit :frame="frame"></FrameUnit>
    </div>

<!--  TABS HERE  -->
    <div v-for="(tab, index) in window.tabs" :key="index">

<!--   NORMAL TABS HERE   -->
      <div v-if="tab.kind === 'frame'">
        <FrameDropArea></FrameDropArea>
        <FrameUnit :frame="tab"></FrameUnit>
      </div>

<!--   GROUP TABS HERE   -->
      <div v-if="tab.kind === 'group'">
        <ScafoldBar :title="tab.name" :color="tab.color">
          <div v-for="(frame, index) in tab.frames" :key="index">
            <FrameDropArea></FrameDropArea>
            <FrameUnit :frame="frame"></FrameUnit>
          </div>
        </ScafoldBar>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ScafoldBar from "@/components/v2/search/ScafoldBar.vue";
import FrameUnit from "@/components/v2/search/FrameUnit.vue";
import FrameDropArea from "@/components/v2/search/FrameDropArea.vue";

export default defineComponent( {
  name: "CurrentActiveTabs",
  props: ['window'],
  components: {FrameDropArea, FrameUnit, ScafoldBar}
})

</script>

<style scoped>

.container{
  padding: 5px;
}

</style>