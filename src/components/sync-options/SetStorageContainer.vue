<template>
  <div class="form">

    <div class="lm-form_line" v-if="storage.kind === 'gist'">
      <div class="lm-columns">

        <div class="lm-column">
          <label>default storage name:</label><br>
          <input v-model="storage.name" :disabled="!editMode">
        </div>

      </div>
    </div>

    <div class="lm-form_line">
      <div class="lm-columns">
        <div class="lm-column">
          <label>Storage kind:</label>
          <select v-model="storage.kind" :disabled="!editMode">
            <option>local</option>
            <option>gist</option>
          </select>
        </div>
      </div>
    </div>

    <div class="lm-form_line" v-if="storage.kind === 'gist'">
      <div class="lm-columns">

        <div class="lm-column">
          <label>gist access key:</label><br>
          <input v-model="storage.accessKey" :disabled="!editMode">
        </div>

        <div class="lm-column">
          <label>gist ID:</label><br>
          <input v-model="storage.gistID" :disabled="!editMode">
        </div>

      </div>
    </div>

    <div class="bottom-button-container">
      <button class="grey" @click="editMode = true" v-if="!editMode">edit</button>
      <button class="yellow" @click="setStorage()" v-if="editMode">save</button>
    </div>

  </div>
</template>

<script>

import {store} from "@/store";

export default {
  name: "SetStorageContainer",
  data() {
    return {
      octokit: null,
      editMode: false,
    }
  },
  computed: {
    storage(){
      return store.getters.storage
    },
  },
  methods: {
    setStorage(){
      this.editMode = false
      store.dispatch('setStorage', this.storage)
    },
  }
}
</script>

<style scoped>

</style>