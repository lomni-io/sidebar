<template>
  <draggable tag="div" v-model="frameList" v-bind="dragOptions" item-key="title">
    <template #item="{ element }">
      <div class="list-group-item">

        <!--   WEB TABS HERE   -->
        <div v-if="element.kind === 'web'">
          <ActiveFrameUnit :frame="element"></ActiveFrameUnit>
        </div>

        <!--   GROUP TABS HERE   -->
        <div v-if="element.kind === 'group'">
          <TabGroupScaffold :title="element.title" :color="element.color" :collapsed="element.collapsed" :group="element" :count-frames="element.frames.length">
            <NestedFrames :frames="element.frames" :group="element"></NestedFrames>
            <SuggestionFrames :frames="element.suggestedFrames" :group="element"></SuggestionFrames>
          </TabGroupScaffold>
        </div>

      </div>
    </template>
  </draggable>
</template>

<script>
import draggable from "@marshallswain/vuedraggable";
import ActiveFrameUnit from "@/components/v2/ActiveFrameUnit";
import TabGroupScaffold from "@/components/v2/TabGroupScaffold";
import SuggestionFrames from "@/components/v2/SuggestionFrames";
export default {
  props: ['frames' , 'group'],
  components: {
    SuggestionFrames,
    TabGroupScaffold,
    ActiveFrameUnit,
    draggable
  },
  name: "NestedFrames",
  watch:{
    frames(newFrame){
      this.data = newFrame
    }
  },
  computed: {
    frameList: {
      get() {
        return this.data
      },
      set(value) {
        this.data = value
        const groupId = this.group ? this.group.id : -1

        if (this.frames.length < value.length){
          // some item was added here
          const addedItem = value
              .map((item, index) => {return { ...item, order: index + 1 }})
              .filter(o1 => !this.frames.some(o2 => o1.id === o2.id))[0];

          // @ts-ignore
          this.port.postMessage({kind: "move-tab", tab: addedItem.id, windowId: addedItem.windowId, index: addedItem.order, groupId: groupId});

          console.log('add: ',{kind: "move-tab", tab: addedItem.id, windowId: addedItem.windowId, index: addedItem.order, groupId: groupId})
        }else if (this.frames.length === value.length){

          // only happens some MOVEMENTS
          const changedItem = value
              .map((item, index) => {return { ...item, order: index}})
              .find((item,index) => this.frames[index].id !== item.id)

          // @ts-ignore
          this.port.postMessage({kind: "move-tab", tab: changedItem.id, windowId: changedItem.windowId, index: changedItem.order, groupId: groupId});
          console.log('move: ',changedItem)
        }

      }
    },
    dragOptions() {
      return {
        animation: 120,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  data(){
    return {
      drag: false,
      data: this.frames
    }
  },
  methods: {
    start(){
      this.drag = true
    },
    dragEnd(){
      this.drag = false
    }
  }
};
</script>
<style scoped>

.ghost {
  opacity: 0;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

</style>
