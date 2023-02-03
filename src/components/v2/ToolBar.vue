<template>

  <div class="toolbar">
    <div class="main-container">
      <div class="tag-input-container">
        <p class="tag-input" v-for="(tag, index) in search" :key="index">
          <span v-on:click="removeTag(tag)" draggable="true" @drag="dragstart(tag)" @dragend="dragend" >{{tag}}</span>
        </p>
        <input v-model="input" :placeholder="placeholder" v-on:keydown="keydown" ref="input"/>
      </div>

      <!--   IS FRAME SEARCH -->
      <div class="addframe-container" v-if="isFrameSearch">
        <TagListContainer :tags="tagsFiltered" class="tag-list-container" :initial-show="10" @addTag="addTag"></TagListContainer>
        <span class="show-suggestions" v-if="!showFrameSuggestions" @click="showFrameSuggestions = true">Show <b>+{{framesFiltered.length}}</b> frames suggestions</span>
        <span class="show-suggestions" v-if="showFrameSuggestions" @click="showFrameSuggestions = false">Hide all suggestions</span>

        <div v-if="showFrameSuggestions">
          <div class="frames-container" v-for="(frame, index) in framesFiltered" :key="index">
            <ToolbarFrameUnit :frame="frame" @selected="addFrame"></ToolbarFrameUnit>
          </div>
        </div>
      </div>

      <!--   IS TITLE SEARCH -->
      <div class="addframe-container" v-if="isTitleSearch">
        <div class="frames-container" v-for="(frame, index) in framesByTitle" :key="index">
          <ToolbarFrameUnit :frame="frame" @selected="addFrame"></ToolbarFrameUnit>
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TagListContainer from "@/components/TagListContainer.vue";
import {framesFiltered, framesInputFiltered, Tag} from "@/store/renderData";
import ToolbarFrameUnit from "@/components/v2/ToolbarFrameUnit.vue";
import {FrameRender} from "@/entity/frame";
import {store} from "@/store";

export default defineComponent( {
  name: "ToolBar",
  components: {ToolbarFrameUnit, TagListContainer},
  props: ['frames', 'search', 'tags'],
  data() {
    return {
      input: '',
      showFrameSuggestions: false,
    }
  },
  watch: {

  },
  computed: {
    framesByTitle(){
      return framesInputFiltered(this.frames, this.input)
    },
    framesFiltered(){
      if (!this.frames || this.search.length === 0){
        return []
      }
      return framesFiltered(this.frames, this.search)
    },

    tagsFiltered(): Tag[]{
      if (this.input.length > 1){
        return this.tags.filter((t: Tag) => t.name.includes(this.input))
      }
      return this.tags
    },
    placeholder(){
      if (this.search.length === 0){
        return "Start #,@ to select frame, or type '/' for command"
      }
      return 'Add more tags here'
    },
    isFrameSearch(){
      return this.input.startsWith('#') || this.input.startsWith('@') || this.search.length > 0
    },
    isTitleSearch(){
      return this.input.match(/^\w+/gi)
    },
    isGroupSearch(){
      return this.input.startsWith('/') || (this.input.startsWith('/') && this.search.length > 0)
    }
  },
  methods: {
    dragstart(tagName: string){
      const dragItem = {
        kind: 'tag',
        draggerId: Math.floor(Math.random() * 1000000000).toFixed(0),
        object: tagName,
      }

      store.dispatch('setDragItem', dragItem)
    },
    dragend(){
      store.dispatch('setDragItem', null)
    },
    removeTag(tag: string){
      store.dispatch('removeSearchItem', tag)
    },
    addFrame(newFrame: FrameRender){
      // @ts-ignore
      this.port.postMessage({kind: "open-request-new-tab", url: newFrame.url});
    },
    addTag(tag: Tag){
      store.dispatch('addSearchItem', tag.name)
      this.input = ''

      const html = this.$refs.input as HTMLInputElement
      this.$nextTick(() => {
        html.focus()
      });
    },
    keydown(e: any){
      if (e.code === 'Escape'){
        // this.search = []
        e.preventDefault()
      }
      if (e.code === 'Backspace' && this.input.length === 0){
        store.dispatch('removeSearchItem', this.search[this.search.length-1])
        e.preventDefault()
      }
      if (e.code === 'Enter' && this.input.length > 1 && this.input.startsWith('#')) {
        store.dispatch('addSearchItem', this.input)

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
  //max-height: 200px;
  //overflow: scroll;

}

.main-container{
  background-color: var(--background_main);
  box-shadow: 5px 5px 8px 5px var(--background_main);
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
    padding: 3px;
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

  }
}

input {
  outline: none;
  padding: 3px;
  width: calc(100% - 8px);
}

.frames-container{
}

.group-container{
  p{
    padding: 0 5px 0 5px;
    margin: 5px 0 0 0;
    background-color: red;
    border-radius: 5px;
    font-size: 0.8em;

    &.grey{
      background-color: var(--white);
    }
    &.blue{
      background-color: var(--blue);
    }
    &.cyan{
      background-color: var(--cyan);
    }
    &.pink{
      background-color: var(--pink);
    }
    &.purple{
      background-color: var(--purple);
    }
    &.orange{
      background-color: var(--orange);
    }
    &.yellow{
      background-color: var(--yellow);
    }
    &.green{
      background-color: var(--green);
    }
    &.red{
      background-color: var(--red);
    }

    &:hover{
      filter: var(--hover);
      cursor: pointer;
    }
  }
}

.addframe-container{
  padding-left: 5px;
  padding-right: 5px;

  .show-suggestions{
    color: var(--text_color);
    background-color: var(--background_input);
    border-radius: 5px;
    font-size: 0.8em;
    text-align: center;
    display: block;
    user-select: none;
    width: 100%;
    &:hover{
      cursor: pointer;
      filter: var(--hover);
    }
  }
}


</style>