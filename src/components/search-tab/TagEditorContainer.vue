<template>
  <div class="header">
    <div class="tag-input-container">
      <div class="tag-input-left">
        <p class="tag-input" v-for="(tag, index) in allSelectedTags" :key="index"><span v-on:click="removeTag(tag)">{{tag}}</span></p>
        <input v-model="searchInput" v-on:keydown="keydown" ref="input"/>
      </div>
    </div>
    <TagListContainer :initial-show="5" @addTag="addTag" :tags="this.setTags" class="tag-list-container"></TagListContainer>
  </div>
</template>

<script>
import TagListContainer from "@/components/TagListContainer";
import {setVisibleTags} from "@/components/search-tab/filters";
export default {
  name: "TagEditorContainer",
  emits: ['addTag', 'removeTag'],
  components: {TagListContainer},
  props: ['currentTags', 'frames'],
  data() {
    return {
      searchInput: '',
      selectedTags: [],
      removedTags: []
    }
  },
  watch: {
    selectedTags: {
      handler() {
        this.searchInput = ''
      },
      deep: true
    },
  },
  computed: {
    allSelectedTags(){
      const toDeleteSet = new Set(this.removedTags);
      if (this.currentTags){
        return this.currentTags.filter(x => !toDeleteSet.has(x)).concat(this.selectedTags)
      }
      return this.selectedTags
    },
    setTags() {
      return setVisibleTags(this.frames, this.selectedTags, this.searchInput)
    },
  },
  methods:{
    addHashTag(input){
      if (input.startsWith("#")){
        return input
      }
      return "#"+input
    },
    addTag(tag){
      this.$emit('addTag', tag.name)
      this.searchInput = ''
    },
    keydown(e){
      if (e.code === 'Enter' && this.searchInput.length > 1) {
        this.$emit('addTag', this.addHashTag(this.searchInput))
        this.searchInput = ''
        e.preventDefault()
      }
    },
    removeTag(tag){
      this.$emit('removeTag', tag)
    },
  }
}
</script>

<style scoped lang="scss">

.header{
  background-color: var(--background_main);
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

  span{
    margin-left: 5px;
    padding-left: 3px;
    padding-right: 3px;
    font-size: 0.9em;
    background-color: var(--scroll);
    border-radius: 5px;
    cursor: pointer;
    white-space: nowrap;
  }
  span:hover{
    background-color: var(--red_40_40);
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
  font-size: 0.9em;
  width: 98%;
}

</style>