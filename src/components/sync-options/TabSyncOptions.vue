<template>
  <TabContainer title="sync options" :subtitle="subtitle">
    <TabContainer title="set storage" padding="5px" padding-left="10px" :is-inner="true">
      <SetStorageContainer></SetStorageContainer>
    </TabContainer>
    <TabContainer v-if="storage.kind === 'gist'" title="gist push data" :default-activation="true" padding="5px" padding-left="10px" :is-inner="true">
      <GistPushData></GistPushData>
    </TabContainer>
    <TabContainer v-if="storage.kind === 'gist'" title="gist pull data" :default-activation="false" padding="5px" padding-left="10px" :is-inner="true">
      <GistPullData></GistPullData>
    </TabContainer>

  </TabContainer>
</template>

<script>
import TabContainer from "@/components/TabContainer";
import {Octokit} from "octokit";
import {mergeData} from "@/components/sync-options/merge";
import { compress, decompress } from 'compress-json'
import SetStorageContainer from "@/components/sync-options/SetStorageContainer";
import GistPushData from "@/components/sync-options/GistPushData";
import GistPullData from "@/components/sync-options/GistPullData";
import {store} from "@/store";
export default {
  name: "TabSyncOptions",
  components: {GistPullData, GistPushData, SetStorageContainer, TabContainer},
  data() {
    return {
      remoteDetail: {
        status: 'none', // fetch
        mergeToRemoteDetail: {},
        mergeToLocalDetail: {},
        hasFile: false,
        data: null
      },
      octokit: null,
      editMode: false,
      log: 'need fetch data',
    }
  },
  computed: {
    storage(){
      return store.getters.storage
    },
    subtitle(){
      return 'kind ' + this.storage.kind
    },
    canSync(){
      if (this.remoteDetail.mergeToRemoteDetail){
        const detail = this.remoteDetail.mergeToRemoteDetail
        if (detail.itemsAdded > 0 || detail.itemsRemoved > 0 || detail.itemsModified > 0){
          return true
        }
      }
      return false
    }
  },
  methods: {
    setStorage(){
      this.editMode = false
      store.dispatch('setStorage', this.storage)
    },
    async authGist(){
      // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
      const octokit = new Octokit({ auth: this.storage.accessKey });

      octokit.rest.users.getAuthenticated().then(() => {
        this.octokit = octokit
      }).catch(err => {
        this.log = 'error: ' + err.message
      })
    },
    fetch() {
      this.octokit.rest.gists.get({gist_id: this.storage.gistID}).then(res => {
        const data = res.data
        const fileName = `${this.storage.name}_frames.json`
        const dataFile = data.files[fileName]
        this.remoteDetail.status = 'fetched'

        if (dataFile){
          this.remoteDetail.hasFile = true
          const parsed = JSON.parse(dataFile.content)
          const remoteFrames = decompress(parsed)
          this.remoteDetail.remoteFrames = remoteFrames

          // has to merge current dataFile with our current data
          this.remoteDetail.mergeToRemoteDetail = mergeData(store.getters.frames, remoteFrames)
          this.remoteDetail.mergeToLocalDetail = mergeData(remoteFrames, store.getters.frames)

          const mergeToRemoteDetail = this.remoteDetail.mergeToRemoteDetail
          const mergeToLocalDetail = this.remoteDetail.mergeToLocalDetail
          this.log = `push: add: ${mergeToRemoteDetail.itemsAdded.length} / remove: ${mergeToRemoteDetail.itemsRemoved.length} / change: ${mergeToRemoteDetail.itemsModified.length}`
          this.log += ` || pull: add: ${mergeToLocalDetail.itemsAdded.length} / remove: ${mergeToLocalDetail.itemsRemoved.length} / change: ${mergeToLocalDetail.itemsModified.length}`
        }else{
          this.remoteDetail.mergeToRemoteDetail = mergeData(store.getters.frames, [])
          this.remoteDetail.mergeToLocalDetail = mergeData([], store.getters.frames)
          this.log = `cannot find [${fileName}], it will create during push process`
        }

      }).catch(err => {
        this.log = 'error: ' + err.message
      })
    },
    push(){
      const mapFiles = {}
      mapFiles[this.storage.name + "_frames.json"] = {
        content: JSON.stringify(compress(this.remoteDetail.mergeToRemoteDetail.frames))
      }

      this.octokit.rest.gists.update({
        gist_id: this.storage.gistID,
        files: mapFiles,
      }).then(res => {
        console.log(res)
        this.fetchData = null
      }).catch(err => {
        this.log = 'error: ' + err.message
      })
    },
    pull(){
      store.dispatch('setFrames', this.remoteDetail.remoteFrames)
      this.remoteDetail = {
        status: 'none'
      }
      this.log = 'pull completed'
    }
  },
  mounted() {
  }
}
</script>

<style scoped>


</style>