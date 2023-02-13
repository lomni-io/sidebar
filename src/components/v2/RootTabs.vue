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
            <GroupTabs :frames="element.frames" :group="element" :raw-list="rawList"></GroupTabs>
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
import GroupTabs from "@/components/v2/GroupTabs";

export default {
  props: ['frames', 'rawList'],
  emits: ['update'],
  components: {
    GroupTabs,
    SuggestionFrames,
    TabGroupScaffold,
    ActiveFrameUnit,
    draggable
  },
  name: "RootTabs",
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
        group: "group",
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
      const action = getFinalDragAction(ev, this.rawList, -1)

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
