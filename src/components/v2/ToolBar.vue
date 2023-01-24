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
        <TagListContainer :tags="tags" class="tag-list-container" :initial-show="10" @addTag="addTag"></TagListContainer>
        <div class="frames-container" v-for="(frame, index) in framesFiltered.slice(0, 5)" :key="index">
          <ToolbarFrameUnit :frame="frame" @selected="addFrame"></ToolbarFrameUnit>
        </div>
      </div>

      <!--   IS GROUP SEARCH -->
      <div v-if="isGroupSearch">
        <div class="group-container" v-for="(group, index) in groupsDataFiltered.slice(0, 5)" :key="index">
          <p @click="openGroup(group)" :class="group.color">{{group.title}} - {{group.tags.join(',')}}</p>
        </div>
      </div>

    </div>
    <div class="bottom" v-if="isFrameSearch || isGroupSearch"></div>



  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TagListContainer from "@/components/TagListContainer.vue";
import {createTags, framesFiltered, GroupRender, Tag} from "@/store/renderData";
import ToolbarFrameUnit from "@/components/v2/ToolbarFrameUnit.vue";
import {FrameRender} from "@/entity/frame";
import {store} from "@/store";

export default defineComponent( {
  name: "ToolBar",
  components: {ToolbarFrameUnit, TagListContainer},
  props: ['frames', 'groupsData'],
  data() {
    return {
      search: [] as string[],
      input: ''
    }
  },
  watch: {

  },
  computed: {
    framesFiltered(){
      return framesFiltered(this.frames, this.search)
    },
    groupsDataFiltered(){
      if (this.input.length <= 1){
        return this.groupsData
      }
      const input = this.input.substring(1)
      return this.groupsData.filter((x: GroupRender) => x.title.startsWith(input))
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
      const idx = this.search.findIndex(x => x === tag)
      if (~idx){
        this.search.splice(idx, 1)
      }
    },
    addFrame(newFrame: FrameRender){
      // @ts-ignore
      this.port.postMessage({kind: "open-request-new-tab", url: newFrame.url});
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
    openGroup(group: GroupRender){
      console.log(group)
      this.input = ''
    },
    keydown(e: any){
      if (e.code === 'Escape'){
        this.search = []
        e.preventDefault()
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
  //max-height: 200px;
  //overflow: scroll;

}

.main-container{
  background-color: var(--background_main);
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

  }
}

input {
  outline: none;
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

.bottom{
  height: 30px;
  width: 100%;
  background-image: linear-gradient(to bottom, var(--background_main), rgba(0,0,0,0));
}

</style>