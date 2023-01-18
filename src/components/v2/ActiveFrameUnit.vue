<template>
  <div class="frame-info-container" :class="{'open': frame.isSelected}" draggable="true" @dragend="dragend" @dragstart="dragstart" ref="frame" id="frame" >

    <small class="frame-footer-drag" v-if="!minimized">
      <font-awesome-icon icon="bars" />
    </small>

    <div class="frame-info">
      <div class="frame-header">
        <div class="frame-header-left">
          <img v-if="frame.favIconUrl" :src="frame.favIconUrl" width="16">
          <small v-if="!minimized">{{frame.domain}}</small>
          <small v-if="minimized" :class="{'current-selected': frame.isSelected}" v-on:click.exact="goToPage">{{frame.title}}</small>
          <small class="copy" @click="copyLink">
            <font-awesome-icon icon="copy" />
          </small>
        </div>

        <div class="frame-header-right">
          <div class="frame-volume" title="meeting" v-if="frame.audible">
            <font-awesome-icon icon="volume-up" />
          </div>
          <div class="frame-header-group" v-if="this.frame.groupId === -1" @click="newGroupTab" title="add tab to group">
            <font-awesome-icon icon="object-group" />
          </div>
          <div class="frame-header-group" v-if="this.frame.groupId > -1" @click="removeGroupTab" title="add tab to group">
            <font-awesome-icon icon="object-ungroup" />
          </div>
          <div class="frame-header-pinned pinned" v-if="frame.isPinned" @click="unpinTab" title="unpin current tab">
            <font-awesome-icon icon="thumbtack" />
          </div>
          <div class="frame-header-pinned" v-if="!frame.isPinned"  @click="pinTab" title="pin current tab">
            <font-awesome-icon icon="thumbtack" />
          </div>
          <div class="frame-header-close" v-if="frame.isOpened" @click="closeTab" title="close current tab">
            <font-awesome-icon icon="xmark" />
          </div>
        </div>
      </div>

      <div class="title-container">
        <h1 class="frame-title" :class="{'current-selected': frame.isSelected}" v-on:click.exact="goToPage" v-if="!minimized">{{frame.title}}</h1>
      </div>
      <div class="frame-footer">
        <div class="tags">
          <TagContainer :tags="frame.tags" :fixed-tags="frame.preProcessedTags" @addTag="addTag" @clickedTag="clickedTag" @removeTag="removeTag"></TagContainer>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import TagContainer from "@/components/v2/TagContainer.vue";
import {store} from "@/store";
import {DragItem} from "@/store/dragItem";
import {WebFrameRender} from "@/store/renderData";

// TODO: copy link buttom
export default defineComponent( {
  name: "ActiveFrameUnit",
  components: {TagContainer},
  props: ['frame', 'minimized'],
  data() {
    return {
    }
  },
  computed: {
    dragItem(){
      return store.getters.dragItem
    },
  },
  methods: {
    dragstart(e: any){
      if (e.toElement.id === 'frame'){
        let frame = this.$refs.frame as HTMLDivElement
        frame.style.opacity = '0.4'

        const dragItem: DragItem = {
          draggerId: this.frame.id,
          kind: 'frame',
          object: this.frame,
        }
        store.dispatch('setDragItem', dragItem)
      }
    },
    copyLink(){
      navigator.clipboard.writeText(this.frame.url)
    },
    dragend(){
      let frame = this.$refs.frame as HTMLDivElement
      frame.style.opacity = '1'

      store.dispatch('setDragItem', null)
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
    unpinTab(){
      // @ts-ignore
      this.port.postMessage({kind: "unpin-tab", tab: this.frame.id});
    },
    closeTab(){
      // @ts-ignore
      this.port.postMessage({kind: "close-tabs", tab: this.frame.id});
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
      const newFrame = JSON.parse(JSON.stringify(this.frame)) as WebFrameRender
      newFrame.tags = newFrame.tags.filter(t => !t.includes(tag))
      store.dispatch('upsertFrame', newFrame)
    }
  }
})

</script>

<style scoped lang="scss">


.frame{
}

.frame-info-container{
  padding: 5px;
  background-color: var(--background_input);
  border: 1px solid var(--frame_border);
  border-radius: 5px;
  margin-bottom: 5px;
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
    }
    .copy{
      margin-left: 5px;
      opacity: 0.7;
      &:hover{
        filter: var(--hover);
      }
    }
    small{
      font-size: 0.8em;
      color: var(--text_color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 60vw;

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
      color: var(--gray_1);

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

.frame-footer-drag{
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 5px;
  &:hover{
    filter: var(--hover);
  }
}

.drag-container{

}

.title-container{
  display: flex;
  align-items: center;
}

.frame-volume{
  margin-right: 5px;
  color: var(--blue);
  &:hover{
    filter: var(--hover);
    cursor: pointer;
  }
}


.tags{
  width: calc(100% - 10px);
}

</style>