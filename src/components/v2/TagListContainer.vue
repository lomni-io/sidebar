<template>
  <ul class="tags">
    <li v-for="(tag, index) in tags" :key="index">
      <a v-if="tag.kind === 'preProcessed'" href="#" class="tag" :style="getCount(tag.count)" v-on:click="selectTag(tag)" draggable="false">{{tag.name}}</a>
      <a v-if="tag.kind === 'tag'" href="#" class="tag" :style="getCount(tag.count)" v-on:click="selectTag(tag)" draggable="true" @dragstart="dragstart(tag.name)" @dragend="dragend">{{tag.name}}</a>
    </li>
  </ul>
</template>

<script>

import {store} from "@/store";

export default {
  name: "TagListContainer",
  emits: ['addTag'],
  props: ['tags'],
  data(){
    return {
      styleObject: {'--count': "'12'"},
    }
  },
  computed: {

  },
  methods: {
    getCount(count){
      return {'--count': `'${count}'`}
    },
    selectTag(tag){
      this.$emit('addTag', tag.name)
    },
    dragstart(tagName){
      const dragItem = {
        kind: 'tag',
        object: tagName,
      }

      store.dispatch('setDragItem', dragItem)
    },
    dragend(){
      store.dispatch('setDragItem', null)
    },
  }
}
</script>

<style scoped lang="scss">


.tags {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  //flex-wrap: wrap;
  overflow-x: auto;
  //overflow: hidden;
  //height: 60px;
}

.tags::-webkit-scrollbar {
  //display: none;  /* Safari and Chrome */
  height: 5px;
}

.tags li {

}

.tag {
  font-size: 0.8em;
  background-color: var(--background_input);
  border-radius: 3px;
  color: var(--text_color);
  display: inline-block;
  padding: 0 0.2em 0 0.2em;
  position: relative;
  margin: 0 7px 5px 0;
  text-decoration: none;
  -webkit-transition: color 0.2s;

  --count: '20';

  &::after {
    background-color: var(--bg1);
    content: var(--count);
    font-weight: bold;
    font-size: 8px;
    position: absolute;
    text-align: center;
    right: -5px;
    top: 10px;
    width: 10px;
    border-radius: 10px;
    height: 10px;
  }
}

.tag:focus {
  outline: none;
  filter: var(--hover);
}


a{
  font-size: 0.9em;
}


.tag:hover {
  filter: var(--hover);
}

</style>