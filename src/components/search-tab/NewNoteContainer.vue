<template>
  <div class="frame-header-right">
    <div class="frame-header-apply" v-if="hasChanges" @click="applyChanges()">
      <font-awesome-icon icon="floppy-disk" />
    </div>
    <div class="frame-header-remove" @click="removeFrame()">
      <font-awesome-icon icon="trash" />
    </div>
  </div>

  <div contenteditable="true" class="text-area" aria-placeholder="note here" @focus="focus" ref="textArea" @input="onInput">add text here...</div>
  <div class="tags">
    <TagViewContainer :tags="tags"></TagViewContainer>
  </div>
</template>

<script lang="ts">

import {store} from "@/store";
import {defineComponent} from "vue";
import TagViewContainer from "@/components/search-tab/TagViewContainer.vue";
import {NoteFrameData} from "@/entity/frame";

export default defineComponent( {
  name: "NewNoteContainer",
  components: {TagViewContainer},
  props: ['tags'],
  data() {
    return {
      hasChanges: false
    }
  },
  methods: {
    onInput(){
      this.hasChanges = true
    },
    focus(){
      let textArea = this.$refs.textArea as HTMLDivElement

      if (textArea.innerText === 'add text here...'){
        textArea.innerText = ''
      }
    },
    applyChanges(){
      let textArea = this.$refs.textArea as HTMLDivElement

      const note: NoteFrameData = {
        id: Math.floor(Math.random() * 1000000000).toFixed(0),
        content: textArea.innerText,
        tags: this.tags,
        updatedAt: Date.now()
      }

      store.dispatch('insertNote', note)

      this.hasChanges = false
      textArea.innerText = 'add text here...'
    },
    removeFrame(){
      let textArea = this.$refs.textArea as HTMLDivElement
      this.hasChanges = false
      textArea.innerText = 'add text here...'
    }
  },
})

</script>

<style scoped lang="scss">

.text-area{
  color: var(--text_color);
  min-height: 4em;
  font-size: 0.9em;
  font-family: monospace;
  outline: none;
  border: 1px solid var(--background_input);
  padding: 5px;
}

.frame-header-right{
  display: flex;
  justify-content: right;
  margin-bottom: 5px;

  div{
    margin-right: 5px;
  }

  .frame-header-apply{
    width: 12px;
    height: 12px;
    color: var(--yellow_60);
    border-radius: 10px;
    font-size: 0.8em;
    &:hover{
      cursor: pointer;
      filter: var(--hover);
    }
  }

  .frame-header-remove{
    width: 12px;
    height: 12px;
    color: var(--red_60);
    border-radius: 10px;
    font-size: 0.8em;
    &:hover{
      cursor: pointer;
      filter: var(--hover);
    }
  }
}

</style>