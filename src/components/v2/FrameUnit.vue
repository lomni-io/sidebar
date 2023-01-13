<template>
  <div class="frame-info-container" draggable="true" @dragend="dragend" @dragstart="dragstart" ref="frame" id="frame" >
    <div class="frame-info">
      <div class="frame-header">
        <div class="frame-header-left">
          <img :src="frame.favIconUrl" width="16">
          <small>{{frame.domain}}</small>
        </div>
        <div class="frame-header-right">

          <div class="frame-header-close" v-if="frame.isOpened" @click="closeTab" title="close current tab">
            <font-awesome-icon icon="xmark" />
          </div>
          <div class="frame-header-pinned pinned" v-if="frame.isPinned" @click="unpinTab" title="unpin current tab">
            <font-awesome-icon icon="thumbtack" />
          </div>
          <div class="frame-header-pinned" v-if="!frame.isPinned"  @click="pinTab" title="pin current tab">
            <font-awesome-icon icon="thumbtack" />
          </div>
        </div>
      </div>
      <h1 class="frame-title" :class="{'current-selected': frame.isSelected}" v-on:click.exact="goToPage">{{frame.title}}</h1>
      <div class="tags">
        <TagContainer :tags="frame.tags" :fixed-tags="frame.preProcessedTags"></TagContainer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import TagContainer from "@/components/v2/TagContainer.vue";
import {store} from "@/store";
import {DragItem} from "@/store/dragItem";

export default defineComponent( {
  name: "FrameUnit",
  components: {TagContainer},
  props: ['frame'],
  data() {
    return {
      frameId: Math.floor(Math.random() * 1000000000).toFixed(0)
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
          draggerId: this.frameId,
          kind: 'frame',
          object: this.frame,
        }
        store.dispatch('setDragItem', dragItem)
      }
    },
    async onDrop(){
      if (this.dragItem && this.dragItem.kind === 'frame'){
        const dragFrame = this.dragItem.object

        if (dragFrame.isOpened){
          // @ts-ignore
          this.port.postMessage({kind: "move-tab", tab: dragFrame.id, windowId: this.frame.windowId, index: this.frame.index, groupId: this.frame.groupId});
        }else{
          // @ts-ignore
          await this.port.postMessage({kind: "open-and-update", url: dragFrame.url, windowId: this.frame.windowId, index: this.frame.index, groupId: this.frame.groupId});
        }

      }
    },
    dragover(){
      store.dispatch('setDropperId', this.frameId)
    },
    dragend(){
      let frame = this.$refs.frame as HTMLDivElement
      frame.style.opacity = '1'

      store.dispatch('setDragItem', null)
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
  border-radius: 5px;
  margin-bottom: 5px;
  position: relative;
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

.drop-container{
  width: 100%;
  height: 80px;
}

</style>