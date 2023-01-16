<template>

  <div v-if="hasPlugin">
    <ul class="sticky">
      <li :class="{'active': this.selected === 'tabs'}" @click="select('tabs')">Tabs</li>
      <li :class="{'active': this.selected === 'frames'}" @click="select('frames')">Frames</li>
      <li :class="{'active': this.selected === 'sync'}" @click="select('sync')">Sync</li>
    </ul>

    <TabsView v-if="renderData && selected === 'tabs'" :render-data="renderData"></TabsView>
    <FramesView v-if="renderData && selected === 'frames'" :render-data="renderData"></FramesView>
    <SyncView v-if="selected === 'sync'"></SyncView>

  </div>


  <PluginInstallView v-if="!hasPlugin"></PluginInstallView>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import TabsView from "@/views/ActiveAndFramesView.vue";
import FramesView from "@/views/FramesView.vue";
import PluginInstallView from "@/views/PluginInstallView.vue";
import {store} from "@/store";
import SyncView from "@/views/SyncView.vue";
// const renderData = require('./renderData.json')

export default defineComponent( {
  name: "SidebarView",
  components: {SyncView, PluginInstallView, FramesView, TabsView},
  data() {
    return {
      selected: 'tabs',
      hasPlugin: false
    }
  },
  computed: {
    renderData(){
      return store.getters.renderData
    }
  },
  methods: {
    select(value: string){
      this.selected = value
      this.$emit('selected', value)
    }
  },
  mounted() {
    // @ts-ignore
    if (this.port) {
      this.hasPlugin = true
      // @ts-ignore
      this.port.postMessage({kind: "all-tabs-request"});
      // @ts-ignore
      this.port.postMessage({kind: "all-tab-groups-request"});
      store.dispatch('loadState')
    }

  }
})

</script>

<style scoped lang="scss">

ul{
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid var(--background_input_border);
  background-color: var(--background_input);
  color: var(--text_color);
  font-size: 0.8em;
}
li{
  cursor: pointer;
  height: 20px;
  background-color: var(--background_input);
  /*border-right: 1px solid var(--background_input_border);*/
  padding: 2px 10px 2px 10px;
  &.active{
    filter: var(--hover);
    background-color: var(--background_dark);
  }
  &:hover {
    filter: var(--hover);
  }
}

.sticky{
  position: sticky !important;
  top: 0;
  z-index: 100000;
}

</style>