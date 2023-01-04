<template>

  <div class="frame-header-right">

    <div class="frame-header-edit" @click="toEditMode()" title="edit frame">
      <font-awesome-icon icon="edit" />
    </div>
  </div>

  <div class="view">{{note.content}}</div>
  <div class="tags">
    <TagViewContainer :tags="note.tags" :fixed-tags="note.preProcessedTags" @clickedTag="clickedTag"></TagViewContainer>
  </div>
</template>

<script>
import TagViewContainer from "@/components/search-tab/TagViewContainer";
export default {
  name: "NoteViewContainer",
  components: {TagViewContainer},
  emits: ['toEditMode', 'selectTag'],
  props: ['note'],
  methods: {
    toEditMode(){
      this.$emit('toEditMode')
    },
    clickedTag(tag){
      this.$emit('selectTag', tag)
    },
  }
}
</script>

<style scoped lang="scss">

.view{
  color: var(--text_color);
  font-size: 0.9em;
  font-family: monospace;
  outline: none;
  padding: 10px;
}

.frame-header-right{
  display: flex;
  justify-content: right;
  div{
    margin-right: 5px;
  }

  .frame-header-edit{
    width: 12px;
    height: 12px;
    color: var(--yellow_60);
    border-radius: 10px;
    font-size: 0.8em;
    &:hover{
      cursor: pointer;
      filter: var(--hover);
    }
  }

}

</style>