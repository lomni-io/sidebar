<template>
  <div class="frames-container">

<!--  TODO: ADD a Scafold to PIN a search..   -->
<!--  example of Groups, but in this case will PIN a search to use later  -->

    <FramesScaffold title="default search">
      <div v-for="(frame, index) in frames" :key="index">
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
  props: ['frames']
})

</script>

<style scoped>

.frames-container{
  padding: 5px;
}

</style>