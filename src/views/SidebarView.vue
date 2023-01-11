<template>

  <div v-if="hasPlugin">
    <ul>
      <li :class="{'active': this.selected === 'tabs'}" @click="select('tabs')">Tabs</li>
      <li :class="{'active': this.selected === 'frames'}" @click="select('frames')">Frames</li>
      <li>Sync</li>
    </ul>

    <TabsView v-if="renderData && selected === 'tabs'" :render-data="renderData"></TabsView>
    <FramesView v-if="renderData && selected === 'frames'" :render-data="renderData"></FramesView>

  </div>


  <PluginInstallView v-if="!hasPlugin"></PluginInstallView>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import TabsView from "@/views/TabsView.vue";
import FramesView from "@/views/FramesView.vue";
import PluginInstallView from "@/views/PluginInstallView.vue";
const renderData = require('./renderData.json')

export default defineComponent( {
  name: "SidebarView",
  components: {PluginInstallView, FramesView, TabsView},
  data() {
    return {
      selected: 'tabs',
      hasPlugin: false
    }
  },
  computed: {
    renderData(){
      return renderData
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
      // store.dispatch('loadState')
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
  height: 21px;
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

</style>