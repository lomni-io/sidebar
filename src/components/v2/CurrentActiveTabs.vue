<template>
  <div class="container">
    <div v-for="(frame, index) in window.pinneds" :key="index">
      <ActiveFrameUnit :frame="frame" :minimized="true"></ActiveFrameUnit>
    </div>

<!--  TABS HERE  -->
    <div v-for="(tab, tabIdx) in window.tabs" :key="tabIdx">

<!--   NORMAL TABS HERE   -->
      <div v-if="tab.kind === 'web'">
        <FrameDropArea :frame-bottom="tab" :frame-top="tabIdx > 0 ? window.tabs[tabIdx-1] : -1"></FrameDropArea>
        <ActiveFrameUnit :frame="tab"></ActiveFrameUnit>
      </div>

<!--   GROUP TABS HERE   -->
      <div v-if="tab.kind === 'group'">
        <ScafoldBar :title="tab.title" :color="tab.color" :collapsed="tab.collapsed" :group-id="tab.id" :count-frames="tab.frames.length">
          <div v-for="(frame, frameIdx) in tab.frames" :key="frameIdx">

            <FrameDropArea :frame-bottom="frame" :frame-top="getTopFrameFromGroup(frameIdx, tabIdx)"></FrameDropArea>
            <ActiveFrameUnit :frame="frame"></ActiveFrameUnit>
          </div>
<!--          <TagContainer :tags="tab.tags" :color="tab.color"></TagContainer>-->
        </ScafoldBar>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ScafoldBar from "@/components/v2/TabGroupScaffold.vue";
import ActiveFrameUnit from "@/components/v2/ActiveFrameUnit.vue";
import FrameDropArea from "@/components/v2/FrameDropArea.vue";
import {GroupFrameRender, WebFrameRender} from "@/store/renderData";

export default defineComponent( {
  name: "CurrentActiveTabs",
  props: ['window'],
  components: {FrameDropArea, ActiveFrameUnit, ScafoldBar},
  methods: {
    getTopFrameFromGroup(frameIdx: number, tabIdx: number){
      if (frameIdx > 0){
        return this.window.tabs[tabIdx].frames[frameIdx-1]
      }
      if (tabIdx > 0){
        const previewsTab = this.window.tabs[tabIdx-1]
        if (previewsTab.kind === 'group'){
          const group = previewsTab as GroupFrameRender
          return group.frames[group.frames.length-1]
        }
        if (previewsTab.kind === 'web'){
          return previewsTab as WebFrameRender
        }
      }
    }
  }
})

</script>

<style scoped>

.container{
  padding: 5px;
}

</style>