<template>
  <div class="toolbar-pre"></div>
  <div class="toolbar">
    <div class="tag-input-container">
      <p class="tag-input" v-for="(tag, index) in search" :key="index"><span v-on:click="removeTag(tag)" >{{tag}}</span></p>
      <input v-model="input" :placeholder="placeholder" v-on:keydown="keydown" ref="input"/>
    </div>
    <TagListContainer v-if="isFrameSearch" :tags="tags" class="tag-list-container" :initial-show="10" @addTag="addTag"></TagListContainer>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TagListContainer from "@/components/TagListContainer.vue";
import {store} from "@/store";
import {Tag} from "@/store/renderData";

export default defineComponent( {
  name: "LineToolBar",
  components: {TagListContainer},
  props: ['tags', 'search'],
  data() {
    return {
      input: ''
    }
  },
  computed: {
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
    removeTag(tag: string){
      store.dispatch('removeSearchItem', tag)
    },
    addTag(tag: Tag){
      this.input = ''
      store.dispatch('addSearchItem', tag.name)

      const html = this.$refs.input as HTMLInputElement
      this.$nextTick(() => {
        html.focus()
      });
    },
    keydown(e: any){
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
  background-color: var(--background_main);
  width: 100%;
  height: 7px;
  &:hover{
    filter: var(--hover);
    cursor: pointer;
  }
}

</style>