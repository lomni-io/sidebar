<template>
  <div class="frame-info-container">
    <div class="frame-info">
      <div class="frame-header">
        <div class="frame-header-left">
          <img :src="frame.favIconUrl" width="16">
          <small>{{frame.domain}}</small>
        </div>
        <div class="frame-header-right">

          <div class="frame-header-pinned pinned" v-if="isOpened && isPinned" @click="unpinTab" title="unpin current tab">
            <font-awesome-icon icon="thumbtack" />
          </div>
          <div class="frame-header-pinned" v-if="isOpened && !isPinned"  @click="pinTab" title="pin current tab">
            <font-awesome-icon icon="thumbtack" />
          </div>
          <div class="frame-header-status" :class="{'active': isOpened}" title="current status">
            <font-awesome-icon icon="tv" />
          </div>
          <div class="frame-header-edit" @click="toEditMode()" v-if="!isNewFrame" title="edit frame">
                <font-awesome-icon icon="edit" />
          </div>
          <div class="frame-header-add" @click="addNewTab()" v-if="isNewFrame" title="add new frame">
            <font-awesome-icon icon="square-plus" />
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

<script lang="ts">
import {store} from "@/store";
import {defineComponent} from "vue";
import TagViewContainer from "@/components/search-tab/TagViewContainer.vue";
import {WebFrameData} from "@/entity/frame";
import {Tab} from "@/store/renderData";

export default defineComponent( {
  name: "FrameViewContainer",
  components: {TagViewContainer},
  emits: ['toEditMode', 'goToPage', 'selectTag'],
  props: ['frame'],
  computed: {
    isNewFrame(){
      return this.frame.preProcessedTags.some((tag:string) => tag === '@newTab')
    },
    isOpened(){
      const tabs = store.getters.allTabs
      return tabs.some((tab: Tab) => tab.url === this.frame.url) as Tab
    },
    isPinned(){
      const tabs = store.getters.allTabs
      return tabs.some((tab: Tab) => tab.url === this.frame.url && tab.pinned) as Tab
    },
    tab():Tab{
      const tabs = store.getters.allTabs
      return tabs.find((tab: Tab) => tab.url === this.frame.url)
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
        // @ts-ignore
        this.port.postMessage({kind: "open-request-existing-tab", tab: this.tab.id});
      }else{
        // @ts-ignore
        this.port.postMessage({kind: "open-request-new-tab", url: this.frame.url});
      }
    },
    pinTab(){
      // @ts-ignore
      this.port.postMessage({kind: "pin-tab", tab: this.tab.id});
    },
    unpinTab(){
      // @ts-ignore
      this.port.postMessage({kind: "unpin-tab", tab: this.tab.id});
    },
    clickedTag(tag: string){
      this.$emit('selectTag', tag)
      // this.emitter.emit('frame-add-tag-to-selection', {id: this.id, tag: tag})
    },
    toEditMode(){
      this.$emit('toEditMode')
    },
    addNewTab(){
      const frame: WebFrameData = {
        url: this.tab.url,
        title: this.tab.title,
        tags: [],
        favIconUrl: this.tab.favIconUrl,
        updatedAt: Date.now()
      }
      store.dispatch('upsertFrame', frame)
    }
  },
})

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
  color: var(--pink);
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 60vw;
    }
  }

  .frame-header-right{
    display: flex;
    div{
      margin-right: 5px;
    }

    font-size: 0.8em;
    border-radius: 10px;

    .frame-header-status{
      color: var(--gray_1);

      &.active{
        color: var(--blue);
      }
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }

    .frame-header-pinned{
      color: var(--gray_1);

      &.pinned{
        color: var(--blue);
      }
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }

    .frame-header-edit{
      width: 12px;
      height: 12px;
      color: var(--yellow);
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }

    .frame-header-add{
      width: 12px;
      height: 12px;
      color:  var(--green);
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