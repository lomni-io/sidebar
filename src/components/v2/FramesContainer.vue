<template>
  <div class="frames-container">
    <div v-for="(frame, index) in frames" :key="index">
      <FrameUnit :frame="frame"></FrameUnit>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import FrameUnit from "@/components/v2/FrameUnit.vue";

export default defineComponent( {
  name: "FramesContainer",
  components: {FrameUnit},
  props: ['frames']
})

</script>

<style scoped>

.frames-container{
  padding: 5px;
}

</style>