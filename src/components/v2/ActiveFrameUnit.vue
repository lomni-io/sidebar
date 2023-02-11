<template>
  <div class="frame-info-container" :class="{'open': frame.isSelected}" ref="frame" id="frame" >

    <div class="frame-info">
      <div class="frame-header" v-on:click.exact="goToPage">
        <div v-if="editTitle" class="edit-title">
          <img v-if="frame.favIconUrl" :src="frame.favIconUrl" width="16" height="16">
          <input v-model="newTitle">
          <font-awesome-icon class="accept" icon="circle-check" @click="upsertBookmark"/>
          <font-awesome-icon class="cancel" icon="xmark" @click="editTitle = false" />
        </div>

        <div class="frame-header-left" v-if="!editTitle">
          <img v-if="frame.favIconUrl" :src="frame.favIconUrl" width="16" height="16">
          <p class="frame-title" :class="{'current-selected': frame.isSelected}" v-on:dblclick="toEditMode">{{frame.title}}</p>
        </div>

        <div class="frame-header-right" v-if="!editTitle">
          <div class="frame-volume" title="meeting" v-if="frame.audible">
            <font-awesome-icon icon="volume-up" />
          </div>
          <div class="frame-header-clone" @click="clone" v-on:click.stop title="clone frame">
            <font-awesome-icon icon="clone" />
          </div>
          <div class="frame-header-group" v-if="this.frame.groupId === -1" @click="newGroupTab" v-on:click.stop title="add tab to group">
            <font-awesome-icon icon="object-group" />
          </div>
          <div class="frame-header-group" v-if="this.frame.groupId > -1" @click="removeGroupTab" v-on:click.stop title="add tab to group">
            <font-awesome-icon icon="object-ungroup" />
          </div>
          <div class="frame-header-pinned pinned" v-if="frame.isPinned" @click="unpinTab" v-on:click.stop title="unpin current tab">
            <font-awesome-icon icon="thumbtack" />
          </div>
          <div class="frame-header-pinned" v-if="!frame.isPinned"  @click="pinTab" v-on:click.stop title="pin current tab">
            <font-awesome-icon icon="thumbtack" />
          </div>
          <div class="frame-header-star star" v-if="frame.bookmarkId" @click="removeBookmark" title="remove from bookmark">
            <font-awesome-icon icon="star" />
          </div>
          <div class="frame-header-star" v-if="!frame.bookmarkId" @click="addBookmark" title="add to bookmark">
            <font-awesome-icon icon="star" />
          </div>
          <div class="frame-header-close" v-if="frame.isOpened" @click="closeTab" v-on:click.stop title="close current tab">
            <font-awesome-icon icon="xmark" />
          </div>
        </div>
      </div>

      <TagContainer v-if="!frame.isPinned" @clickedSuggestion="clickedSuggestion" :suggested-tags="frame.suggestedTags" :fixed-tags="frame.preProcessedTags" :tags="frame.tags" @clickedTag="clickedTag" @removeTag="removeTag" v-on:click.stop></TagContainer>

    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {store} from "@/store";
import {joinTitleAndTags, WebFrameRender} from "@/store/renderData";
import TagContainer from "@/components/v2/TagContainer.vue";

