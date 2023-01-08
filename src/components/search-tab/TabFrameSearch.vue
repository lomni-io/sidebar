<template>
  <div>

    <TabContainer title="search tab" :subtitle="selectedTags.length > 0 ? selectedTags: ''">
      <TabContainer title="searcher" default-activation="true" padding="5px" padding-left="15px" :is-inner="true">
        <SearchContainer @selectedTags="setSelectedTags" :addTagToSelection="tagToAdd"></SearchContainer>
      </TabContainer>

      <TabContainer title="frames"  default-activation="true" padding="5px" padding-left="15px" :is-inner="true">
        <FramesContainer :selected-tags="selectedTags" @selectTag="selectTag"></FramesContainer>
      </TabContainer>

      <TabContainer title="new note" padding="5px" padding-left="15px" :disabled="selectedTags.length === 0" :is-inner="true">
        <NewNoteContainer :tags="selectedTags"></NewNoteContainer>
      </TabContainer>

    </TabContainer>
  </div>

</template>

<script>
import TabContainer from "@/components/TabContainer";
import SearchContainer from "@/components/search-tab/SearchContainer";
import FramesContainer from "@/components/search-tab/FramesContainer";
import NewNoteContainer from "@/components/search-tab/NewNoteContainer";
export default {
  name: "TabFrameSearch",
  components: {NewNoteContainer, FramesContainer, SearchContainer, TabContainer},
  data() {
    return {
      tagToAdd: null,
      selectedTags: [],
      clipboard: null,
    }
  },
  computed: {

  },
  methods:{
    getClipboard(){
      navigator.clipboard.readText().then(x => {
        this.clipboard = x
      })
    },
    selectTag(tag){
      this.tagToAdd = tag
    },
    addLink(){
      console.log(this.clipboard)
    },
    setSelectedTags(e){
      this.selectedTags = e
    }
  }

}
</script>

<style scoped>

</style>