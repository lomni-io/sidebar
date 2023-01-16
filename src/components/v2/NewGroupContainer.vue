<template>
  <TabGroupScaffold title="new group" v-if="dragItem && dragItem.kind === 'frame'">
    <div class="new-group" @drop="onDrop" @dragover.prevent @dragenter.prevent>drop frame here to create group</div>
  </TabGroupScaffold>
</template>

<script>
import {store} from "@/store";
import TabGroupScaffold from "@/components/v2/TabGroupScaffold";

export default {
  name: "NewGroupContainer",
  components: {TabGroupScaffold},
  computed: {
    dragItem(){
      return store.getters.dragItem
    }
  },
  methods: {
    async onDrop(){
      if (this.dragItem && this.dragItem.kind === 'frame'){
        const dragFrame = this.dragItem.object
        // @ts-ignore
        this.port.postMessage({kind: "group-tabs", tabs: dragFrame.id});
      }
    },
  }
}
</script>

<style scoped>

.new-group{
  display: flex;
  justify-content: center;
  align-content: center;
  justify-items: center;
  padding: 5px;
  border: 1px dashed var(--text_color);
  border-radius: 5px;
  color: var(--text_color);
  text-align: center;
}
</style>