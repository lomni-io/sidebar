<template>
  <TabContainer title="config" :default-activation="true">
    <SetStorageContainer></SetStorageContainer>
  </TabContainer>
  <TabContainer v-if="storage.kind === 'gist'" title="gist push data" :default-activation="true" padding="5px" padding-left="10px" :is-inner="true">
    <GistPushData></GistPushData>
  </TabContainer>
  <TabContainer v-if="storage.kind === 'gist'" title="gist pull data" :default-activation="false" padding="5px" padding-left="10px" :is-inner="true">
    <GistPullData></GistPullData>
  </TabContainer>
</template>

<script>
import TabContainer from "@/components/v2/TabContainer";
import SetStorageContainer from "@/components/sync-options/SetStorageContainer";
import {store} from "@/store";
import GistPushData from "@/components/sync-options/GistPushData";
import GistPullData from "@/components/sync-options/GistPullData";
export default {
  name: "SyncView",
  components: {GistPullData, GistPushData, SetStorageContainer, TabContainer},
  computed: {
    storage(){
      return store.getters.storage
    },
  },
}
</script>

<style scoped>

</style>