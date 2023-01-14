<template>
  <div class="frames-container" v-if="renderData && renderData.frames">

<!--  TODO: ADD a Scafold to PIN a search..   -->
<!--  example of Groups, but in this case will PIN a search to use later  -->

    <div v-for="(pinned, index) in renderData.searchPinneds" :key="index">
      <FramesScaffold :count-frames="renderData.frames.length" :tags="pinned.tags.concat(pinned.preProcessedTags)" :title="pinned.title" :collapsed="pinned.collapsed">
        <div v-for="(frame, idx) in pinned.frames" :key="idx">
          <FrameUnit :frame="frame"></FrameUnit>
        </div>
        <TagContainer :tags="pinned.tags" :fixed-tags="pinned.preProcessedTags"></TagContainer>
      </FramesScaffold>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import FrameUnit from "@/components/v2/FrameUnit.vue";
import FramesScaffold from "@/components/v2/FramesScaffold.vue";
import TagContainer from "@/components/v2/TagContainer.vue";

export default defineComponent( {
  name: "FramesContainer",
  components: {TagContainer, FramesScaffold, FrameUnit},
  props: ['renderData']
})

</script>

<style scoped>

.frames-container{
  padding: 5px;
}

</style>