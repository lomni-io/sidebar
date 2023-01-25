<template>
  <div class="tags-container">
    <div class="tag" v-for="(tag, index) in suggestedTags" :key="index" draggable="true">
      <span @click="$emit('clickedSuggestion', tag)">{{tag}}</span>
    </div>
    <div class="tag" v-for="(tag, index) in fixedTags" :key="index" draggable="true">
      <span @click="$emit('clickedTag', tag)">{{tag}}</span>
    </div>
    <div class="tag" v-for="(tag, index) in tags" :key="index" draggable="true">
      <span class="remove" @click="$emit('removeTag', tag)">
        <font-awesome-icon icon="xmark" />
      </span>
      <span @click="$emit('clickedTag', tag)">{{tag}}</span>
    </div>
  </div>
</template>

<script>
import {store} from "@/store";

export default {
  name: "TagContainer",
  emits: ['addTag', 'clickedTag', 'removeTag', 'clickedSuggestion'],
  props: ['tags', 'fixedTags', 'color', 'suggestedTags'],
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

.suggested{
  opacity: 0.6;
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


.tags-container::-webkit-scrollbar {
  //display: none;  /* Safari and Chrome */
  height: 5px;
}

.tags-container{
  display: flex;
  font-size: 0.8em;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 3px;

  .tag{
    display: flex;
    align-items: center;
    .remove{
      text-align: center;
      color: var(--red);
      border-radius: 10px;
      width: 1em;
      height: 1em;
      padding: 1px;
      opacity: 0.6;
      margin-right: 2px;
      &:hover{
        filter: var(--hover);
      }
      svg{
        vertical-align: baseline;
      }
    }

    background-color: var(--background_tag);
    color: var(--text_color);
    border-radius: 4px;
    padding-left: 3px;
    padding-right: 3px;
    margin-top: 3px;
    margin-right: 5px;
    &:hover{
      filter: var(--hover);
      cursor: pointer;
    }
  }
}

</style>