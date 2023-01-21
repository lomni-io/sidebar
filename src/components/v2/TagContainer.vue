<template>
  <ul class="tags">

    <div @dragover="dragover" @dragleave="dragleave" @drop="onDropAdd" @dragover.prevent @dragenter.prevent>
      <a class="tag new" :class="{'drag-over': isDraggingOver}" v-if="isAddingDroppable" >add here</a>
    </div>

    <li v-if="isRemoveDroppable" @dragover="dragover" @dragleave="dragleave" @drop="onDropRemove" @dragover.prevent @dragenter.prevent>
      <a class="tag remove" :class="{'drag-over': isDraggingOver}">
        <font-awesome-icon icon="trash" />
      </a>
    </li>

    <li v-for="(tag, index) in sugestedTags" :key="index">
      <a class="tag sugested" @click="clickedTag(tag)">{{tag}}</a>
    </li>
    <li v-for="(tag, index) in fixedTags" :key="index">
      <a class="tag fixed" @click="clickedTag(tag)">{{tag}}</a>
    </li>
    <li v-for="(tag, index) in tags" :key="index">
      <a class="tag" @click="clickedTag(tag)" id="tag" :class="color" draggable="true" @drag="dragstart(tag)" @dragend="dragend">{{tag}}</a>
    </li>
  </ul>
</template>

<script>
import {store} from "@/store";

export default {
  name: "TagContainer",
  emits: ['addTag', 'clickedTag'],
  props: ['tags', 'fixedTags', 'color', 'sugestedTags'],
  data() {
    return {
      isDraggingOver: false,
      id: Math.floor(Math.random() * 1000000000).toFixed(0)
    }
  },
  computed: {
    dragItem(){
      return store.getters.dragItem
    },
    isRemoveDroppable(){
      if (this.dragItem){
        return this.dragItem.draggerId === this.id
      }
      return false
    },
    isAddingDroppable(){
      if (this.dragItem && this.dragItem.kind === 'tag'){
        return this.dragItem.draggerId !== this.id
      }
      return false
    }
  },
  methods: {
    dragstart(tagName){
      const dragItem = {
        kind: 'tag',
        draggerId: this.id,
        object: tagName,
      }

      store.dispatch('setDragItem', dragItem)
    },
    dragend(){
      store.dispatch('setDragItem', null)
    },
    clickedTag(tag){
      this.$emit('clickedTag', tag)
    },
    dragover(){
      this.isDraggingOver = true
    },
    dragleave(){
      this.isDraggingOver = false
    },
    onDropAdd(){
      if (this.dragItem && this.dragItem.kind === 'tag'){
        this.$emit('addTag', this.dragItem.object)
      }
    },
    onDropRemove(){
      if (this.dragItem && this.dragItem.kind === 'tag'){
        this.$emit('removeTag', this.dragItem.object)
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
  white-space: nowrap;
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

  &.remove{
    background-color: transparent;
    color: var(--red);
    border: 1px dashed var(--background_tag);
  }

  &.blue{
    color: var(--blue);
  }
  &.cyan{
    color: var(--cyan);
  }
  &.pink{
    color: var(--pink);
  }
  &.purple{
    color: var(--purple);
  }
  &.orange{
    color: var(--orange);
  }
  &.yellow{
    color: var(--yellow);
  }
  &.green{
    color: var(--green);
  }
  &.red{
    color: var(--red);
  }
}

.fixed{
  filter: var(--hover);
  font-weight: bold;
}

.sugested{
  background-color: var(--green);
  color: var(--background_input);
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