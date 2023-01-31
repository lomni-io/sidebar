<template>
<!--  <div class="hover-area" ></div>-->
  <div class="hover-area" :class="{'hover':isDropArea}" v-if="isHoverArea" @drop="onDrop" @dragover.prevent @dragover="dragover"></div>
  <div class="drop-area" :class="{'active':isDropArea}" @drop="onDrop" @dragover="dragover"  @dragenter.prevent>

  </div>
</template>

<script>
import {store} from "@/store";

export default {
  name: "FrameDropArea",
  props: ['frameTop', 'frameBottom'],
  components: {},
  data() {
    return {
      id: Math.floor(Math.random() * 1000000000).toFixed(0)
    }
  },
  computed: {
    frameBottomId(){
      return this.frameBottom ? this.frameBottom.id: -1
    },
    frameTopId(){
      return this.frameTop ? this.frameTop.id: -1
    },
    dragItem(){
      return store.getters.dragItem
    },
    isHoverArea(){
      return this.dragItem && this.dragItem.kind === 'frame' && (this.dragItem.draggerId !== this.frameBottomId && this.dragItem.draggerId !== this.frameTopId)
    },
    isDropArea(){
      return this.dragItem && this.dragItem.kind === 'frame' && this.dragItem.dropperId === this.id && (this.dragItem.draggerId !== this.frameBottomId && this.dragItem.draggerId !== this.frameTopId)
    },
    isDroppable(){
      return this.dragItem && this.dragItem.kind === 'frame' && this.dragItem.dropperId !== this.id
    }
  },
  methods: {
    onDrop(){
      if (this.dragItem && this.dragItem.kind === 'frame'){
        const dragFrame = this.dragItem.object
        const siblingFrame = dragFrame.id === this.frameTopId ? this.frameTop : this.frameBottom

        const finalIdx = dragFrame.index > siblingFrame.index ? siblingFrame.index : siblingFrame.index -1

        if (dragFrame.isOpened){
          // @ts-ignore
          this.port.postMessage({kind: "move-tab", tab: dragFrame.id, windowId: siblingFrame.windowId, index: finalIdx, groupId: siblingFrame.groupId});
        }else{
          // @ts-ignore
          this.port.postMessage({kind: "open-and-update", url: dragFrame.url, windowId: siblingFrame.windowId, index: siblingFrame.index, groupId: siblingFrame.groupId});
        }

      }
    },
    dragover(){
      store.dispatch('setDropperId', this.id)
    },
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">

.hover-area{
  width: calc(100% - 20px);
  height: 40px;
  position: absolute;
  z-index: 10000000;
  //background-color: red;
  margin-left: -5px;
  margin-top: -20px;
  animation: moveIn 0.1s ease-out;
  &.hover{
    //background-color: green;
    animation: moveOut 0.1s ease-out;
    margin-top: 0;
    height: 40px;
  }
}

.drop-area{
  //background-color: blue;
  height: 0;
  margin-top: 0;
  animation: moveOut 0.1s ease-out;

  &.active{
    height: 40px;
    margin-top: -20px;
    animation: moveIn 0.1s ease-out;
  }

}

@keyframes moveIn {
  0% {height: 0; margin-top: 0;}
  100% {height: 40px; margin-top: -20px;}
}

@keyframes moveOut {
  from {height: 40px; margin-top: -20px;}
  to {height: 0; margin-top: 0;}
}

.tags{
  width: calc(100% - 10px);
}

</style>