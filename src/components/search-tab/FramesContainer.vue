<template>
  <div class="frame-container" ref="frames">

    <div class="frame" v-for="(frame, index) in framesFilteredWithLimit" :key="index" :ref="'frame'+index">
      <div v-if="frame.kind === 'note'">
        <NoteViewContainer v-if="editModeIndex !== index" :note="frame" @toEditMode="toEditMode(index)" @selectTag="selectTag"></NoteViewContainer>
        <NoteEditContainer v-if="editModeIndex === index" :frames="frames" :note="frame" @toViewMode="toViewMode(index)"></NoteEditContainer>
      </div>
      <div v-if="frame.kind === 'url'">
        <FrameViewContainer v-if="editModeIndex !== index" :frame="frame" @toEditMode="toEditMode(index)" @selectTag="selectTag"></FrameViewContainer>
        <FrameEditorContainer v-if="editModeIndex === index" :frames="frames" :frame="frame" @toViewMode="toViewMode(index)" @applyChanges="applyChanges" @removeFrame="removeFrame"></FrameEditorContainer>
      </div>
      <div class="divider"></div>
    </div>

    <div v-if="totalRemain > 0" class="pagination-container">
      <small><span @click="showAll">click here</span> to show all {{framesFiltered.length}} frames</small>
    </div>


<!--  IF IS EMPTY  -->

    <div class="empty-container" v-if="framesFiltered.length === 0">
      <h2>It's empty</h2>
      <p>{{framesFiltered.length}} filtered of {{frames.length}} frames</p>
    </div>

  </div>
</template>

<script>
import {framesFiltered} from "@/components/search-tab/filters";
import FrameViewContainer from "@/components/search-tab/FrameViewContainer";
import FrameEditorContainer from "@/components/search-tab/FrameEditorContainer";
import NoteViewContainer from "@/components/search-tab/NoteViewContainer";
import NoteEditContainer from "@/components/search-tab/NoteEditContainer";
import {store} from "@/store";

export default {
  name: "FramesContainer",
  components: {NoteEditContainer, NoteViewContainer, FrameEditorContainer, FrameViewContainer},
  emits: ['selectTag'],
  props: ['selectedTags'],
  data() {
    return {
      editModeIndex: -1,
      limit: 10,
    }
  },
  computed:{
    totalRemain(){
      return this.framesFiltered.length - this.limit
    },
    frames(){
      return store.getters.frames
    },
    framesFilteredWithLimit(){
      return framesFiltered(this.frames, this.selectedTags).splice(0, this.limit)
    },
    framesFiltered(){
      return framesFiltered(this.frames, this.selectedTags)
    },
  },
  watch: {
    selectedTags(){
      this.limit = 10
    }
  },
  methods: {
    showAll(){
      this.limit = this.framesFiltered.length
    },
    selectTag(tag){
      this.$emit('selectTag', tag)
    },
    toEditMode(index){
      this.editModeIndex = index
    },
    toViewMode(){
      this.editModeIndex = -1
    },
    applyChanges(frame){
      store.dispatch('upsertFrame', frame)
      this.editModeIndex = -1
    },
    removeFrame(frame){
      store.dispatch('upsertFrame', frame)
      this.editModeIndex = -1
    },
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "../../../src/assets/styles/color";

.empty-container{
  color: #afadad;
  text-align: center;
  border-radius: 5px;
  border: 1px dashed #585757;
  p{
    margin: 0;
  }
  h2{
    margin: 0;
  }
}

.tags{
  display: flex;
}

.frame{

  .divider{
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1px dashed var(--gray_1);
  }
}

.pagination-container{
  text-align: center;
  font-size: 0.9em;
  span{
    text-decoration-line: underline;
    cursor: pointer;

  }
}


</style>