<template>
  <div class="toolbar-pre" v-if="!isActive" @click="isActive = true"></div>
  <div class="toolbar" v-if="isActive">

    <div class="tag-input-container">
      <p class="tag-input" v-for="(tag, index) in search" :key="index"><span v-on:click="removeTag(tag)" >{{tag}}</span></p>
      <input v-model="input" :placeholder="placeholder" v-on:focusout="focusOut" v-on:keydown="keydown" ref="input"/>
    </div>

<!--   IS FRAME SEARCH -->
    <div class="addframe-container" v-if="isFrameSearch">
      <TagListContainer :tags="tags" class="tag-list-container" :initial-show="10" @addTag="addTag"></TagListContainer>
      <div class="frames-container" v-for="(frame, index) in framesFiltered.slice(0, 5)" :key="index">
        <ToolbarFrameUnit :frame="frame" @selected="addFrame"></ToolbarFrameUnit>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TagListContainer from "@/components/TagListContainer.vue";
import {createTags, framesFiltered, Tag} from "@/store/renderData";
import ToolbarFrameUnit from "@/components/v2/ToolbarFrameUnit.vue";
import {FrameRender} from "@/entity/frame";

export default defineComponent( {
  name: "LineToolBar",
  components: {ToolbarFrameUnit, TagListContainer},
  props: ['frames', 'frame'],
  data() {
    return {
      search: [] as string[],
      isActive: false,
      input: ''
    }
  },
  watch: {
    isActive(val){
      if (val){
        this.$nextTick(() => {
          const html = this.$refs.input as HTMLInputElement
          html.focus()
        });
      }
    }
  },
  computed: {
    framesFiltered(){
      return framesFiltered(this.frames, this.search)
    },
    tags(): Tag[]{
      const tags = createTags(this.frames, this.search)
      if (this.input.length > 0){
        return tags.filter(t => t.name.includes(this.input))
      }
      return tags
    },
    placeholder(){
      if (this.search.length === 0){
        return "Start #,@ to select frame, or type '/' for command"
      }
      return 'Add more tags here'
    },
    isFrameSearch(){
      return this.input.startsWith('#') || this.input.startsWith('@') || this.search.length > 0
    }
  },
  methods: {
    focusOut(){
      if (!this.isFrameSearch){
        this.isActive = false
      }
    },
    removeTag(tag: string){
      const idx = this.search.findIndex(x => x === tag)
      if (~idx){
        this.search.splice(idx, 1)
      }
    },
    addFrame(newFrame: FrameRender){
      // @ts-ignore
      this.port.postMessage({kind: "open-and-update", url: newFrame.url, windowId: this.frame.windowId, index: this.frame.index+1, groupId: this.frame.groupId});
      this.isActive = false
    },
    addTag(tag: Tag){
      this.input = ''
      if (!this.search.some(x => x === tag.name)){
        this.search.push(tag.name)
      }

      const html = this.$refs.input as HTMLInputElement
      this.$nextTick(() => {
        html.focus()
      });
    },
    keydown(e: any){
      if (e.code === 'Escape'){
        this.isActive = false
        this.search = []
        e.preventDefault()
      }
      if (e.code === 'Backspace' && this.input.length === 0 && this.search.length === 0){
        this.isActive = false
      }
      if (e.code === 'Backspace' && this.input.length === 0){
        this.search.pop()
        e.preventDefault()
      }
      if (e.code === 'Enter' && this.input.length > 1 && this.input.startsWith('#')) {
        if (!this.search.some(x => x === this.input)){
          this.search.push(this.input)
        }

        this.input = ''
        e.preventDefault()
        const html = this.$refs.input as HTMLInputElement
        this.$nextTick(() => {
          html.focus()
        });
      }
    },
  }
})

</script>

<style scoped lang="scss">

.toolbar{
  //min-height: 60px;
}

.tag-input-container{
  display: flex;
  margin-bottom: 2px;
  align-items: center;

  .tag-input{
    margin: 0;
    background-color: var(--background_input);
    color: var(--text_color);
    font-weight: bold;
    padding-top: 0.1em;
    padding-bottom: 0.1em;
    font-size: 0.85em;

    &:first-child{
      border-bottom-left-radius: 3px;
      border-top-left-radius: 3px;
    }

    span{
      margin-left: 5px;
      padding-left: 3px;
      padding-right: 3px;
      font-size: 0.9em;
      background-color: #4e4e4e;
      border-radius: 5px;
      cursor: pointer;
      white-space: nowrap;
    }
    span:hover{
      background-color: #7a4d4d;
    }
  }
}

input {
  outline: none;
  width: calc(100% - 8px);
}

.toolbar-pre{
  height: 5px;
  margin-top: -5px;
  z-index: 100000;
  &:hover{
    opacity: 0.1;
    border-radius: 5px;
    background-color: var(--text_color);
    filter: var(--hover);
    cursor: pointer;
  }
}

.frames-container{
  opacity: 0.7;
}


</style>