<template>
  <ul>
    <li :class="{'active': this.selected === 'tabs'}" @click="select('tabs')">Tabs</li>
    <li :class="{'active': this.selected === 'frames'}" @click="select('frames')">Frames</li>
    <li>Sync</li>
  </ul>

  <TabView v-if="renderData" :render-data="renderData"></TabView>
</template>

<script lang="ts">

const renderData = require('./renderData.json')

import {defineComponent} from "vue";

export default defineComponent( {
  name: "NavBar",
  emits: ['selected'],
  data() {
    return {
      selected: 'tabs',
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