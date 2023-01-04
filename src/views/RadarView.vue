<template>
  <div id="radar">

    <TabFrameSearch></TabFrameSearch>
    <TabSyncOptions></TabSyncOptions>

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
    }
  },
  methods: {
  },
  created() {
  },
  mounted() {

    this.port.postMessage({kind: "all-tabs-request"});

    store.dispatch('loadState')
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