export default defineComponent( {
  name: "ActiveFrameUnit",
  components: {TagContainer},
  props: ['frame'],
  data() {
    return {
      editTitle: false,
      newTitle: this.frame.title
    }
  },
  computed: {
    dragItem(){
      return store.getters.dragItem
    },
  },
  watch: {
  },
  mounted() {

  },
  methods: {
    clickedSuggestion(tag: string){
      const tags = [...this.frame.tags, tag]
      const newTitle = joinTitleAndTags(this.frame.title, tags)

      if (this.frame.bookmarkId){
        // @ts-ignore
        this.port.postMessage({kind: "update-bookmark", url: this.frame.url, title: newTitle, id: this.frame.bookmarkId});
      }else{
        // @ts-ignore
        this.port.postMessage({kind: "create-bookmark", url: this.frame.url, title: newTitle});
      }
    },
    toEditMode(){
      this.editTitle = true
      this.newTitle = this.frame.title
    },
    upsertBookmark(){
      const newTitle = joinTitleAndTags(this.newTitle, this.frame.tags)
      if (this.frame.bookmarkId){
        // @ts-ignore
        this.port.postMessage({kind: "update-bookmark", url: this.frame.url, title: newTitle, id: this.frame.bookmarkId});
      }else{
        // @ts-ignore
        this.port.postMessage({kind: "create-bookmark", url: this.frame.url, title: newTitle});
      }
      this.editTitle = false
    },
    copyLink(){
      navigator.clipboard.writeText(this.frame.url)
    },
    clickedTag(tag: string){
      store.dispatch('addSearchItem', tag)
    },
    newGroupTab(){
      // @ts-ignore
      this.port.postMessage({kind: "group-tabs", tabs: this.frame.id});
    },
    removeGroupTab(){
      // @ts-ignore
      this.port.postMessage({kind: "ungroup-tabs", tabs: this.frame.id});
    },
    pinTab(){
      if (this.frame.isOpened){
        // @ts-ignore
        this.port.postMessage({kind: "pin-tab", tab: this.frame.id});
      }else{
        // @ts-ignore
        this.port.postMessage({kind: "open-request-new-tab", url: this.frame.url, pinned: true});
      }
    },
    clone(){
      // @ts-ignore
      this.port.postMessage({kind: "duplicate-tab", id: this.frame.id});
    },
    unpinTab(){
      // @ts-ignore
      this.port.postMessage({kind: "unpin-tab", tab: this.frame.id});
    },
    closeTab(){
      // @ts-ignore
      this.port.postMessage({kind: "close-tabs", tab: this.frame.id});
    },
    addBookmark(){
      // @ts-ignore
      this.port.postMessage({kind: "create-bookmark", url: this.frame.url, title: this.frame.title});
    },
    removeBookmark(){
      // @ts-ignore
      this.port.postMessage({kind: "remove-bookmark", id: this.frame.bookmarkId});
    },
    goToPage(){
      if (this.frame.isOpened){
        // @ts-ignore
        this.port.postMessage({kind: "open-request-existing-tab", tab: this.frame.id});
      }else{
        // @ts-ignore
        this.port.postMessage({kind: "open-request-new-tab", url: this.frame.url});
      }
    },
    addTag(tag: string){
      const newFrame = JSON.parse(JSON.stringify(this.frame)) as WebFrameRender
      newFrame.tags.push(tag)
      store.dispatch('upsertFrame', newFrame)
    },
    removeTag(tag: string){
      const newTags = this.frame.tags.filter((t: string) => t !== tag)
      const newTitle = joinTitleAndTags(this.frame.title, newTags)

      // @ts-ignore
      this.port.postMessage({kind: "update-bookmark", url: this.frame.url, title: newTitle, id: this.frame.bookmarkId});
    }
  }
})

</script>

<style scoped lang="scss">

.frame{
}

.frame-info-container{
  padding: 2px 5px 2px 5px;
  background-color: var(--background_input);
  border: 1px solid var(--frame_border);
  border-radius: 5px;
  margin-top: 5px;
  position: relative;
  &.open{
    background-color: var(--background_frame_selected);
  }
}

.current-selected{
  color: var(--purple);
}

.frame-header{
  display: flex;
  align-items: center;
  justify-content: space-between;

  .frame-header-left{
    cursor: pointer;
    align-content: center;
    display: flex;
    img{
      margin-right: 5px;
      margin-top: 2px;
    }
    .copy{
      margin-left: 5px;
      opacity: 0.7;
      &:hover{
        filter: var(--hover);
      }
    }
    p{
      white-space: nowrap;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 60vw;

      &:hover{
        filter: var(--hover);
      }

      &.current-selected{
        color: var(--purple);
      }
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
      color: var(--scroll);

      &.active{
        color: var(--blue);
      }
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }

    .frame-header-group {
      color: var(--text_color);
      opacity: 0.8;
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }

    .frame-header-clone {
      color: var(--text_color);
      opacity: 0.8;
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }

    .frame-header-pinned{
      color: var(--scroll);

      &.pinned{
        color: var(--blue);
      }
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }

    .frame-header-star{
      color: var(--scroll);

      &.star{
        color: var(--yellow);
      }
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }

    .frame-header-close{
      color: var(--red);
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
  display: inline-block;
  max-width: 100%;
  text-align: left;
  margin: 0;
  color: var(--blue);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.frame-tags{

}

.drop-area{
  background-color: inherit;
  opacity: 0.2;
  border-radius: 5px;
  margin-left: -5px;
  margin-top: -5px;
  position: absolute;
  height: 100%;
  width: 100%;
}


.frame-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drag-container{

}

.edit-title{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input{
    width: calc(100% - 40px);
    filter: var(--hover);
    outline:none;
  }
  .accept{
    color: var(--green);
    margin-right: 5px;
    margin-left: 5px;
    &:hover{
      filter: var(--hover);
      cursor: pointer;
    }
  }
  .cancel{
    color: var(--text_color);
    &:hover{
      filter: var(--hover);
      cursor: pointer;
    }
  }
}

.title-container{
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1{
    font-size: 1.0em;
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

  .tags{
      font-size: 0.95em;
  }

}

.frame-volume{
  margin-right: 5px;
  color: var(--blue);
  &:hover{
    filter: var(--hover);
    cursor: pointer;
  }
}

</style>