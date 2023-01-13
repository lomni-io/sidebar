<template>
  <div class="search-container">
    <div class="tag-input-container">
      <p class="tag-input" v-for="(tag, index) in renderData.search" :key="index"><span v-on:click="removeTag(tag)">{{tag}}</span></p>
      <input v-model="searchInput" v-on:keydown="keydown" ref="input"/>
    </div>
    <TagListContainer :tags="showTags" class="tag-list-container" @addTag="addTag"></TagListContainer>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TagListContainer from "@/components/v2/TagListContainer.vue";
import {store} from "@/store";
import {Tag} from "@/store/renderData";

export default defineComponent( {
  name: "SearchBar",
  props: ['renderData'],
  components: {TagListContainer},
  data() {
    return {
      searchInput: '',
    }
  },
  computed: {
    showTags(){
      if (this.searchInput.length > 0){
        return this.renderData.tags.filter((tag: Tag) => tag.name.toLowerCase().includes(this.searchInput.toLowerCase()))
      }
      return this.renderData.tags
    }
  },
  methods:{
    removeTag(tag: string){
      store.dispatch('removeSearchItem', tag)
    },
    addTag(tag: string){
      this.searchInput = ''
      store.dispatch('addSearchItem', tag)
    },
    keydown(){

    }
  }
})
</script>

<style scoped lang="scss">


.search-container{
  background-color: var(--background_main);
  padding: 5px;
}


.tag-input-container{
  display: flex;
  align-items: center;

  .tag-input-left{
    display: flex;
    width: 100%;
  }
  .tag-input-right{
    display: flex;
    margin-left: 10px;

    .option-cancel{
      width: 15px;
      height: 15px;
      border-radius: 10px;
      background-color: #514747;
      margin-right: 5px;
      cursor: pointer;
    }
    .option-apply{
      width: 15px;
      height: 15px;
      border-radius: 10px;
      background-color: var(--green);
      cursor: pointer;
    }
  }
}

.tag-input{
  margin: 0;
  background-color: var(--background_input);
  color: var(--text_color);
  font-weight: bold;
  padding: 4px;

  span{
    margin-left: 5px;
    padding-left: 3px;
    padding-right: 3px;
    font-size: 0.8em;
    background-color: var(--gray_1);
    border-radius: 5px;
    cursor: pointer;
    white-space: nowrap;
  }
  span:hover{
    background-color: var(--red);
  }
}

input{
  border-color: transparent;
  background-color: var(--background_input);
  //border-radius: 3px;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
  outline:none;
  color: var(--text_color);
  padding: 5px;
  font-size: 0.9em;
  width: 98%;
}

</style>