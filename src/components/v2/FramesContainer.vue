<template>
  <div class="frames-container" v-if="renderData && renderData.frames">

<!--  TODO: ADD a Scafold to PIN a search..   -->
<!--  example of Groups, but in this case will PIN a search to use later  -->

    <FramesScaffold :count-frames="renderData.frames.length" :tags="renderData.search">
      <div v-for="(frame, index) in renderData.frames" :key="index">
        <FrameUnit :frame="frame"></FrameUnit>
      </div>
    </FramesScaffold>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import FrameUnit from "@/components/v2/FrameUnit.vue";
import FramesScaffold from "@/components/v2/FramesScaffold.vue";

export default defineComponent( {
  name: "FramesContainer",
  components: {FramesScaffold, FrameUnit},
  props: ['renderData']
})

</script>

<style scoped>

.frames-container{
  padding: 5px;
}

</style>