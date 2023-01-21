<template>
  <div class="container">

<!--    <div class="loading"></div>-->
    <LoadingContainer v-if="isLoading"></LoadingContainer>

    <div>
      <div class="overview" v-if="mergedData">
        <div class="overview-item add">add: {{mergedData.itemsAdded.length}} </div>
        <div class="overview-item remove">remove: {{mergedData.itemsRemoved.length}} </div>
        <div class="overview-item change">modify: {{mergedData.itemsModified.length}} </div>
      </div>

      <div class="overview" v-if="!mergedData">
        <div class="overview-item add">add: - </div>
        <div class="overview-item remove">remove: - </div>
        <div class="overview-item change">modify: - </div>
      </div>

    </div>

<!--   TODO: do detail here -->
    <div class="detail-container" v-if="mergedData">
      <div class="detail-container-removed">

        <div class="item" v-for="(data, index) in mergedData.itemsRemoved" :key="index">
          <img :src="data.favIconUrl" width="16"/>
          <small class="remove">{{data.title}}</small>
        </div>

      </div>
    </div>

    <div class="bottom-button-container">
      <button class="yellow" @click="fetchData">fetch data</button>
      <button class="blue" @click="pushData" :disabled="!(mergedData && mergedData.hasChanges)">push</button>
    </div>

    <small class="error" v-if="error">Error: {{error}}</small>

  </div>
</template>

<script>
import {Octokit} from "octokit";
import {compress, decompress} from "compress-json";
import {mergeData} from "@/components/sync-options/merge";
import LoadingContainer from "@/components/LoadingContainer";
import {store} from "@/store";

export default {
  name: "GistPushData",
  components: {LoadingContainer},
  data() {
    return {
      error: null,
      mergedData: null,
      isLoading: false
    }
  },
  methods: {
    fetchData(){
      this.error = null
      this.isLoading = true
      const storage = store.getters.storage
      const octokit = new Octokit({ auth: storage.accessKey });

      octokit.rest.users.getAuthenticated().then(() => {
        // get data
        octokit.rest.gists.get({gist_id: storage.gistID}).then(res => {
          const fileName = `${storage.name}_frames.json`
          const dataFile = res.data.files[fileName]

          if (dataFile){
            // has file
            const parsed = JSON.parse(dataFile.content)
            const remoteFrames = decompress(parsed)

            this.mergedData = mergeData(store.getters.rawFullData, remoteFrames)
          }else{
            // doesnt has file
            this.mergedData = mergeData(store.getters.rawFullData, [])
          }
        }).finally(() => this.isLoading = false)
      }).catch(err => {
        this.isLoading = false
        this.error = err.message
      })
    },
    pushData(){
      this.error = null
      this.isLoading = true
      const mapFiles = {}

      const storage = store.getters.storage

      mapFiles[storage.name + "_frames.json"] = {
        content: JSON.stringify(compress(this.mergedData.frames))
      }

      const octokit = new Octokit({ auth: storage.accessKey });
      octokit.rest.users.getAuthenticated().then(() => {
        // get data

        octokit.rest.gists.update({
          gist_id: storage.gistID,
          files: mapFiles,
        }).then(() => {
          this.mergedData = null
        }).catch(err => {
          this.error = err.message
        }).finally(() => {this.isLoading = false})

      }).catch(err => {
        this.isLoading = false
        this.error = err.message
      })

    }
  }
}
</script>

<style scoped lang="scss">

.container{
  position: relative;
}

.overview{
  display: flex;
  justify-content: center;

  .add{
    color: var(--green);
  }

  .remove{
    color: var(--red);
  }

  .change{
    color: var(--blue);
  }

  .overview-item{
    margin-right: 20px;
  }
}

.error{
  color: var(--red);
  text-align: center;
}

.item{
  align-content: center;
  display: flex;
  img{
    margin-right: 5px;
  }
  small{
    font-size: 0.8em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 60vw;

    &.remove{
      color: var(--red);
    }
  }
}

</style>