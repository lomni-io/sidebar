<template>
  <ul class="tags">

    <li @dragover="dragover" @dragleave="dragleave" @drop="onDrop" @dragover.prevent @dragenter.prevent>
      <a class="tag new" :class="{'drag-over': isDraggingOver}" v-if="dragItem && dragItem.kind === 'tag'" >add here</a>
    </li>

<!--    <li @dragover="dragover" @dragleave="dragleave" @drop="onDrop" @dragover.prevent @dragenter.prevent>-->
<!--      <a class="tag new" :class="{'drag-over': isDraggingOver}" v-if="dragItem && dragItem.kind === 'tag'" >remove</a>-->
<!--    </li>-->

    <li v-for="(tag, index) in fixedTags" :key="index">
      <a class="tag fixed" @click="clickedTag(tag)">{{tag}}</a>
    </li>
    <li v-for="(tag, index) in tags" :key="index">
      <a class="tag" @click="clickedTag(tag)" id="tag" :class="color" draggable="true">{{tag}}</a>
    </li>
  </ul>
</template>

<script>
import {store} from "@/store";

export default {
  name: "TagContainer",
  emits: ['addTag'],
  props: ['tags', 'fixedTags', 'color'],
  data() {
    return {
      isDraggingOver: false
    }
  },
  computed: {
    dragItem(){
      return store.getters.dragItem
    }
  },
  methods: {
    clickedTag(tag){
      this.$emit('clickedTag', tag)
    },
    dragover(){
      this.isDraggingOver = true
    },
    dragleave(){
      this.isDraggingOver = false
    },
    onDrop(){
      if (this.dragItem && this.dragItem.kind === 'tag'){
        this.$emit('addTag', this.dragItem.object)
      }
    }
  }
}
</script>

<style scoped lang="scss">

.tags {
  list-style: none;
  margin: 0;
  display: flex;
  overflow-x: auto;
  padding: 0;
}

.tags::-webkit-scrollbar {
  //display: none;  /* Safari and Chrome */
  height: 5px;
}

.tags li {
  float: left;
  cursor: pointer;
  margin-right: 5px;
}

.tag {
  background-color: var(--background_tag);
  border-radius: 3px;
  color: var(--text_color);
  padding: 0 0.5em 0 0.5em;
  text-decoration: none;
  -webkit-transition: color 0.2s;

  &.new{
    background-color: transparent;
    border: 1px dashed var(--background_tag);
  }

  &.red{
    color: var(--red);
  }
}

.fixed{
  filter: var(--hover);
  font-weight: bold;
}

a{
  font-size: 0.8em;
}


.tag:hover {
  filter: var(--hover);
}

.drag-over{
  color: var(--blue);
}


</style>