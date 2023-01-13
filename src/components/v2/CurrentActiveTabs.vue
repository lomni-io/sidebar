<template>
  <div class="container">
    <div v-for="(frame, index) in window.pinneds" :key="index">
<!--      <FrameDropArea></FrameDropArea>-->
      <ActiveFrameUnit :frame="frame" :minimized="true"></ActiveFrameUnit>
    </div>

<!--  TABS HERE  -->
    <div v-for="(tab, index) in window.tabs" :key="index">

<!--   NORMAL TABS HERE   -->
      <div v-if="tab.kind === 'web'">
<!--        <FrameDropArea></FrameDropArea>-->
        <ActiveFrameUnit :frame="tab"></ActiveFrameUnit>
      </div>

<!--   GROUP TABS HERE   -->
      <div v-if="tab.kind === 'group'">
        <ScafoldBar :title="tab.title" :color="tab.color" :collapsed="tab.collapsed" :group-id="tab.id" :count-frames="tab.frames.length">
          <div v-for="(frame, index) in tab.frames" :key="index">
<!--            <FrameDropArea></FrameDropArea>-->
            <ActiveFrameUnit :frame="frame"></ActiveFrameUnit>
          </div>
          <TagContainer :tags="tab.tags" :color="tab.color"></TagContainer>
        </ScafoldBar>
      </div>

    </div>

    <NewGroupContainer></NewGroupContainer>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ScafoldBar from "@/components/v2/TabGroupScaffold.vue";
import NewGroupContainer from "@/components/v2/NewGroupContainer.vue";
import TagContainer from "@/components/v2/TagContainer.vue";
import ActiveFrameUnit from "@/components/v2/ActiveFrameUnit.vue";

export default defineComponent( {
  name: "CurrentActiveTabs",
  props: ['window'],
  components: {ActiveFrameUnit, TagContainer, NewGroupContainer, ScafoldBar}
})

</script>

<style scoped>

.container{
  padding: 5px;
}

</style>