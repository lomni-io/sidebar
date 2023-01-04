<template>
  <div class="frame-header-right">
    <div class="frame-header-view" @click="toViewMode()">
      <font-awesome-icon icon="eye" />
    </div>
    <div class="frame-header-apply" :class="{'disabled': !hasChanges}" @click="applyChanges()">
      <font-awesome-icon icon="floppy-disk" />
    </div>
    <div class="frame-header-remove" @click="removeNote()">
      <font-awesome-icon icon="trash" />
    </div>
  </div>

  <div contenteditable="true" class="text-area" aria-placeholder="note here" @focus="focus" ref="textArea" @input="onInput"></div>
  <div class="tags">
    <TagEditorContainer :currentTags="noteCopy.tags" :frames="frames" @removeTag="removeTag" @addTag="addTag"></TagEditorContainer>
  </div>
</template>

<script lang="ts">

import {store} from "@/store";
import {defineComponent, PropType} from "vue";
import {FramesData, NoteFrameData} from "@/entity/frame";
import TagEditorContainer from "@/components/search-tab/TagEditorContainer.vue";

export default defineComponent( {
  name: "NoteEditContainer",
  components: {TagEditorContainer},
  emits: ['toViewMode'],
  props: {
    frames: {
      // provide more specific type to `Object`
      type: Object as PropType<FramesData>,
      required: true
    },
    note: {
      type: Object as PropType<NoteFrameData>,
      required: true
    }
  },
  data() {
    return {
      hasChanges: false,
      noteCopy: {} as NoteFrameData
    }
  },
  watch: {
  },
  methods: {
    toViewMode(){
      this.$emit('toViewMode')
    },
    removeNote(){
      store.dispatch('removeNote', this.note)
      this.$emit('toViewMode')
    },
    applyChanges(){
      const note: NoteFrameData = {
        id: this.noteCopy.id,
        content: this.noteCopy.content,
        tags: this.noteCopy.tags,
        updatedAt: Date.now()
      }
      store.dispatch('updateNote', note)
      this.$emit('toViewMode')
    },
    onInput(){
      this.hasChanges = true
      let textArea = this.$refs.textArea as HTMLDivElement
      this.noteCopy.content = textArea.innerText
    },
    removeTag(tag: string){
      this.hasChanges = true
      this.noteCopy.tags = this.noteCopy.tags.filter(x => x !== tag)
    },
    addTag(tag: string){
      if (!this.noteCopy.tags.includes(tag)){
        this.hasChanges = true
        this.noteCopy.tags.push(tag)
      }
    },
  },
  created() {
    this.noteCopy = JSON.parse(JSON.stringify(this.note))
  },
  mounted() {
    let textArea = this.$refs.textArea as HTMLDivElement
    textArea.innerText = this.note.content
  }
})

</script>

<style scoped lang="scss">


.text-area{
  color: var(--text_color);
  font-size: 0.9em;
  font-family: monospace;
  outline: none;
  margin-bottom: 20px;
}

.frame-header-right{
  display: flex;
  justify-content: right;
  div{
    margin-right: 5px;
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

  .frame-header-view{
    width: 12px;
    height: 12px;
    color: var(--blue_60);
    border-radius: 10px;
    font-size: 0.8em;
    &:hover{
      cursor: pointer;
      filter: var(--hover);
    }
  }

  .frame-header-apply{
    width: 12px;
    height: 12px;
    color: var(--yellow_60);
    border-radius: 10px;
    font-size: 0.8em;
    &.disabled{
      opacity: 0.2;
    }
    &:hover{
      cursor: pointer;
      filter: var(--hover);
    }
  }
}

</style>