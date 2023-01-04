<template>
  <div id="radar">

    <div v-if="hasPlugin">
      <TabFrameSearch></TabFrameSearch>
      <TabSyncOptions></TabSyncOptions>
    </div>

    <div v-if="!hasPlugin">
      need to install plugin
    </div>


  </div>
</template>

<script>

import TabFrameSearch from "@/components/search-tab/TabFrameSearch";
import TabSyncOptions from "@/components/sync-options/TabSyncOptions";
import {store} from "@/store";

export default {
  name: "RadarView",
  components: {TabSyncOptions, TabFrameSearch},
  data() {
    return {
      hasPlugin: false
    }
  },
  methods: {
  },
  created() {
  },
  mounted() {

    if (this.port) {
      this.hasPlugin = true
      this.port.postMessage({kind: "all-tabs-request"});
      store.dispatch('loadState')
    }

  }
}

</script>

<style scoped lang="scss">

.v-contextmenu{
  background-color: red;
}
//
//#radar{
//  display: flex;
//  flex-direction: column;
//  justify-content: space-between;
//  padding: 10px;
//}


</style>