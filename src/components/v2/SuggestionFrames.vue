<template>

  <div v-if="!isOpen && hasSugestions" class="sugestion-show-container">
    <span class="sugestion-show" @click="isOpen = true">
      Show <b>+{{frames.length}}</b> tabs sugestions
    </span>
  </div>

  <div v-if="isOpen && hasSugestions" class="sugestion-show-container">
    <span class="sugestion-show" @click="isOpen = false">
      hide sugestions
    </span>
  </div>

  <div v-if="isOpen && hasSugestions" class="sugestions-container">
    <div v-for="frame in frames" :key="frame.id">
      <MinimalFrameUnit :frame="frame" @selected="selectedSugestion"></MinimalFrameUnit>
    </div>
  </div>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import MinimalFrameUnit from "@/components/v2/MinimalFrameUnit.vue";
import {WebFrameRender} from "@/store/renderData";

export default defineComponent( {
  name: "SuggestionFrames",
  components: {MinimalFrameUnit},
  props: ['frames', 'group'],
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    selectedSugestion(frame: WebFrameRender){
      // @ts-ignore
      this.port.postMessage({kind: "open-and-update", url: frame.url, windowId: this.group.windowId, groupId: this.group.id});
    }
  },
  computed:{
    hasSugestions() {
      return this.frames.length > 0
    }
  }
})

</script>

<style scoped lang="scss">

.sugestion-show-container{
  display: flex;
  margin-bottom: 3px;
  flex-direction: row-reverse;
  .sugestion-show{
    text-align: center;
    flex: auto;
    font-size: 0.7em;
    border-radius: 5px;
    background-color: var(--background_input);
    color: var(--text_color);
    cursor: pointer;
    &:hover{
      filter: var(--hover);
    }
  }
}

.sugestions-container{
}

</style>