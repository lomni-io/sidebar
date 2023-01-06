<template>
  <div class="header">
    <div class="tag-input-container">
      <p class="tag-input" v-for="(tag, index) in selectedTags" :key="index"><span v-on:click="removeTag(tag)">{{tag}}</span></p>
      <input :class="{'no-tags': selectedTags.length === 0}" v-model="searchInput" v-on:keydown="keydown" ref="input"/>
    </div>
    <TagListContainer :initial-show="10" @addTag="addTag" :tags="this.setDomainsAndTags" class="tag-list-container"></TagListContainer>
  </div>
</template>

<script>
import TagListContainer from "@/components/TagListContainer";
import {addHashTag, setVisibleTags} from "@/components/search-tab/filters";
export default {
  name: "SearchContainer",
  emits: ['selectedTags'],
  components: {TagListContainer},
  props: ['addTagToSelection'],
  data() {
    return {
      searchInput: '',
      selectedTags: []
    }
  },
  watch: {
    addTagToSelection(tag){
      this.selectedTags.push(tag)
      this.$emit('selectedTags', this.selectedTags);
    },
    selectedTags: {
      handler() {
        this.searchInput = ''
      },
      deep: true
    },
  },
  computed: {
    frames(){
      return this.$store.getters.frames
    },
    setDomainsAndTags() {
      return setVisibleTags(this.frames, this.selectedTags, this.searchInput)
    },
  },
  methods:{
    addHashTag(input){
      return addHashTag(input)
    },
    addTag(tag){
      this.selectedTags.push(tag.name)
      this.$emit('selectedTags', this.selectedTags);
    },
    keydown(e){
      if (e.code === 'Backspace' && this.searchInput.length === 0) {
        this.selectedTags.pop()
        this.$emit('selectedTags', this.selectedTags);
        e.preventDefault()
      }
      if (e.code === 'Enter' && this.searchInput.length > 1) {
        this.selectedTags.push(this.addHashTag(this.searchInput))
        this.$emit('selectedTags', this.selectedTags);
        e.preventDefault()
      }
    },
    removeTag(tag){
      this.selectedTags = this.selectedTags.filter(x => x !== tag)
      this.$emit('selectedTags', this.selectedTags);
    },
  },
  created (){

  }
}
</script>

<style scoped lang="scss">

.header{
  background-color: var(--background_main);
}

.tag-input-container{
  display: flex;
  margin-bottom: 10px;
}

.tag-input{
  margin: 0;
  background-color: var(--background_input);
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
  color: var(--text_color);
  font-weight: bold;
  padding: 5px;

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

input{
  border-color: transparent;
  //border-radius: 3px;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
  outline:none;
  font-size: 0.9em;
  width: 98%;
  padding: 5px;
  &.no-tags{
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
  }
}

</style>