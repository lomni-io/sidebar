<template>
  <draggable tag="transition-group" :component-data="{tag: 'div',type: 'transition-group',name: !drag ? 'flip-list' : null}" @start="start" @end="drag = false" v-model="frameList" v-bind="dragOptions" item-key="title">
    <template #item="{ element }">
      <div class="list-group-item" :data-id="element.id" >

        <!--   WEB TABS HERE   -->
        <div v-if="element.kind === 'web'">
          <ActiveFrameUnit :frame="element"></ActiveFrameUnit>
        </div>

        <!--   GROUP TABS HERE   -->
        <div v-if="element.kind === 'group'">
          <TabGroupScaffold :title="element.title" :color="element.color" :collapsed="element.collapsed" :group="element" :count-frames="element.frames.length">
            <NestedFrames :frames="element.frames" :is-inner="true"></NestedFrames>
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
import {getActionOutput} from "@/store/renderData";
export default {
  props: ['frames' , 'isInner'],
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

        const output = getActionOutput(this.frames, value)
        console.log(output)


        // @ts-ignore
        // this.port.postMessage({kind: "move-tab", tab: draggedFrame.id, windowId: draggedFrame.windowId, index: finalIdx, groupId: groupId});

      }
    },
    dragOptions() {
      return {
        animation: 150,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  data(){
    return {
      drag: false,
      data: this.frames,
      frameId: -1,
      frameIdx: -1,
    }
  },
  methods: {
    start(ev){
      this.frameId = parseInt(ev.item.getAttribute('data-id'))
      console.log(this.frameId)
      this.frameIdx = ev.oldIndex
      this.drag = true
    },
    dragEnd(){
      this.drag = false
    }
  }
};
</script>
<style scoped>

.flip-list-move {
  transition: transform 0.15s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0;
}




</style>
