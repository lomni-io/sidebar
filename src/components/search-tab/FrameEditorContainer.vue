<template>
  <div class="frame-info-container">
    <div class="frame-info" v-if="newFrame">
      <div class="frame-header">
        <div class="frame-header-left">
          <img :src="newFrame.favIconUrl" width="16">
          <small>{{getDomainFromUrl(newFrame.url)}}</small>
        </div>
        <div class="frame-header-right">
          <div class="frame-header-view" @click="toViewMode()">
            <font-awesome-icon icon="eye" />
          </div>
          <div class="frame-header-apply" @click="applyChanges()">
            <font-awesome-icon icon="floppy-disk" />
          </div>
          <div class="frame-header-remove" @click="removeFrame()">
            <font-awesome-icon icon="trash" />
          </div>
        </div>
      </div>
      <h1 class="frame-title" v-on:click="goToPage()">{{newFrame.title}}</h1>
<!--      <textarea v-model="newFrame.comment" placeholder="add comments here"></textarea>-->
      <div class="tags">
        <TagEditorContainer @addTag="addTag" @removeTag="removeTag" :current-tags="newFrame.tags" :frames="frames"></TagEditorContainer>
      </div>
    </div>
  </div>
</template>

<script>
import {getDomainsFromUrl} from "@/components/url";
import TagEditorContainer from "@/components/search-tab/TagEditorContainer";

export default {
  name: "FrameEditorContainer",
  components: {TagEditorContainer},
  emits: ['toEditMode', 'goToPage', 'toViewMode', 'applyChanges', 'removeFrame'],
  props: ['frame', 'frames'],
  data() {
    return {
      newFrame: null,
    }
  },
  methods: {
    getDomainFromUrl(url){
      return getDomainsFromUrl(url).join(" >> ")
    },
    goToPage(){
      this.$emit('goToPage')
    },
    addTag(tag){
      this.newFrame.tags.push(tag)
    },
    removeTag(tag){
      this.newFrame.tags = this.newFrame.tags.filter(x => x !== tag)
    },
    clickedTag(tag){
      this.emitter.emit('frame-add-tag-to-selection', {id: this.id, tag: tag})
    },
    toViewMode(){
      this.$emit('toViewMode')
    },
    removeFrame(){
      this.newFrame.operation = 'remove'
      this.$emit('removeFrame', this.newFrame)
      this.$emit('toViewMode')
    },
    applyChanges(){
      this.$emit('applyChanges', this.newFrame)
    }
  },
  mounted() {
    this.newFrame = JSON.parse(JSON.stringify(this.frame))
  }
}
</script>

<style scoped lang="scss">
@import "../../../src/assets/styles/color";

.frame-container{
  //width: 100%;
}

.frame{
  margin-bottom: 10px;
}

.frame-info-container{
  width: 100%;
}

.frame-title{
  text-align: left;
}

.frame-header{
  display: flex;
  align-items: center;
  justify-content: space-between;

  .frame-header-left{
    align-content: center;
    display: flex;
    img{
      margin-right: 5px;
    }
    small{
      font-size: 0.8em;
      color: var(--text_color);
    }
  }

  .frame-header-right{
    display: flex;

    div{
      margin-right: 5px;
    }

    .frame-header-view{
      width: 12px;
      height: 12px;
      color: var(--blue);
      border-radius: 10px;
      font-size: 0.8em;
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }

    .frame-header-apply{
      width: 12px;
      height: 12px;
      color: var(--yellow);
      border-radius: 10px;
      font-size: 0.8em;
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }

    .frame-header-remove{
      width: 12px;
      height: 12px;
      color: var(--red);
      border-radius: 10px;
      font-size: 0.8em;
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }
  }

}

h1{
  font-size: 1.1em;
  color: var(--scroll);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 2em;
  cursor: pointer;
}
h1:hover{
  text-decoration-line: underline;
}
.frame-tags{

}

textarea{
  width: calc(100% - 5px);
  font-size: 0.9em;
  outline: none;
  background-color: transparent;
  color: var(--text_color);
}

</style>