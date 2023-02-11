<template>
  <draggable tag="div" @start="drag = true" @change="log" @end="this.drag = false" v-model="finalList" v-bind="dragOptions" item-key="id">
    <template #item="{ element }">
      <div class="list-group-item" :data-id="element.id" >
        <ActiveFrameUnit :frame="element"></ActiveFrameUnit>
      </div>
    </template>
  </draggable>
</template>

<script>
import draggable from "@marshallswain/vuedraggable";
import ActiveFrameUnit from "@/components/v2/ActiveFrameUnit";
import {getFinalDragAction} from "@/store/renderData";

export default {
  props: ['frames' , 'group' , 'rawList'],
  emits: ['update'],
  components: {
    ActiveFrameUnit,
    draggable
  },
  name: "GroupTabs",
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
