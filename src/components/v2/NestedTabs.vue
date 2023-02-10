<template>
  <draggable tag="div" @start="drag = true" @change="log" @end="this.drag = false" v-model="finalList" v-bind="dragOptions" item-key="id">
    <template #item="{ element }">
      <div class="list-group-item" :data-id="element.id" >

        <!--   WEB TABS HERE   -->
        <div v-if="element.kind === 'web'">
          <ActiveFrameUnit :frame="element"></ActiveFrameUnit>
        </div>

        <!--   GROUP TABS HERE   -->
        <div v-if="element.kind === 'group'">
          <TabGroupScaffold :title="element.title" :color="element.color" :collapsed="element.collapsed" :group="element" :count-frames="element.frames.length">
            <NestedFrames :frames="element.frames" :group="element" :raw-list="rawList"></NestedFrames>
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
import {getFinalDragAction} from "@/store/renderData";

export default {
  props: ['frames' , 'group' , 'rawList'],
  emits: ['update'],
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
    finalList: {
      get() {
        return this.data
      },
      set(value) {
        this.data = value
      }
    },
    dragOptions() {
      return {
        animation: 100,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  data(){
    return {
      data: this.frames,
      drag: false,

    }
  },
  methods: {
    log(ev) {
      console.log(ev, this.group)
      const action = getFinalDragAction(ev, this.rawList, this.group ? this.group.id : -1)
      if (action){
        // @ts-ignore
        this.port.postMessage(action);
      }
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
