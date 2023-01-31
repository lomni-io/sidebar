<template>

  <div v-if="!isOpen && hasSuggestions" class="suggestion-show-container">
    <span class="suggestion-show" @click="isOpen = true">
      Show <b>+{{frames.length}}</b> tabs suggestions
    </span>
  </div>

  <div v-if="isOpen && hasSuggestions" class="suggestion-show-container">
    <span class="suggestion-show" @click="isOpen = false">
      hide suggestions
    </span>
  </div>

  <div v-if="isOpen && hasSuggestions" class="suggestions-container">
    <div v-for="frame in frames" :key="frame.id">
      <MinimalFrameUnit :frame="frame" @selected="selectedSuggestion"></MinimalFrameUnit>
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
    selectedSuggestion(frame: WebFrameRender){
      // @ts-ignore
      this.port.postMessage({kind: "open-and-update", url: frame.url, windowId: this.group.windowId, groupId: this.group.id});
    }
  },
  computed:{
    hasSuggestions() {
      return this.frames.length > 0
    }
  }
})

</script>

<style scoped lang="scss">

.suggestion-show-container{
  margin-top: 5px;
  display: flex;
  margin-bottom: 3px;
  flex-direction: row-reverse;
  .suggestion-show{
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

.suggestions-container{
}

</style>