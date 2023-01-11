<template>
  <div class="frame-info-container" draggable="true" @dragleave="dragleave" @dragend="dragend" @dragstart="dragstart" ref="frame" id="frame"  >
    <div class="frame-info">
      <div class="frame-header">
        <div class="frame-header-left">
          <img :src="frame.favIconUrl" width="16">
          <small>{{frame.domain}}</small>
        </div>
        <div class="frame-header-right">

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
import TagContainer from "@/components/v2/search/TagContainer.vue";
import {store} from "@/store";
import {DragItem} from "@/store/dragItem";

export default defineComponent( {
  name: "FrameUnit",
  components: {TagContainer},
  props: ['frame'],
  computed: {

  },
  methods: {
    dragstart(e: any){
      if (e.toElement.id === 'frame'){
        let frame = this.$refs.frame as HTMLDivElement
        frame.style.opacity = '0.4'

        const dragItem: DragItem = {
          kind: 'frame',
          object: this.frame,
        }
        store.dispatch('setDragItem', dragItem)
      }
    },
    dragleave(){

    },
    dragend(){
      let frame = this.$refs.frame as HTMLDivElement
      frame.style.opacity = '1'

      store.dispatch('setDragItem', null)
    },
    pinTab(){
      // @ts-ignore
      this.port.postMessage({kind: "pin-tab", tab: this.tab.id});
    },
    unpinTab(){
      // @ts-ignore
      this.port.postMessage({kind: "unpin-tab", tab: this.tab.id});
    },
    goToPage(){

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
        color: var(--blue_60);
      }
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }

    .frame-header-pinned{
      color: var(--gray_1);

      &.pinned{
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
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }

    .frame-header-add{
      width: 12px;
      height: 12px;
      color:  var(--green_60_60);
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