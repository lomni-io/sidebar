<template>
  <div class="new-group" v-if="dragItem && dragItem.kind === 'frame'">drop frame here to create group</div>
</template>

<script>
import {store} from "@/store";

export default {
  name: "NewGroupContainer",
  computed: {
    dragItem(){
      return store.getters.dragItem
    }
  },
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