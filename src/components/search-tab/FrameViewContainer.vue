<template>
  <div class="frame-info-container">
    <div class="frame-info">
      <div class="frame-header">
        <div class="frame-header-left">
          <img :src="frame.favIconUrl" width="16">
          <small>{{frame.domain}}</small>
        </div>
        <div class="frame-header-right">

          <div class="frame-header-status" :class="{'active': isOpened}" title="current status">
            <font-awesome-icon icon="tv" />
          </div>

          <div class="frame-header-edit" @click="toEditMode()" title="edit frame">
                <font-awesome-icon icon="edit" />
          </div>
        </div>
      </div>
      <h1 class="frame-title" :class="{'current-selected': isSelected}" v-on:click.exact="goToPage('new')">{{frame.title}}</h1>
      <small>{{frame.comment}}</small>
      <div class="tags">
        <TagViewContainer :tags="frame.tags" :fixed-tags="frame.preProcessedTags" @clickedTag="clickedTag"></TagViewContainer>
      </div>
    </div>
  </div>
</template>

<script>
import TagViewContainer from "@/components/search-tab/TagViewContainer";
import {store} from "@/store";

export default {
  name: "FrameViewContainer",
  components: {TagViewContainer},
  emits: ['toEditMode', 'goToPage', 'selectTag'],
  props: ['frame'],
  computed: {
    isOpened(){
      const tabs = store.getters.allTabs
      return tabs.some(tab => tab.url === this.frame.url)
    },
    tab(){
      const tabs = store.getters.allTabs
      return tabs.find(tab => tab.url === this.frame.url)
    },
    isSelected(){
      const tab = store.getters.activeTab
      if (tab){
        return tab.url === this.frame.url
      }
      return false
    }
  },
  methods: {
    goToPage(){
      if (this.tab){
        this.port.postMessage({kind: "open-request-existing-tab", tab: this.tab.id});
      }else{
        this.port.postMessage({kind: "open-request-new-tab", url: this.frame.url});
      }
    },
    clickedTag(tag){
      this.$emit('selectTag', tag)
      // this.emitter.emit('frame-add-tag-to-selection', {id: this.id, tag: tag})
    },
    toEditMode(){
      this.$emit('toEditMode')
    }
  },
}
</script>

<style scoped lang="scss">

.frame-container{
  //width: 100%;
}

.frame{
}

.frame-info-container{
  width: 100%;
}

.current-selected{
  color: var(--pink1);
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
      font-size: 0.7em;
      color: var(--text_color);
    }
  }

  .frame-header-right{
    display: flex;
    div{
      margin-right: 5px;
    }

    .frame-header-status{
      width: 12px;
      height: 12px;
      color: var(--gray_1);
      border-radius: 10px;
      font-size: 10px;
      &.active{
        color: var(--blue_60);
      }
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }

    .frame-header-edit{
      width: 12px;
      height: 12px;
      color: var(--yellow_60);
      border-radius: 10px;
      font-size: 10px;
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }

  }

}

.frame-title{
  text-align: left;
}

h1{
  font-size: 1.1em;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 2em;
  cursor: pointer;
}
h1:hover{
  filter: var(--hover);
}
.frame-tags{

}

</style>